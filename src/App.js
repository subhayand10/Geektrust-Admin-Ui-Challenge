import React, { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";

function App() {
  const [userData, setUserData] = useState([]);
  const [selectedChecked, setSelectedChecked] = useState([]);
  const [totCountUser, setTotCountUser] = useState(46);
  const [checked, setChecked] = useState(false);
  const [paginatedData, setPaginatedData] = useState([]);
  const [searching, setSearching] = useState(false);

  return (
    <>
      <Header
        userData={userData}
        setUserData={setUserData}
        setTotCountUser={setTotCountUser}
        setPaginatedData={setPaginatedData}
        setSearching={setSearching}
      />
      <Dashboard
        userData={userData}
        setUserData={setUserData}
        selectedChecked={selectedChecked}
        setSelectedChecked={setSelectedChecked}
        setTotCountUser={setTotCountUser}
        checked={checked}
        setChecked={setChecked}
        paginatedData={paginatedData}
        setPaginatedData={setPaginatedData}
      />
      <Footer
        userData={userData}
        setUserData={setUserData}
        selectedChecked={selectedChecked}
        totCountUser={totCountUser}
        setTotCountUser={setTotCountUser}
        setChecked={setChecked}
        paginatedData={paginatedData}
        setPaginatedData={setPaginatedData}
        searching={searching}
      />
    </>
  );
}

export default App;
