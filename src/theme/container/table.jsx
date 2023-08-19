import React, { useState, useEffect } from "react";
import AscendingSort from "../components/AscendingSort";
import DescendingSort from "../components/Descending ";
import SearchBar from "../components/filter";
import Pagination from "../components/pagination";
import "./../assets/css/table.css";
export default function Table() {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [eyeColorObj, setEyeColorObj] = useState({});
  const [search, setSearch] = useState("");

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = currentUsers.slice(firstIndex, lastIndex);
  const numOfPage = Math.ceil(currentUsers.length / recordsPerPage);
  const numbers = [...Array(numOfPage + 1).keys()].slice(1);

  const fetchInfo = () => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((json) => {
        setCurrentUsers(json.users);
        setUsers(json.users);
      })
      .finally(() => {});
  };
  const handleSort = (direction, field) => {
    let sortUser = [...currentUsers];

    switch (direction) {
      case "asc":
        sortUser.sort((a, b) => (a[field] < b[field] ? -1 : 1));
        break;

      case "desc":
        sortUser.sort((a, b) => (a[field] > b[field] ? -1 : 1));
        break;

      default:
      // code block
    }

    setCurrentUsers(sortUser);
  };
  const handleSearchInput = (event) => {
    if (search == "") {
      setCurrentUsers(users);
      setSearch(event.target.value);
    } else {
      console.log("value is:", event.target.value);
      setSearch(event.target.value);
    }
  };

  const handleSearchBtn = (event) => {
    setCurrentUsers(users);

    let filteredUsers = Object.values(currentUsers).filter(
      (user) =>
        user["firstName"].toLowerCase().includes(search.toLowerCase()) ||
        user["lastName"].toLowerCase().includes(search.toLowerCase()) ||
        user["age"].toString().includes(search) ||
        user["eyeColor"].toLowerCase().includes(search.toLowerCase()) ||
        user["phone"].toString().includes(search)
    );

    if (filteredUsers == false) {
      alert("Nothing Found");
    } else {
      setCurrentUsers(filteredUsers);
      data();
    }
  };

  const handleResetBtn = (event) => {
    window.location.reload();
  };

  function nextPage() {
    if (currentPage !== numbers[numbers.length - 1]) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }
  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    if (currentUsers.length > 0) {
      const eyeColorFreq = {};

      for (let index = 0; index < currentUsers.length; index++) {
        let ele = currentUsers[index].eyeColor;

        if (eyeColorFreq[ele]) {
          eyeColorFreq[ele] += 1;
        } else {
          eyeColorFreq[ele] = 1;
        }
      }

      setEyeColorObj(eyeColorFreq);
    }
  }, [currentUsers, users]);

  const data = () => {
    if (currentUsers.length > 0) {
      const eyeColorFreq = {};

      for (let index = 0; index < currentUsers.length; index++) {
        let ele = currentUsers[index].eyeColor;

        if (eyeColorFreq[ele]) {
          eyeColorFreq[ele] += 1;
        } else {
          eyeColorFreq[ele] = 1;
        }
      }

      setEyeColorObj(eyeColorFreq);
    }
  };

  return (
    <>
      <div className="container bg-light">
        <SearchBar
          search={search}
          handleSearchInput={handleSearchInput}
          handleSearchBtn={handleSearchBtn}
          handleResetBtn={handleResetBtn}
        />
        <div className="row flex-wrap">
          <div className="col-lg-9 col-md-12 col-sm-12">
            <h2 className="table-heading">Users Table:</h2>
            <table className="table bordered-table border-dark table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <AscendingSort field="firstName" handleSort={handleSort} />
                    First
                    <DescendingSort field="firstName" handleSort={handleSort} />
                  </th>
                  <th scope="col">
                    <AscendingSort field="lastName" handleSort={handleSort} />
                    Last
                    <DescendingSort field="lastName" handleSort={handleSort} />
                  </th>
                  <th scope="col">
                    <AscendingSort field="age" handleSort={handleSort} />
                    Age
                    <DescendingSort field="age" handleSort={handleSort} />
                  </th>
                  <th scope="col">
                    <AscendingSort field="eyeColor" handleSort={handleSort} />
                    Eye Color
                    <DescendingSort field="eyeColor" handleSort={handleSort} />
                  </th>
                  <th scope="col">
                    <AscendingSort field="phone" handleSort={handleSort} />
                    Phone
                    <DescendingSort field="phone" handleSort={handleSort} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((user, index) => (
                  <tr
                    key={index}
                    title={index + 1 + (currentPage - 1) * recordsPerPage}
                  >
                    <th scope="row">{user.id}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td>{user.eyeColor}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPages={numOfPage}
              prePage={prePage}
              nextPage={nextPage}
              changePage={changeCPage}
            />
          </div>
          {/* <div className="col-lg-3 col-md-12 col-sm-12 mt-3">
            <div id="chart">
              <h4 className="text-center">Eye Color Pie Chart:</h4>
              <ReactApexChart
                options={multilineData.options}
                series={multilineData.series}
                type="pie"
                width={350}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "1.2em",
                }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
