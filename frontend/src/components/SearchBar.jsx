import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSearchItems } from "../redux/userSlice";

function SearchBar({ fullWidth, currentCity }) {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const handleSearchItems = async () => {
    try {
      const result = await axios.get(
        `/api/item/search-items?query=${query}&city=${currentCity}`,
        { withCredentials: true },
      );
      dispatch(setSearchItems(result?.data?.data));
    } catch (error) {
      console.log("error : ", error);
      handleApiError(error);
    }
  };
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        handleSearchItems();
      } else {
        dispatch(setSearchItems(null));
      }
    }, 500); // wait 500ms after typing stops

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div
      className={`flex items-center bg-white border border-gray-200 rounded-full px-3 py-2 shadow-sm hover:shadow-md transition-all ${
        fullWidth ? "w-full" : "max-w-xs"
      }`}
    >
      <IoIosSearch size={22} className="text-gray-500" />
      <input
        type="text"
        placeholder="Search food..."
        className="ml-2 bg-transparent outline-none text-sm w-full"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
}

export default SearchBar;
