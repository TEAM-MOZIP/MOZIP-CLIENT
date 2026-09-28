type LineKind = 'heading' | 'item' | 'subitem' | 'note' | 'text' | 'section';

type Line = { kind: LineKind; text: string };

const HEADING_MARKER = /^[○●◎■□▶►◆◇]\s*/;
const ITEM_MARKER = /^[-–]\s*/;
const SUBITEM_MARKER = /^[·•∙ㆍ]\s*/;
const NOTE_MARKER = /^※/;
const ASTERISK_NOTE_MARKER = /^\*+\s/;
const PAREN_SECTION_MARKER = /^\([가-힣A-Za-z\s]{1,15}\)\s*/;

// 정부24: "○·- ※" 기호 앞에서 줄을 나눈다.
// 복지로: "* " "** " 각주 앞, "(소제목)" 앞에서 줄을 나눈다.
const INLINE_BREAK =
  /\s+(?=[○●◎■□▶►◆◇※])|\s+(?=[-–·]\s)|\s+(?=\*+[\s(])|\s+(?=\([가-힣A-Za-z\s]{1,15}\)\s)/;

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
  if (ASTERISK_NOTE_MARKER.test(line)) {
    return {
      kind: 'note',
      text: '※ ' + line.replace(ASTERISK_NOTE_MARKER, ''),
    };
  }
  if (PAREN_SECTION_MARKER.test(line)) {
    return { kind: 'section', text: line };
  }
  return { kind: 'text', text: line };
};

const LINE_STYLES: Record<LineKind, { className: string; bullet?: string }> = {
  heading: { className: 'mt-[0.8rem] font-semibold text-title first:mt-0' },
  section: { className: 'mt-[0.6rem] font-medium text-title first:mt-0' },
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

/** 정부24·복지로 원문(지원대상·지원내용·신청방법 등)을 기호 구조대로 줄을 나눠 읽기 좋게 보여준다. */
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
