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
  const [showAll, setShowAll] = useState(false);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedGenres);
  };

  const handleClear = () => {
    setSelectedGenres([]);
    onSubmit([]);
  };

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  return (
    <div className="filters p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <label className="flex items-center space-x-2">
          <span>Also Show Unique</span>
          <input
            type="checkbox"
            checked={showAll}
            onChange={toggleShowAll}
            className="form-checkbox"
          />
        </label>
      </div>
      <ul className="flex flex-wrap gap-2">
        {sortedGenres
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([genre, count]) => showAll || count > 1)
          .map(([genre, count], index) => (
            <li key={index}>
              <button
                className={`px-2 py-1 text-sm rounded-full border ${
                  selectedGenres.includes(genre)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => toggleGenre(genre)}
              >
                {genre} ({count})
              </button>
            </li>
          ))}
      </ul>
      <div className="mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleSubmit}
        >
          Apply Filters
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleClear}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;
