import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";

function Dashboard({
  userData,
  setUserData,
  selectedChecked,
  setSelectedChecked,
  setTotCountUser,
  checked,
  setChecked,
  paginatedData,
  setPaginatedData,
}) {
  let [nameState, setNameState] = useState("");
  let [emailState, setEmailState] = useState("");
  let [roleState, setRoleState] = useState("");
  let [edit, setEdit] = useState(null);

  const fetchUsers = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    return await axios.get(url);
  };

  const deleteRow = (id) => {
    let deletedData = userData.filter((user) => {
      if (user.id != id) {
        return user;
      }
    });
    setUserData(deletedData);
  };

  const handleCheckboxChange = (userId) => {
    setSelectedChecked((previousSelectedChecked) => {
      if (previousSelectedChecked.includes(userId))
        return previousSelectedChecked.filter((id) => id !== userId);
      else return [...previousSelectedChecked, userId];
    });
  };

  const handleAllSelect = () => {
    setChecked((previousChecked) => {
      if (!previousChecked) {
        setSelectedChecked((previousSelected) => [
          ...previousSelected,
          ...paginatedData.map((item) => item.id),
        ]);
      } else {
        setSelectedChecked([]);
      }
      return !previousChecked;
    });
  };

  const saveDetails = (e) => {
    setUserData((previousState) => {
      let editedState = previousState.map((user) => {
        if (user.id == edit) {
          if (e.target.id == "name") user.name = e.target.value;
          if (e.target.id == "email") user.email = e.target.value;
          if (e.target.id == "role") user.role = e.target.value;
        }
        return user;
      });
      if (e.type == "keydown" && e.key == "Enter") setEdit(-1);
      return editedState;
    });
  };

  useEffect(() => {
    console.log(selectedChecked);
  }, [selectedChecked]);

  useEffect(() => {
    fetchUsers().then((usersResponse) => {
      setUserData(usersResponse.data);
      setPaginatedData(usersResponse.data);
    });
  }, []);

  let gridJsx = (
    <div className="grid-container">
      <div className="grid-item">
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={handleAllSelect}
        />
      </div>
      <div className="grid-item">
        <b>Name</b>
      </div>
      <div className="grid-item">
        <b>Email</b>
      </div>
      <div className="grid-item">
        <b>Role</b>
      </div>
      <div className="grid-item">
        <b>Actions</b>
      </div>

      {paginatedData.map((user, index) => {
        if (index < 10)
          return (
            <React.Fragment key={user.id}>
              <div className="grid-item">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={checked || selectedChecked.includes(user.id)}
                  onChange={(e) => {
                    handleCheckboxChange(user.id);
                    setChecked(false);
                    if (e.target.checked == true) {
                      let key = `${user.id}`;
                      setSelectedChecked([...selectedChecked, key]);
                    }
                  }}
                />
              </div>
              <div
                className={
                  checked || selectedChecked.includes(user.id)
                    ? "grid-item checked-highlight"
                    : "grid-item "
                }
              >
                {user.id === edit ? (
                  <input
                    type="text"
                    id="name"
                    value={nameState}
                    onChange={(e) => {
                      setNameState(e.target.value);
                    }}
                    onKeyDown={saveDetails}
                    onBlur={saveDetails}
                  />
                ) : (
                  <input
                    className="transparent-textbox"
                    type="text"
                    defaultValue={user.name}
                  />
                )}
              </div>

              <div
                className={
                  checked || selectedChecked.includes(user.id)
                    ? "grid-item checked-highlight"
                    : "grid-item "
                }
              >
                {user.id === edit ? (
                  <input
                    type="text"
                    id="email"
                    value={emailState}
                    onChange={(e) => {
                      setEmailState(e.target.value);
                    }}
                    onKeyDown={saveDetails}
                    onBlur={saveDetails}
                  />
                ) : (
                  <input
                    className="transparent-textbox"
                    type="text"
                    defaultValue={user.email}
                  />
                )}
              </div>

              <div
                className={
                  checked || selectedChecked.includes(user.id)
                    ? "grid-item checked-highlight"
                    : "grid-item "
                }
              >
                {user.id === edit ? (
                  <input
                    type="text"
                    id="role"
                    value={roleState}
                    onChange={(e) => {
                      setRoleState(e.target.value);
                    }}
                    onKeyDown={saveDetails}
                    onBlur={saveDetails}
                  />
                ) : (
                  <input
                    className="transparent-textbox"
                    type="text"
                    defaultValue={user.role}
                  />
                )}
              </div>

              <div
                className={
                  checked || selectedChecked.includes(user.id)
                    ? "grid-item checked-highlight"
                    : "grid-item "
                }
              >
                <button
                  onClick={(e) => {
                    setEdit(user.id);
                    setNameState(user.name);
                    setEmailState(user.email);
                    setRoleState(user.role);
                  }}
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button
                  onClick={() => {
                    deleteRow(user.id);
                    setTotCountUser((prevLen) => prevLen - 1);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </React.Fragment>
          );
      })}
    </div>
  );

  return <>{gridJsx}</>;
}

export default Dashboard;
