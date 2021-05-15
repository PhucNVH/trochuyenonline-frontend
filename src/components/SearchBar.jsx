import React from 'react';
import './SearchBar.css';
export default function SearchBar(props) {
  return (
    <div {...props}>
      <form action="" class="search-bar flex  p-0 justify-end">
        <input type="search" name="search" pattern=".*\S.*" required />
        <button class="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
