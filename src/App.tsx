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
        <h2 className="text-xl font-bold p-4">Disclaimer</h2>
        <p className="text-blue-900">
          This tool provides a category-based sorting feature specifically for
          the website{" "}
          <a
            href="https://fitgirl-repacks.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900"
          >
            https://fitgirl-repacks.site/
          </a>
          . By selecting a result, you will be redirected to the corresponding
          link on the official site. The entries are organized chronologically,
          with the most recent releases appearing first, which may offer better
          availability. Please note that the data is updated periodically, with
          the most recent update completed on August 18, 2024, to include the
          latest files.
        </p>
      </div>
    </div>
  );
}

export default App;
