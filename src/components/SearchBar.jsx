import React from 'react';

export default function SearchBar(props) {
  return (
    <div {...props}>
      <form action="" class="search-bar">
        <input type="search" name="search" pattern=".*\S.*" required />
        <button class="search-btn" type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
