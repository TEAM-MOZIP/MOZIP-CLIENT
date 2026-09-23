import { Fragment, type ReactNode } from 'react';

// 챗봇(AI) 답변을 읽기 쉽게 그리는 작은 렌더러. 마크다운 전체가 아니라 AI 프롬프트에서 쓰도록 정한
// 문법만 지원한다 — 외부 라이브러리 없이 React 텍스트 노드로만 그려서 HTML 주입 걱정이 없다.
//   ■ 소제목            → 굵은 소제목
//   - 항목 / • 항목      → 글머리 목록 (바로 아래 들여쓴 줄은 같은 항목의 설명으로 이어 붙인다)
//   **굵게**            → 굵은 글씨
//   ---                 → 구분선
//   빈 줄               → 문단 구분

type Block =
  | { type: 'divider' }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; lines: string[] }
  | { type: 'list'; items: string[][] };

const DIVIDER = /^\s*(-{3,}|_{3,}|\*{3,})\s*$/;
const LIST_MARKER = /^\s*[-•*]\s+/;
const HEADING_MARKER = /^\s*(■|#{1,3})\s+/;
const BOLD_PATTERN = /\*\*(.+?)\*\*/g;

const parseBlocks = (content: string): Block[] => {
  const blocks: Block[] = [];
  let current: Block | null = null;

  const flush = () => {
    if (current) blocks.push(current);
    current = null;
  };

  for (const rawLine of content.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flush();
      continue;
    }

    if (DIVIDER.test(line)) {
      flush();
      blocks.push({ type: 'divider' });
      continue;
    }

    if (HEADING_MARKER.test(line)) {
      flush();
      blocks.push({ type: 'heading', text: line.replace(HEADING_MARKER, '') });
      continue;
    }

    if (LIST_MARKER.test(line)) {
      if (current?.type !== 'list') {
        flush();
        current = { type: 'list', items: [] };
      }
      current.items.push([line.replace(LIST_MARKER, '')]);
      continue;
    }

    // 목록 항목 바로 아래 들여쓴 줄은 그 항목의 설명으로 이어 붙인다.
    if (current?.type === 'list' && /^\s+/.test(rawLine)) {
      current.items[current.items.length - 1].push(line.trim());
      continue;
    }

    if (current?.type !== 'paragraph') {
      flush();
      current = { type: 'paragraph', lines: [] };
    }
    current.lines.push(line);
  }
  flush();
  return blocks;
};

const renderInline = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(BOLD_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) nodes.push(text.slice(lastIndex, index));
    nodes.push(
      <strong key={index} className="font-semibold text-title">
        {match[1]}
      </strong>
    );
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
};

const renderLines = (lines: string[]) =>
  lines.map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {renderInline(line)}
    </Fragment>
  ));

type ChatMessageContentProps = {
  content: string;
};

const ChatMessageContent = ({ content }: ChatMessageContentProps) => {
  const blocks = parseBlocks(content);

  return (
    <div className="flex flex-col gap-[1.2rem] break-words">
      {blocks.map((block, index) => {
        if (block.type === 'divider') {
          return (
            <hr
              key={index}
              className="my-[0.4rem] border-0 border-t border-gray-200"
            />
          );
        }
        if (block.type === 'heading') {
          return (
            <p key={index} className="mt-[0.4rem] font-bold text-title">
              {renderInline(block.text)}
            </p>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={index} className="flex flex-col gap-[1.2rem]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex gap-[0.8rem]">
                  <span aria-hidden className="shrink-0 text-gray-400">
                    •
                  </span>
                  <span className="min-w-0">{renderLines(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{renderLines(block.lines)}</p>;
      })}
    </div>
  );
};

export default ChatMessageContent;
