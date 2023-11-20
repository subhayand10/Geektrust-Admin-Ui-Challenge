import React, { useEffect, useState } from "react";
import "./Footer.css";
import axios from "axios";

function Footer({
  userData,
  setUserData,
  selectedChecked,
  totCountUser,
  setTotCountUser,
  setChecked,
  paginatedData,
  setPaginatedData,
  searching,
}) {
  let [highlight, setHighlight] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  let [noPagesArray, setNoPagesArray] = useState([]);

  const setNewDataView = (pageNo) => {
    if (!searching) {
      setChecked(false);
      let startIndex = (pageNo - 1) * 10;
      let endIndex = pageNo * 10;
      if (pageNo === noPagesArray.length) {
        setPaginatedData(userData.slice(startIndex, userData.length));
      } else {
        setPaginatedData(userData.slice(startIndex, endIndex));
      }
    }
  };

  useEffect(() => {
    let lenData = null;
    if (!searching) lenData = userData.length;
    else {
      lenData = totCountUser;
    }
    let noPages = Math.floor(lenData / 10);
    if (lenData % 10 > 0) noPages += 1;
    let newPagesArray = [];
    if (searching) {
      setNoPagesArray(Array.from({ length: noPages }, (_, index) => index + 1));
    } else {
      for (let i = 1; i <= noPages; i++) {
        newPagesArray.push(i);
      }
      setNoPagesArray(newPagesArray);
    }

    setNewDataView(highlight);
  }, [userData, totCountUser, searching]);

  const deleteSelected = () => {
    let deletedData = userData.filter((user) => {
      let returnFlag = true;
      for (let i = 0; i < selectedChecked.length; i++) {
        if (selectedChecked[i] == user.id) {
          returnFlag = false;
          setTotCountUser((prevLen) => prevLen - 1);
        }
      }
      return returnFlag;
    });
    setUserData(deletedData);
  };

  return (
    <>
      <div className="Footer">
        <div className="DeleteBtn">
          <button onClick={deleteSelected}>Delete Selected</button>
        </div>
        <div className="Pagination">
          <a
            href="#"
            onClick={() => {
              setNewDataView(1);
              setCurrentPage(1);
              setHighlight(1);
            }}
          >
            <i className="fa-solid fa-angles-left"></i>
          </a>

          <a
            href="#"
            onClick={() => {
              if (currentPage - 1 != 0) {
                setNewDataView(currentPage - 1);
                setHighlight(currentPage - 1);
                setCurrentPage((current) => current - 1);
              }
            }}
          >
            <i className="fa-solid fa-angle-left"></i>
          </a>

          {noPagesArray.map((no, index) => {
            return (
              <a
                className={highlight === no ? "active" : ""}
                key={index}
                href="#"
                onClick={(e) => {
                  setCurrentPage((current) => parseInt(e.target.textContent));
                  setHighlight(no);
                  setNewDataView(parseInt(e.target.textContent));
                }}
              >
                {no}
              </a>
            );
          })}

          <a
            href="#"
            onClick={() => {
              if (currentPage + 1 <= noPagesArray.length) {
                setNewDataView(currentPage + 1);
                setHighlight(currentPage + 1);
                setCurrentPage((current) => current + 1);
              }
            }}
          >
            <i className="fa-solid fa-angle-right"></i>
          </a>

          <a
            href="#"
            onClick={() => {
              setNewDataView(noPagesArray.length);
              setHighlight(noPagesArray.length);
              setCurrentPage(noPagesArray.length);
            }}
          >
            <i className="fa-solid fa-angles-right"></i>
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
