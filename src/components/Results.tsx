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

    const results = sortedData.filter((item: Result) =>
      selectedGenres.every((genre) => item.genres_tags.includes(genre))
    );

    // Update the state
    setFilteredResults(results);
    setCurrentPage(1);
  }, [selectedGenres]);

  if (selectedGenres.length === 0) {
    return (
      <div className="results p-4">
        <h2 className="text-xl font-bold">Results</h2>
        <p>Please select filters</p>
      </div>
    );
  }

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
    <div className="results p-4">
      <h2 className="text-xl font-bold">Results</h2>
      {paginatedResults.length > 0 ? (
        <ul className="space-y-4">
          {paginatedResults.map((result) => (
            <li
              key={`${result.id}-${result.datetime}`}
              className="flex h-48 border rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
              onClick={() => window.open(result.link, "_blank")}
            >
              <img
                src={result.image}
                alt={result.title}
                className="w-1/3 object-contain"
              />
              <div className="w-2/3 p-4 flex flex-col justify-between">
                <h3 className="text-xl font-bold">{result.title}</h3>
                <p className="text-gray-600">{result.genres_tags}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for the selected genres.</p>
      )}
      {filteredResults.length > RESULTS_PER_PAGE && (
        <div className="pagination mt-4 flex justify-center space-x-2">
          <button
            onClick={handleFirstPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}

export default Results;
