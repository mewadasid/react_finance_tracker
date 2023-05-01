import { React, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
export default function Tablecomponent(props) {
  const [newData, setNewData] = useState(props.transactions);

  const [currentPage, setCurrentPage] = useState(1);
  const perPageLimit = 2;
  const firstIndex = currentPage;
  const displayData = newData.slice(
    (firstIndex - 1) * perPageLimit,
    firstIndex * perPageLimit
  );

  const noPage = Math.ceil(newData.length / perPageLimit);
  const number = [...Array(noPage + 1).keys()].slice(1);

  const pageChange = (pageNo) => {
    setCurrentPage(pageNo);
    console.log(pageNo);
  };

  const previous = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const next = () => {
    if (currentPage !== noPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [lastSortkey, setLastSortKey] = useState(null);
  const sortOrder = useRef("");
  const sorting = (sortBy) => {
    setLastSortKey(sortBy);
    if (sortBy === lastSortkey && sortOrder.current === "asc") {
      sortOrder.current = "desc";
    } else if (sortBy === lastSortkey && sortOrder.current === "desc") {
      sortOrder.current = "";
    } else {
      sortOrder.current = "asc";
    }
    performSort(sortBy);
  };

  const month = [
    "JAN 2023",
    "FEB 2023",
    "MARCH 2023",
    "APRIL 2023",
    "MAY 2023",
    "JUNE 2023",
    "JULY 2023",
    "AUGUST 2023",
    "SEPTEMBER 2023",
    "OCTOBER 2023",
    "NOVEMBER 2023",
    "DECEMBER 2023",
  ];
  const monthChecker = (months, sort) => {
    let sortedmonth;
    switch (sort) {
      case "asc":
        sortedmonth = [...newData].sort((a, b) =>
          month.indexOf(a[months]) > month.indexOf(b[months]) ? 1 : -1
        );
        break;
      case "desc":
        sortedmonth = [...newData].sort((a, b) =>
          month.indexOf(a[months]) < month.indexOf(b[months]) ? 1 : -1
        );
        break;
      default:
        sortedmonth = props.transactions;
        break;
    }
    return sortedmonth;
  };

  const dateChecker = (dates, sort) => {
    let sorteddate;
    switch (sort) {
      case "asc":
        sorteddate = [...newData].sort((a, b) => {
          const objA = new Date(a[dates]);
          const objB = new Date(b[dates]);
          return objA > objB ? 1 : -1;
        });
        break;
      case "desc":
        sorteddate = [...newData].sort((a, b) => {
          const objA = new Date(a[dates]);
          const objB = new Date(b[dates]);
          return objA < objB ? 1 : -1;
        });
        break;
      default:
        sorteddate = props.transactions;
        break;
    }
    return sorteddate;
  };

  const amountChecker = (amount, sort) => {
    let sortedamount;
    switch (sort) {
      case "asc":
        sortedamount = [...newData].sort((a, b) => {
          return Number(a[amount]) > Number(b[amount]) ? 1 : -1;
        });
        break;
      case "desc":
        sortedamount = [...newData].sort((a, b) => {
          return Number(a[amount]) < Number(b[amount]) ? 1 : -1;
        });

        break;
      default:
        sortedamount = props.transactions;
        break;
    }
    return sortedamount;
  };

  const performSort = (sortBy, data) => {
    switch (sortOrder.current) {
      case "asc":
        if (sortBy === "tran_date") {
          const data3 = dateChecker(sortBy, "asc");
          setNewData(data3);
        } else if (sortBy === "tran_month") {
          const data3 = monthChecker(sortBy, "asc");
          setNewData(data3);
        } else if (sortBy === "tran_amount") {
          const data3 = amountChecker(sortBy, "asc");
          setNewData(data3);
        } else {
          const data3 = [...newData].sort((a, b) =>
            a[sortBy].localeCompare(b[sortBy])
          );
          setNewData(data3);
        }
        break;

      case "desc":
        if (sortBy === "tran_date") {
          const data3 = dateChecker(sortBy, "desc");
          setNewData(data3);
        } else if (sortBy === "tran_month") {
          const data3 = monthChecker(sortBy, "desc");
          setNewData(data3);
        } else if (sortBy === "tran_amount") {
          const data3 = amountChecker(sortBy, "desc");
          setNewData(data3);
        } else {
          const data3 = [...newData].sort((a, b) =>
            b[sortBy].localeCompare(a[sortBy])
          );
          setNewData(data3);
        }
        break;
      default:
        const data3 = props.transactions;
        setNewData(data3);
        break;
    }
  };

  return (
    <>
      <table class="table main_table">
        <thead class="table-dark">
          <tr>
            {sortOrder.current === "asc" && lastSortkey === "tran_date" ? (
              <th scope="col" onClick={() => sorting("tran_date")}>
                Transaction Date
                <i class="fa-sharp fa-solid fa-caret-up mx-3"></i>
              </th>
            ) : sortOrder.current === "desc" && lastSortkey === "tran_date" ? (
              <th scope="col" onClick={() => sorting("tran_date")}>
                Transaction Date
                <i class="fa-sharp fa-solid fa-caret-down mx-3"></i>
              </th>
            ) : (
              <th scope="col" onClick={() => sorting("tran_date")}>
                Transaction Date
              </th>
            )}

            {sortOrder.current === "asc" && lastSortkey === "tran_month" ? (
              <th scope="col" onClick={() => sorting("tran_month")}>
                Month Year
                <i class="fa-sharp fa-solid fa-caret-up mx-3"></i>
              </th>
            ) : sortOrder.current === "desc" && lastSortkey === "tran_month" ? (
              <th scope="col" onClick={() => sorting("tran_month")}>
                Month Year
                <i class="fa-sharp fa-solid fa-caret-down mx-3"></i>
              </th>
            ) : (
              <th scope="col" onClick={() => sorting("tran_month")}>
                Month Year
              </th>
            )}

            {sortOrder.current === "asc" && lastSortkey === "tran_type" ? (
              <th scope="col" onClick={() => sorting("tran_type")}>
                Transaction Type
                <i class="fa-sharp fa-solid fa-caret-up mx-3"></i>
              </th>
            ) : sortOrder.current === "desc" && lastSortkey === "tran_type" ? (
              <th scope="col" onClick={() => sorting("tran_type")}>
                Transaction Type
                <i class="fa-sharp fa-solid fa-caret-down mx-3"></i>
              </th>
            ) : (
              <th scope="col" onClick={() => sorting("tran_type")}>
                Transaction Type
              </th>
            )}

            {sortOrder.current === "asc" && lastSortkey === "tran_from" ? (
              <th scope="col" onClick={() => sorting("tran_from")}>
                Transaction From
                <i class="fa-sharp fa-solid fa-caret-up mx-3"></i>
              </th>
            ) : sortOrder.current === "desc" && lastSortkey === "tran_from" ? (
              <th scope="col" onClick={() => sorting("tran_from")}>
                Transaction From
                <i class="fa-sharp fa-solid fa-caret-down mx-3"></i>
              </th>
            ) : (
              <th scope="col" onClick={() => sorting("tran_from")}>
                Transaction From
              </th>
            )}

            {sortOrder.current === "asc" && lastSortkey === "tran_to" ? (
              <th scope="col" onClick={() => sorting("tran_to")}>
                To
                <i class="fa-sharp fa-solid fa-caret-up mx-3"></i>
              </th>
            ) : sortOrder.current === "desc" && lastSortkey === "tran_to" ? (
              <th scope="col" onClick={() => sorting("tran_to")}>
                To
                <i class="fa-sharp fa-solid fa-caret-down mx-3"></i>
              </th>
            ) : (
              <th scope="col" onClick={() => sorting("tran_to")}>
                To
              </th>
            )}

            {sortOrder.current === "asc" && lastSortkey === "tran_amount" ? (
              <th scope="col" onClick={() => sorting("tran_amount")}>
                Amount
                <i class="fa-sharp fa-solid fa-caret-up mx-3"></i>
              </th>
            ) : sortOrder.current === "desc" && lastSortkey === "tran_amount" ? (
              <th scope="col" onClick={() => sorting("tran_amount")}>
                Amount
                <i class="fa-sharp fa-solid fa-caret-down mx-3"></i>
              </th>
            ) : (
              <th scope="col" onClick={() => sorting("tran_amount")}>
                Amount
              </th>
            )}

            <th scope="col">Receipt</th>

            {sortOrder.current === "asc" && lastSortkey === "tran_note" ? (
              <th scope="col" onClick={() => sorting("tran_note")}>
                Notes
                <i class="fa-sharp fa-solid fa-caret-up mx-3"></i>
              </th>
            ) : sortOrder.current === "desc" && lastSortkey === "tran_note" ? (
              <th scope="col" onClick={() => sorting("tran_note")}>
                Notes
                <i class="fa-sharp fa-solid fa-caret-down mx-3"></i>
              </th>
            ) : (
              <th scope="col" onClick={() => sorting("tran_note")}>
                Notes
              </th>
            )}
            <th scope="col">View</th>
            <th scope="col">Edit Data</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.tran_date}</td>
                <td>{item.tran_month}</td>
                <td>{item.tran_type}</td>
                <td>{item.tran_from}</td>
                <td>{item.tran_to}</td>
                <td>
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                  }).format(item.tran_amount)}
                </td>
                <td>
                  <img src={item.tran_receipt} width="100px" alt="Content" />
                </td>
                <td>{item.tran_note}</td>
                <td>
                  <Link to={`/user/${item.tran_id}`}>
                    <i class="fa-solid fa-eye"></i>
                  </Link>
                </td>
                <td>
                  <Link to={`/edit/${item.tran_id}`}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        pageChange={pageChange}
        newData={newData}
        cuurentPage={currentPage}
        number={number}
        previous={previous}
        next={next}
        noPage={noPage}
      />
    </>
  );
}
