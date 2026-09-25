type LineKind = 'heading' | 'item' | 'subitem' | 'note' | 'text';

type Line = { kind: LineKind; text: string };

const HEADING_MARKER = /^[○●◎■□▶►◆◇]\s*/;
const ITEM_MARKER = /^[-–]\s*/;
const SUBITEM_MARKER = /^[·•∙ㆍ]\s*/;
const NOTE_MARKER = /^※/;

// 정부24 원문은 "○ 제목 / - 항목 / · 세부 / ※ 참고" 기호로 구조를 표현한다.
// 줄바꿈 없이 한 줄에 이어 쓴 원문도 많아서, 기호 앞에서 줄을 나눈다.
// - "-"·"·"는 앞뒤가 공백일 때만 나눈다("50㎡~60㎡", "소득·재산", "3-4인" 같은 단어 안의 기호는 그대로 둔다).
const INLINE_BREAK = /\s+(?=[○●◎■□▶►◆◇※])|\s+(?=[-–·]\s)/;

const splitLines = (text: string) =>
  text
    .split(/\r?\n/)
    .flatMap((line) => line.split(INLINE_BREAK))
    .map((line) => line.trim())
    .filter(Boolean);

const parseLine = (line: string): Line => {
  if (HEADING_MARKER.test(line)) {
    return { kind: 'heading', text: line.replace(HEADING_MARKER, '') };
  }
  if (ITEM_MARKER.test(line)) {
    return { kind: 'item', text: line.replace(ITEM_MARKER, '') };
  }
  if (SUBITEM_MARKER.test(line)) {
    return { kind: 'subitem', text: line.replace(SUBITEM_MARKER, '') };
  }
  if (NOTE_MARKER.test(line)) {
    return { kind: 'note', text: line };
  }
  return { kind: 'text', text: line };
};

const LINE_STYLES: Record<LineKind, { className: string; bullet?: string }> = {
  heading: { className: 'mt-[0.8rem] font-semibold text-title first:mt-0' },
  item: { className: 'pl-[0.4rem]', bullet: '•' },
  subitem: { className: 'pl-[1.6rem]', bullet: '·' },
  note: { className: 'text-caption text-gray-500' },
  text: { className: '' },
};

const PolicyTextLine = ({ kind, text }: Line) => {
  const { className, bullet } = LINE_STYLES[kind];

  if (!bullet) return <p className={className}>{text}</p>;

  return (
    <p className={`flex gap-[0.6rem] ${className}`}>
      <span aria-hidden className="shrink-0 text-gray-400">
        {bullet}
      </span>
      <span className="min-w-0">{text}</span>
    </p>
  );
};

// "○"는 아래에 "-"·"·" 항목이 딸린 경우에만 소제목(굵게)으로 쓴다.
// "○ 내용 / ○ 내용"처럼 ○만 나열된 원문은 사실상 목록이라 모두 굵게 나오지 않도록 일반 항목으로 바꾼다.
const resolveHeadings = (lines: Line[]): Line[] =>
  lines.map((line, index) => {
    if (line.kind !== 'heading') return line;
    const next = lines[index + 1];
    const hasChildren = next?.kind === 'item' || next?.kind === 'subitem';
    return hasChildren ? line : { ...line, kind: 'item' };
  });

type PolicyTextProps = {
  text: string;
  className?: string;
};

/** 정부24 원문(지원대상·지원내용·신청방법 등)을 기호 구조대로 줄을 나눠 읽기 좋게 보여준다. */
const PolicyText = ({ text, className = '' }: PolicyTextProps) => (
  <div
    className={['flex flex-col gap-[0.4rem] text-body-3 text-body', className]
      .filter(Boolean)
      .join(' ')}
  >
    {resolveHeadings(splitLines(text).map(parseLine)).map((line, index) => (
      <PolicyTextLine key={index} {...line} />
    ))}
  </div>
);

export default PolicyText;
