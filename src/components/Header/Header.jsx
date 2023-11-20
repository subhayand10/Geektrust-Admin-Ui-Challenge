import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";

function Header({ userData, setTotCountUser, setPaginatedData, setSearching }) {
  const [textSearch, setTextSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const fetchUsers = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    return await axios.get(url);
  };

  useEffect(() => {
    fetchUsers().then((usersResponse) => {
      setSearchData(usersResponse.data);
    });
  }, []);

  const callFilter = (textSearch) => {
    if (!textSearch.length) {
      setTotCountUser(46);
      setSearching(false);
      return searchData;
    }
    let newData = userData.filter((user) => {
      if (
        user.name.toLowerCase().startsWith(textSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(textSearch.toLowerCase()) ||
        user.role.toLowerCase().startsWith(textSearch.toLowerCase())
      ) {
        return user;
      }
    });
    if (newData.length == 0) setTotCountUser(46);
    else {
      setTotCountUser(newData.length);
      setSearching(true);
    }
    return newData;
  };

  const handleSearchChange = (e) => {
    setTextSearch(e.target.value);
  };

  useEffect(() => {
    if (textSearch) {
      setTotCountUser(callFilter(textSearch).length);
      setSearching(true);
    } else {
      setTotCountUser(46);
      setSearching(false);
    }
  }, [textSearch, setSearching, setTotCountUser]);

  useEffect(() => {
    setPaginatedData(callFilter(textSearch));
    if (callFilter(textSearch).length > 10) setSearching(false);
  }, [textSearch]);

  return (
    <div className="Header">
      <div>
        <input
          type="text"
          placeholder="Search.."
          value={textSearch}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default Header;
