import { useState } from "react";
import "./App.css";
import Filters from "./components/Filters";
import Results from "./components/Results";

function App() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleFiltersSubmit = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  return (
    <div className="app-container">
      <div className="filters-container">
        <Filters onSubmit={handleFiltersSubmit} />
      </div>
      <div className="results-container">
        <Results selectedGenres={selectedGenres} />
      </div>
      <div className="disclaimer-container">
        <h2 style={{ fontSize: '1.25rem' }}>Disclaimer</h2>
        <p style={{ 
          fontSize: '0.9rem', 
          lineHeight: '1.7',
          color: 'var(--text-secondary)' 
        }}>
          This tool provides a category-based sorting feature specifically for
          the website{" "}
          <a
            href="https://fitgirl-repacks.site/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#c7b8ea',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(199, 184, 234, 0.3)',
              textUnderlineOffset: '3px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecorationColor = '#c7b8ea';
              e.currentTarget.style.color = '#a89ad4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecorationColor = 'rgba(199, 184, 234, 0.3)';
              e.currentTarget.style.color = '#c7b8ea';
            }}
          >
            https://fitgirl-repacks.site/
          </a>
          . By selecting a result, you will be redirected to the corresponding
          link on the official site. The entries are organized chronologically,
          with the most recent releases appearing first, which may offer better
          availability.
        </p>
        <p style={{ 
          fontSize: '0.85rem', 
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: 'rgba(244, 196, 176, 0.15)',
          borderRadius: '10px',
          color: 'var(--text-secondary)',
          borderLeft: '3px solid #f4c4b0',
        }}>
          Last updated: February 3rd, 2026
        </p>
      </div>
    </div>
  );
}

export default App;
