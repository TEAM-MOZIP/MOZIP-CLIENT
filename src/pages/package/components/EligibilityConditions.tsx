import type { ConditionResult } from '@pages/package/types/package';
import {
  getConditionStatusLabel,
  getConditionTypeLabel,
} from '@pages/package/utils/getEvaluationLabels';

type ConditionStatus = NonNullable<ConditionResult['status']>;

// 글꼴마다 ✓·✕ 글리프 굵기와 위치가 달라 원 안에서 어긋나 보이므로, 기호는 SVG로 직접 그린다(12×12 기준).
const StatusIcon = ({ status }: { status: ConditionStatus }) => (
  <svg
    aria-hidden
    viewBox="0 0 12 12"
    className="size-[1.2rem]"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {status === 'MATCHED' && <path d="M2.8 6.2 5 8.4 9.2 3.8" />}
    {status === 'NOT_MATCHED' && <path d="M3.4 3.4 8.6 8.6M8.6 3.4 3.4 8.6" />}
    {status === 'NEEDS_REVIEW' && (
      <>
        <path d="M4.4 4.3a1.7 1.7 0 1 1 2.5 1.5c-.6.3-.9.7-.9 1.3v.2" />
        <circle cx="6" cy="9.4" r="0.4" fill="currentColor" />
      </>
    )}
  </svg>
);

const STATUS_CLASS_NAMES: Record<ConditionStatus, string> = {
  MATCHED: 'bg-primary text-title',
  NEEDS_REVIEW:
    'border-[0.15rem] border-dashed border-gray-400 bg-gray-100 text-gray-500',
  NOT_MATCHED: 'bg-[#ffe3e3] text-point',
};

// 레이더에서 상태를 반지름 비율로 표현한다: 충족은 바깥, 확인 필요는 중간, 불충족은 안쪽.
const RADAR_LEVEL: Record<ConditionStatus, number> = {
  MATCHED: 1,
  NEEDS_REVIEW: 0.55,
  NOT_MATCHED: 0.2,
};

const RADAR_POINT_COLOR: Record<ConditionStatus, string> = {
  MATCHED: 'var(--color-gray-700)',
  NEEDS_REVIEW: 'var(--color-gray-400)',
  NOT_MATCHED: 'var(--color-point)',
};

// 축이 3개 미만이면 면이 만들어지지 않아 레이더를 그리지 않는다.
const MIN_RADAR_AXES = 3;
const RADAR_WIDTH = 240;
const RADAR_HEIGHT = 200;
const CENTER_X = RADAR_WIDTH / 2;
const CENTER_Y = RADAR_HEIGHT / 2;
const RADIUS = 62;
const LABEL_GAP = 16;
const GRID_LEVELS = [1, 0.66, 0.33];

const statusOf = (condition: ConditionResult): ConditionStatus =>
  condition.status ?? 'NEEDS_REVIEW';

const EligibilityRadar = ({
  conditions,
}: {
  conditions: ConditionResult[];
}) => {
  const count = conditions.length;
  const pointAt = (index: number, radius: number) => {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    return {
      x: CENTER_X + radius * Math.cos(angle),
      y: CENTER_Y + radius * Math.sin(angle),
    };
  };
  const toPoints = (radiusOf: (index: number) => number) =>
    conditions
      .map((_, index) => {
        const { x, y } = pointAt(index, radiusOf(index));
        return `${x},${y}`;
      })
      .join(' ');

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${RADAR_WIDTH} ${RADAR_HEIGHT}`}
      className="w-[24rem] max-w-full shrink-0"
    >
      <g fill="none" stroke="var(--color-gray-200)">
        {GRID_LEVELS.map((level) => (
          <polygon key={level} points={toPoints(() => RADIUS * level)} />
        ))}
        {conditions.map((condition, index) => {
          const { x, y } = pointAt(index, RADIUS);
          return (
            <line
              key={`${condition.type}-${index}`}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={x}
              y2={y}
            />
          );
        })}
      </g>

      <polygon
        points={toPoints(
          (index) => RADIUS * RADAR_LEVEL[statusOf(conditions[index])]
        )}
        fill="var(--color-primary)"
        fillOpacity={0.55}
        stroke="#e6d64a"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {conditions.map((condition, index) => {
        const status = statusOf(condition);
        const point = pointAt(index, RADIUS * RADAR_LEVEL[status]);
        const label = pointAt(index, RADIUS + LABEL_GAP);
        const anchor =
          Math.abs(label.x - CENTER_X) < 4
            ? 'middle'
            : label.x > CENTER_X
              ? 'start'
              : 'end';
        return (
          <g key={`${condition.type}-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r={4}
              fill={RADAR_POINT_COLOR[status]}
              stroke="white"
              strokeWidth={1.5}
            />
            <text
              x={label.x}
              y={label.y + 4}
              textAnchor={anchor}
              fontSize={11.5}
              fontWeight={700}
              fill="var(--color-gray-600)"
            >
              {getConditionTypeLabel(condition.type)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

type EligibilityConditionsProps = {
  conditions: ConditionResult[];
};

/** 나의 신청 자격: 왼쪽에 조건별 충족 여부와 이유, 오른쪽에 조건 레이더(조건 3개 이상일 때만). */
const EligibilityConditions = ({ conditions }: EligibilityConditionsProps) => (
  <div className="mt-[1.4rem] flex flex-col gap-[2rem] sm:flex-row sm:items-center sm:gap-[7rem]">
    <ul className="flex min-w-0 flex-col gap-[1rem] pl-[1.2rem]">
      {conditions.map((condition, index) => {
        const status = statusOf(condition);
        return (
          <li
            key={`${condition.type}-${index}`}
            className="flex items-start gap-[1rem] text-body-3"
          >
            <span
              role="img"
              aria-label={getConditionStatusLabel(condition.status)}
              className={`mt-[0.1rem] flex size-[2rem] shrink-0 items-center justify-center rounded-full ${STATUS_CLASS_NAMES[status]}`}
            >
              <StatusIcon status={status} />
            </span>
            <span className="min-w-[5.6rem] shrink-0 font-semibold text-title">
              {getConditionTypeLabel(condition.type)}
            </span>
            {condition.reason && (
              <span className="min-w-0 break-keep text-gray-500">
                {condition.reason}
              </span>
            )}
          </li>
        );
      })}
    </ul>

    {conditions.length >= MIN_RADAR_AXES && (
      <div className="flex justify-center">
        <EligibilityRadar conditions={conditions} />
      </div>
    )}
  </div>
);

export default EligibilityConditions;
