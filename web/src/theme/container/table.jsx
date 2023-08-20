import React, { useState, useEffect } from "react";
import AscendingSort from "../components/AscendingSort";
import DescendingSort from "../components/Descending ";
import SearchBar from "../components/filter";
import Pagination from "../components/pagination";
import "./../assets/css/table.css";
import ReactApexChart from "react-apexcharts";
import ApexSingleLineChart from "../components/ApexSingleLineChart";
import Popup from "reactjs-popup";

export default function Table() {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [productdata, setproductData] = useState([]);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = productdata.slice(firstIndex, lastIndex);
  const numOfPage = Math.ceil(productdata.length / recordsPerPage);
  const numbers = [...Array(numOfPage + 1).keys()].slice(1);
  const [open, setOpen] = useState(false);

  const fetchInfo = async () => {
    fetch("http://localhost:3001/api/transactions")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        setCurrentUsers(json.data.transactions);
        setUsers(json.data.transactions);
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
    if (search === "") {
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
        user["lastName"].toLowerCase().includes(search.toLowerCase())
    );

    if (filteredUsers === false) {
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

  var ids = [];
  const getPopUpChart = (productName) => {
    return (
      <Popup open={open} closeOnDocumentClick onClose={() => setOpen(!open)}>
        <ApexSingleLineChart
          series={currentUsers.series}
          labels={currentUsers.labels}
        />
      </Popup>
    );
  };
  useEffect(() => {
    var ar = users.filter(function (o) {
      const idx = ids.findIndex(
        (id) => id.product_purchased === o.product_purchased
      );
      if (idx !== -1) {
        return false;
      } else if (idx === -1) {
        ids.push(o);
        return true;
      }
    });
    setproductData(ar);
  }, [users]);
  // console.log(eyeColorsArr, "eyecolorsArr");
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
                    <AscendingSort
                      field="product_purchased"
                      handleSort={handleSort}
                    />
                    Product Purchased
                    <DescendingSort
                      field="product_purchased"
                      handleSort={handleSort}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((user, index) => (
                  <tr
                    key={index}
                    title={index + 1 + (currentPage - 1) * recordsPerPage}
                  >
                    <th scope="row">{user.customer_id}</th>
                    <td>{user.product_purchased}</td>
                    <td>
                      {" "}
                      <button
                        type="button"
                        className="button"
                        onClick={() => setOpen((o) => !o)}
                      >
                        {user.product_purchased}
                      </button>
                    </td>

                    <td></td>
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
        </div>
      </div>
    </>
  );
}
