import React, { useState } from "react";
import "./App.css";
import Filters from "./components/Filters";
import Results from "./components/Results";

function App() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleFiltersSubmit = (genres: string[]) => {
    setSelectedGenres(genres);
    // You can use the selected genres to filter the results here
  };

  return (
    <div className="app-container flex bg-gray-100 min-h-screen">
      <div className="filters-container w-[500px] p-4 bg-blue-100">
        <Filters onSubmit={handleFiltersSubmit} />
      </div>
      <div className="results-container w-2/3 p-4 bg-green-100">
        <Results selectedGenres={selectedGenres} />
      </div>
      <div className="disclaimer-container w-1/4 p-4 bg-yellow-100">
        <h2>Disclaimer</h2>
        <p>This is a disclaimer text. Please read carefully.</p>
      </div>
    </div>
  );
}

export default App;
