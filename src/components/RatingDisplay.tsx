import { type FC } from 'react';

interface Props {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const FILLED_COLOR = '#ff3c00';
const EMPTY_COLOR = '#3a2010';

// SVG burger icon — filled or empty
function BurgerIcon({ filled, half, size }: { filled: boolean; half?: boolean; size: number }) {
  const id = `half-${Math.random().toString(36).slice(2)}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {half && (
        <defs>
          <clipPath id={id}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      )}
      {/* Bun top */}
      <ellipse cx="12" cy="5" rx="9" ry="4" fill={filled || half ? FILLED_COLOR : EMPTY_COLOR} clipPath={half ? `url(#${id})` : undefined} />
      {/* Patty */}
      <rect x="3" y="10" width="18" height="4" rx="1" fill={filled || half ? FILLED_COLOR : EMPTY_COLOR} clipPath={half ? `url(#${id})` : undefined} />
      {/* Bun bottom */}
      <ellipse cx="12" cy="18" rx="9" ry="3" fill={filled || half ? FILLED_COLOR : EMPTY_COLOR} clipPath={half ? `url(#${id})` : undefined} />
      {/* Empty state outline */}
      {!filled && !half && (
        <>
          <ellipse cx="12" cy="5" rx="9" ry="4" fill="none" stroke={EMPTY_COLOR} strokeWidth="1" />
          <rect x="3" y="10" width="18" height="4" rx="1" fill="none" stroke={EMPTY_COLOR} strokeWidth="1" />
          <ellipse cx="12" cy="18" rx="9" ry="3" fill="none" stroke={EMPTY_COLOR} strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

const RatingDisplay: FC<Props> = ({ rating, size = 'md', showNumber = true }) => {
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 20 : 28;
  const numSize = size === 'sm' ? '1.5rem' : size === 'md' ? '2.5rem' : '4rem';

  const icons: React.ReactNode[] = [];
  for (let i = 1; i <= 10; i++) {
    const filled = rating >= i;
    const half = !filled && rating >= i - 0.5;
    icons.push(
      <BurgerIcon key={i} filled={filled} half={half} size={iconSize} />
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
      role="img"
      aria-label={`Rating: ${rating} sobre 10`}
    >
      {showNumber && (
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: numSize,
            color: FILLED_COLOR,
            lineHeight: 1,
            letterSpacing: '0.02em',
            minWidth: size === 'lg' ? '5rem' : 'auto',
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
        {icons}
      </div>
    </div>
  );
};

export default RatingDisplay;
