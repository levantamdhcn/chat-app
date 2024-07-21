import React, { useState } from 'react';

interface SearchProp {
    placeholder: string
}

const Search = ({ placeholder}: SearchProp) => {
    const [, setValue] = useState("")
  return (
      <div className="search-wrapper">
          <div className="search-btn">
              <span className="icon-search"></span>
          </div>
          <input className="search-input" type="text" placeholder={placeholder} onChange={(e) => setValue(e.target.value)}/>
      </div>
  );
};

export default Search;
