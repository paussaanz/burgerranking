import { useState, type FC } from 'react';

interface Props {
  value?: number;
  onChange?: (val: number) => void;
  max?: number;
  label?: string;
}

const StarRating: FC<Props> = ({ value = 0, onChange, max = 10, label = 'Rating' }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const displayed = hovered ?? value;

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      role="group"
      aria-label={label}
    >
      <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a89880' }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {Array.from({ length: max }).map((_, i) => {
          const val = i + 1;
          return (
            <button
              key={val}
              type="button"
              onClick={() => onChange?.(val)}
              onMouseEnter={() => setHovered(val)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`${val} de ${max}`}
              aria-pressed={value === val}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px',
                fontSize: '1.25rem',
                filter: val <= displayed ? 'none' : 'grayscale(1) opacity(0.3)',
                transform: val <= displayed ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 100ms ease',
              }}
            >
              🍔
            </button>
          );
        })}
        <span
          style={{
            marginLeft: '0.5rem',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.5rem',
            color: '#ff3c00',
          }}
        >
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default StarRating;
