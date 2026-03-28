import { useState, type FC } from 'react';
import FilterBar, { type BurgerData } from './FilterBar';

interface Props {
  burgers: BurgerData[];
}

const BurgerGrid: FC<Props> = ({ burgers }) => {
  const [filtered, setFiltered] = useState<BurgerData[]>(burgers);

  return (
    <>
      <FilterBar burgers={burgers} onFiltered={setFiltered} />

      {filtered.length === 0 ? (
        <div className="no-results">
          <p>No hay hamburgueserías que cumplan los filtros seleccionados.</p>
          <style>{`
            .no-results {
              text-align: center;
              padding: 4rem 2rem;
              color: var(--color-text-muted);
              font-size: 1.1rem;
              border: 3px dashed var(--color-border);
            }
          `}</style>
        </div>
      ) : (
        <div
          id="burger-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
          aria-label={`${filtered.length} hamburgueserías encontradas`}
          aria-live="polite"
          aria-atomic="false"
        >
          {filtered.map((burger) => (
            <a
              key={burger.slug}
              href={`/burger/${burger.slug}`}
              aria-label={`${burger.nombre} — Rating ${burger.rating_general} — ${burger.barrio}`}
              style={{ textDecoration: 'none', display: 'contents' }}
            >
              <article
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '3px solid #3a2010',
                  background: '#221200',
                  overflow: 'hidden',
                  transition: 'transform 250ms ease, border-color 250ms ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.borderColor = '#ffd600';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = '';
                  (e.currentTarget as HTMLElement).style.borderColor = '#3a2010';
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: '#3a2010' }}>
                  {burger.foto_portada ? (
                    <img
                      src={burger.foto_portada}
                      alt={`Foto de ${burger.nombre}`}
                      width={480}
                      height={360}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                      🍔
                    </div>
                  )}
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    background: '#1a0a00',
                    borderTop: '3px solid #ff3c00',
                    borderLeft: '3px solid #ff3c00',
                    padding: '4px 10px',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '2.25rem',
                    lineHeight: 1,
                    color: '#ff3c00',
                  }}>
                    {burger.rating_general.toFixed(1)}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <h2 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.75rem',
                    lineHeight: 1,
                    letterSpacing: '0.03em',
                    color: '#f5f0e8',
                  }}>
                    {burger.nombre}
                  </h2>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    <span style={{ padding: '2px 10px', border: '2px solid #ff3c00', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ff3c00' }}>
                      {burger.barrio}
                    </span>
                    <span style={{ padding: '2px 10px', border: '2px solid #ffd600', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffd600' }}>
                      {burger.precio_rango}
                    </span>
                    {burger.tags.slice(0, 2).map((tag) => (
                      <span key={tag} style={{ padding: '2px 10px', border: '2px solid #a89880', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a89880' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p style={{
                    fontSize: '0.8rem',
                    color: '#a89880',
                    fontStyle: 'italic',
                    lineHeight: 1.4,
                    borderTop: '1px solid #3a2010',
                    paddingTop: '0.5rem',
                    marginTop: 'auto',
                  }}>
                    <span style={{ color: '#ffd600', fontStyle: 'normal' }}>★ </span>
                    {burger.hamburguesa_estrella}
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default BurgerGrid;
