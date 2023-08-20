import React, { useState, useEffect } from "react";
import AscendingSort from "../components/AscendingSort";
import DescendingSort from "../components/Descending ";
import SearchBar from "../components/filter";
import Pagination from "../components/pagination";
import "./../assets/css/homepage.css";
import ApexSingleLineChart from "../components/ApexSingleLineChart";
import Popup from "reactjs-popup";
import moment from "moment";

export default function Homepage() {
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [chartData, setChartsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [search, setSearch] = useState("");
  const [productdata, setproductData] = useState([]);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const numOfPage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(numOfPage + 1).keys()].slice(1);
  const [open, setOpen] = useState(false);
  const [shouldShowChart, setShouldShowChart] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const fetchInfo = async () => {
    fetch("/api/transactions")
      .then((response) => response.json())
      .then((json) => {
        console.log(json, "data");
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
  const getPopUpChart = (chartData) => {
    console.log(chartData);
    setOpen(!open);
    setChartsData(chartData);
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
  return (
    <>
      <div className="container bg-light">
        {/* <SearchBar
          search={search}
          handleSearchInput={handleSearchInput}
          handleSearchBtn={handleSearchBtn}
          handleResetBtn={handleResetBtn}
        /> */}
        <div className="row flex-wrap">
          <div className="col-lg-9 col-md-12 col-sm-12">
            <h4 className="text-center">Customers Transaction Details</h4>
            <div className="row">
              <div className="col-lg-4">
                <ul>
                  {records.map((user, index) => (
                    <li
                      onClick={() => {
                        setSelectedCustomer(user);
                        setShouldShowChart(false);
                      }}
                      key={index}
                    >
                      <span>{user.customer_id} </span>
                      <span>{user.customer_name}</span>{" "}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-8">
                {selectedCustomer && (
                  <div>
                    <div className="card">
                      <div>
                        <span className="card-heading">Customer Id : </span>
                        <span> {selectedCustomer.customer_id}</span>
                      </div>
                      <div>
                        <span className="card-heading">Customer Name : </span>
                        <span> {selectedCustomer.customer_name}</span>
                      </div>
                      <div
                        onClick={() => {
                          setShouldShowChart(!shouldShowChart);
                        }}
                      >
                        <span className="card-heading">Product Name : </span>
                        <span> {selectedCustomer.product_purchased}</span>
                      </div>
                      <div>
                        <span className="card-heading">Quantity : </span>
                        <span> {selectedCustomer.quantity}</span>
                      </div>
                      <div>
                        <span className="card-heading">
                          Date Of Purchase :{" "}
                        </span>
                        <span>
                          {" "}
                          {moment(selectedCustomer.month_year).format(
                            " DD-MM-YYYY"
                          )}
                        </span>
                      </div>
                    </div>

                    {shouldShowChart && (
                      <div style={{ overflow: "auto" }}>
                        <ApexSingleLineChart
                          series={[
                            {
                              name: selectedCustomer.chartData.name,
                              data: selectedCustomer.chartData.data,
                            },
                          ]}
                          labels={selectedCustomer.chartData.labels}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={numOfPage}
        prePage={prePage}
        nextPage={nextPage}
        changePage={changeCPage}
      />
    </>
  );
}
