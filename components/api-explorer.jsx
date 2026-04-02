"use client";

import { useMemo, useState } from "react";
import { API_DATA, CATEGORY_FILTERS, DOC_BASE, TYPES_DOC_URL } from "../lib/api-data";

function getDocsUrl(item) {
  return item.docsPath ? `${DOC_BASE}/${item.docsPath}` : TYPES_DOC_URL;
}

export default function ApiExplorer() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return API_DATA.filter((item) => {
      const categoryPass =
        activeCategory === "ALL" || item.category === activeCategory;
      const queryPass =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);

      return categoryPass && queryPass;
    });
  }, [activeCategory, query]);

  return (
    <>
      <div className="api-controls">
        <label className="search-wrap" htmlFor="api-search">
          <span className="sr-only">Search hooks</span>
          <input
            id="api-search"
            type="search"
            placeholder="Search by name or description..."
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <div className="chip-row" role="group" aria-label="Filter API categories">
          {CATEGORY_FILTERS.map((category) => (
            <button
              key={category}
              className={`chip-btn ${activeCategory === category ? "active" : ""}`}
              type="button"
              aria-pressed={activeCategory === category}
              aria-controls="api-grid"
              onClick={() => setActiveCategory(category)}
            >
              {category === "ALL" ? "All" : category}
            </button>
          ))}
        </div>
      </div>

      <p id="api-count" className="api-count">
        {filteredEntries.length} entries
      </p>

      <div id="api-grid" className="api-grid">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((item) => (
            <article className="api-card" key={`${item.category}-${item.name}`}>
              <span className="api-tag">{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <a href={getDocsUrl(item)} target="_blank" rel="noreferrer">
                Read docs →
              </a>
            </article>
          ))
        ) : (
          <article className="api-card">
            <h3>No results</h3>
            <p>Try a different keyword or choose another category.</p>
          </article>
        )}
      </div>
    </>
  );
}
