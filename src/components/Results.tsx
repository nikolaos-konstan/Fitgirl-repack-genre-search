import { useState, useEffect } from "react";
import scrapedData from "../../scraped_data.json";

const RESULTS_PER_PAGE = 20;

interface Result {
  id: string;
  title: string;
  genres_tags: string;
  image: string;
  link: string;
  datetime: string;
}

interface ResultsProps {
  selectedGenres: string[];
}

function Results({ selectedGenres }: ResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredResults, setFilteredResults] = useState<Result[]>([]);

  useEffect(() => {
    const uniqueDataMap = new Map<string, Result>();

    scrapedData.forEach((item: Result) => {
      const uniqueKey = `${item.id}-${item.datetime}`;
      if (!uniqueDataMap.has(uniqueKey)) {
        uniqueDataMap.set(uniqueKey, item);
      }
    });

    const uniqueData = Array.from(uniqueDataMap.values());

    const sortedData = uniqueData.sort(
      (a: Result, b: Result) =>
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );

    // Show all results if no filters are selected, otherwise filter
    const results = selectedGenres.length === 0
      ? sortedData
      : sortedData.filter((item: Result) =>
          selectedGenres.every((genre) => item.genres_tags.includes(genre))
        );

    // Update the state
    setFilteredResults(results);
    setCurrentPage(1);
  }, [selectedGenres]);

  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const totalPages = Math.ceil(filteredResults.length / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = startIndex + RESULTS_PER_PAGE;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="results">
      <h2>
        {selectedGenres.length > 0 ? 'Filtered ' : 'All '}Results
        <span style={{ 
          fontSize: '0.8em', 
          fontWeight: '400', 
          color: 'var(--text-muted)', 
          marginLeft: '0.5rem' 
        }}>
          ({filteredResults.length})
        </span>
      </h2>
      
      {paginatedResults.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {paginatedResults.map((result) => (
            <div
              key={`${result.id}-${result.datetime}`}
              style={{
                display: 'flex',
                height: '200px',
                border: '1px solid var(--border-soft)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px var(--shadow-soft)',
              }}
              onClick={() => window.open(result.link, "_blank")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#c7b8ea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px var(--shadow-soft)';
                e.currentTarget.style.borderColor = 'var(--border-soft)';
              }}
            >
              <div style={{
                width: '35%',
                minWidth: '200px',
                backgroundColor: '#faf8f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}>
                <img
                  src={result.image}
                  alt={result.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div style={{
                width: '65%',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)',
                    lineHeight: '1.4',
                  }}>
                    {result.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '0.5rem',
                  }}>
                    {result.genres_tags.split(', ').map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25em 0.6em',
                          backgroundColor: 'rgba(199, 184, 234, 0.1)',
                          color: '#7d6db8',
                          borderRadius: '12px',
                          fontWeight: '500',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  fontWeight: '500',
                }}>
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    style={{ opacity: 0.6 }}
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {formatDate(result.datetime)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: 'var(--text-muted)',
        }}>
          <p>No results found for the selected genres.</p>
        </div>
      )}
      
      {filteredResults.length > RESULTS_PER_PAGE && (
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            style={{
              padding: '0.6em 1em',
              fontSize: '0.9em',
              backgroundColor: currentPage === 1 ? '#e8e4df' : '#2d2d2d',
              color: currentPage === 1 ? '#9a9a9a' : 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '500',
            }}
          >
            First
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            style={{
              padding: '0.6em 1em',
              fontSize: '0.9em',
              backgroundColor: currentPage === 1 ? '#e8e4df' : '#2d2d2d',
              color: currentPage === 1 ? '#9a9a9a' : 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '500',
            }}
          >
            Previous
          </button>
          <span style={{
            padding: '0.6em 1em',
            color: 'var(--text-secondary)',
            fontWeight: '500',
            fontSize: '0.9em',
          }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: '0.6em 1em',
              fontSize: '0.9em',
              backgroundColor: currentPage === totalPages ? '#e8e4df' : '#2d2d2d',
              color: currentPage === totalPages ? '#9a9a9a' : 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '500',
            }}
          >
            Next
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            style={{
              padding: '0.6em 1em',
              fontSize: '0.9em',
              backgroundColor: currentPage === totalPages ? '#e8e4df' : '#2d2d2d',
              color: currentPage === totalPages ? '#9a9a9a' : 'white',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '500',
            }}
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}

export default Results;
