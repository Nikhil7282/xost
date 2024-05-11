import { useState } from "react";

function CustomInput() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="search-container">
      <div className="search-input">
        <div>
          <input
            className="input"
            style={{ backgroundColor: "white" }}
            placeholder="Search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomInput;
