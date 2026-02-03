import { useState } from "react";
import scrapedData from "../../scraped_data.json";

const genreCounts = new Map<string, number>();
scrapedData.forEach((item) => {
  item.genres_tags.split(", ").forEach((genre) => {
    genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1);
  });
});

const sortedGenres = Array.from(genreCounts.entries()).sort(
  (a, b) => b[1] - a[1]
);

function Filters({
  onSubmit,
}: {
  onSubmit: (selectedGenres: string[]) => void;
}) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(newSelectedGenres);
    onSubmit(newSelectedGenres);
  };

  const handleClear = () => {
    setSelectedGenres([]);
    onSubmit([]);
  };

  return (
    <div className="filters">
      <h2>Filters</h2>

      <div className="mb-5">
        <button
          style={{
            backgroundColor: selectedGenres.length > 0 ? '#f4c4b0' : '#e8e4df',
            color: selectedGenres.length > 0 ? '#2d2d2d' : '#9a9a9a',
            padding: '0.6em 1.2em',
            fontSize: '0.9em',
            fontWeight: '500',
            cursor: selectedGenres.length > 0 ? 'pointer' : 'not-allowed',
          }}
          onClick={handleClear}
          disabled={selectedGenres.length === 0}
        >
          Clear All
        </button>
        {selectedGenres.length > 0 && (
          <span style={{ 
            marginLeft: '1rem', 
            color: 'var(--text-muted)', 
            fontSize: '0.9em' 
          }}>
            {selectedGenres.length} selected
          </span>
        )}
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.6rem' 
      }}>
        {sortedGenres.map(([genre, count], index) => (
          <button
            key={index}
            style={{
              padding: '0.5em 1em',
              fontSize: '0.85em',
              borderRadius: '20px',
              border: selectedGenres.includes(genre) 
                ? '2px solid #c7b8ea' 
                : '1px solid var(--border-soft)',
              backgroundColor: selectedGenres.includes(genre)
                ? '#c7b8ea'
                : 'white',
              color: selectedGenres.includes(genre)
                ? 'white'
                : 'var(--text-secondary)',
              fontWeight: selectedGenres.includes(genre) ? '600' : '500',
              transition: 'all 0.2s ease',
              boxShadow: selectedGenres.includes(genre)
                ? '0 2px 8px rgba(199, 184, 234, 0.3)'
                : '0 1px 3px var(--shadow-soft)',
            }}
            onClick={() => toggleGenre(genre)}
            onMouseEnter={(e) => {
              if (!selectedGenres.includes(genre)) {
                e.currentTarget.style.borderColor = '#c7b8ea';
                e.currentTarget.style.backgroundColor = 'rgba(199, 184, 234, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!selectedGenres.includes(genre)) {
                e.currentTarget.style.borderColor = 'var(--border-soft)';
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            {genre} <span style={{ opacity: 0.7 }}>({count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
