import { useState, useEffect, type FC } from 'react';

export interface BurgerData {
  slug: string;
  nombre: string;
  barrio: string;
  precio_rango: string;
  rating_general: number;
  tags: string[];
  fecha_visita: string;
  foto_portada: string;
  descripcion: string;
  hamburguesa_estrella: string;
}

interface Props {
  burgers: BurgerData[];
  onFiltered: (filtered: BurgerData[]) => void;
}

const BARRIOS = [
  'Todos', 'Malasaña', 'Lavapiés', 'Chueca', 'Salamanca',
  'Chamberí', 'Almagro', 'Retiro', 'Carabanchel', 'Vallecas',
  'Moncloa', 'Centro', 'Otro',
];

const PRECIOS = ['Todos', '€', '€€', '€€€'];

type SortKey = 'rating' | 'fecha' | 'nombre';

const FilterBar: FC<Props> = ({ burgers, onFiltered }) => {
  const [barrio, setBarrio] = useState('Todos');
  const [precio, setPrecio] = useState('Todos');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>('rating');
  const [search, setSearch] = useState('');

  // Collect all unique tags
  const allTags = Array.from(new Set(burgers.flatMap((b) => b.tags))).sort();

  useEffect(() => {
    // Listen for search from HeroSection
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ query: string }>;
      setSearch(ce.detail.query);
    };
    window.addEventListener('burgerSearch', handler);
    return () => window.removeEventListener('burgerSearch', handler);
  }, []);

  useEffect(() => {
    let result = [...burgers];

    // Search filter
    if (search) {
      result = result.filter(
        (b) =>
          b.nombre.toLowerCase().includes(search) ||
          b.barrio.toLowerCase().includes(search) ||
          b.tags.some((t) => t.toLowerCase().includes(search))
      );
    }

    // Barrio filter
    if (barrio !== 'Todos') {
      result = result.filter((b) => b.barrio === barrio);
    }

    // Precio filter
    if (precio !== 'Todos') {
      result = result.filter((b) => b.precio_rango === precio);
    }

    // Tags filter (AND — must have all selected tags)
    if (activeTags.length > 0) {
      result = result.filter((b) =>
        activeTags.every((t) => b.tags.includes(t))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sort === 'rating') return b.rating_general - a.rating_general;
      if (sort === 'fecha')
        return new Date(b.fecha_visita).getTime() - new Date(a.fecha_visita).getTime();
      if (sort === 'nombre') return a.nombre.localeCompare(b.nombre, 'es');
      return 0;
    });

    onFiltered(result);
  }, [barrio, precio, activeTags, sort, search, burgers]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const reset = () => {
    setBarrio('Todos');
    setPrecio('Todos');
    setActiveTags([]);
    setSort('rating');
    setSearch('');
  };

  const hasFilters = barrio !== 'Todos' || precio !== 'Todos' || activeTags.length > 0 || sort !== 'rating' || search !== '';

  return (
    <div className="filter-bar" role="search" aria-label="Filtros de hamburgueserías">
      <div className="filter-row">
        {/* Barrio */}
        <div className="filter-group">
          <label className="filter-label">Barrio</label>
          <div className="filter-pills">
            {BARRIOS.map((b) => (
              <button
                key={b}
                onClick={() => setBarrio(b)}
                className={`filter-pill ${barrio === b ? 'active' : ''}`}
                aria-pressed={barrio === b}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div className="filter-group">
          <label className="filter-label">Precio</label>
          <div className="filter-pills">
            {PRECIOS.map((p) => (
              <button
                key={p}
                onClick={() => setPrecio(p)}
                className={`filter-pill ${precio === p ? 'active' : ''}`}
                aria-pressed={precio === p}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="sort-select">Ordenar</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="filter-select"
          >
            <option value="rating">Mayor rating</option>
            <option value="fecha">Más reciente</option>
            <option value="nombre">A–Z</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="filter-group">
          <label className="filter-label">Tags</label>
          <div className="filter-pills filter-pills--wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`filter-pill filter-pill--tag ${activeTags.includes(tag) ? 'active' : ''}`}
                aria-pressed={activeTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasFilters && (
        <button onClick={reset} className="filter-reset" aria-label="Limpiar filtros">
          Limpiar filtros ✕
        </button>
      )}

      <style>{`
        .filter-bar {
          background: rgba(34, 18, 0, 0.8);
          border: var(--border-width) solid var(--color-border);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .filter-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: flex-start;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .filter-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .filter-pills {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.375rem;
          overflow-x: auto;
          padding-bottom: 2px;
        }
        .filter-pills--wrap {
          flex-wrap: wrap;
        }
        .filter-pill {
          padding: 4px 12px;
          border: 2px solid var(--color-border);
          background: transparent;
          color: var(--color-text-muted);
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          cursor: pointer;
          white-space: nowrap;
          transition: all 150ms ease;
        }
        .filter-pill:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
        .filter-pill.active {
          border-color: var(--color-accent);
          background: var(--color-accent);
          color: white;
        }
        .filter-pill--tag.active {
          border-color: var(--color-accent-alt);
          background: var(--color-accent-alt);
          color: var(--color-bg);
        }
        .filter-pill--tag:hover:not(.active) {
          border-color: var(--color-accent-alt);
          color: var(--color-accent-alt);
        }
        .filter-select {
          background: var(--color-bg);
          border: 2px solid var(--color-border);
          color: var(--color-text);
          font-family: var(--font-body);
          font-size: 0.85rem;
          padding: 4px 10px;
          cursor: pointer;
          outline: none;
        }
        .filter-select:focus {
          border-color: var(--color-accent);
        }
        .filter-reset {
          align-self: flex-start;
          background: transparent;
          border: 2px solid var(--color-accent);
          color: var(--color-accent);
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 12px;
          cursor: pointer;
          transition: all 150ms ease;
        }
        .filter-reset:hover {
          background: var(--color-accent);
          color: white;
        }
        @media (max-width: 768px) {
          .filter-pills {
            max-width: calc(100vw - 2rem);
          }
        }
      `}</style>
    </div>
  );
};

export default FilterBar;
