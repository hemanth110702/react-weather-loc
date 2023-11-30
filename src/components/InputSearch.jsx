const InputSearch = ({ setLocation, inputRef }) => {
  const handleInputSearch = async (e) => {
    if (e.target.value != "") {
      const search_response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${e.target.value}&limit=5&appid=4cb69279ed43fd0729031826cae5c55c`
      );
      const searchData = await search_response.json();
      console.log(searchData);
      dropdownMenu.innerHTML = "";
      searchData.forEach((loc) => {
        const dropDownItem = document.createElement("div");
        dropDownItem.classList.add("dropdown-item");
        dropDownItem.textContent = `${loc.name} ,${loc.country}`;
        dropDownItem.addEventListener("click", () => {
          document.querySelector(
            ".dropdown-input"
          ).value = `${loc.name}, ${loc.country}`;
          e.target.value = `${loc.name}, ${loc.country}`;
          dropdownMenu.innerHTML = "";
          const searchLoc = { name: loc.name, country: loc.country };
          setLocation((prevLoc) => ({ ...prevLoc, ...searchLoc }));
        });
        dropdownMenu.appendChild(dropDownItem);
      });
    }
  };

  return (
    <div className="input-container">
      <div className="dropdown">
        <input
          type="text"
          className="dropdown-input"
          placeholder="Type to search locations"
          onChange={handleInputSearch}
          ref={inputRef}
        />
        <div className="dropdown-menu" id="dropdownMenu"></div>
      </div>
    </div>
  );
};

export default InputSearch;
