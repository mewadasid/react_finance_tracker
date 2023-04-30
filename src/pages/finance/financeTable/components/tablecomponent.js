import { React, useEffect, useState, useRef } from "react";
import Pagination from "./pagination";
export default function Tablecomponent(props) {
  const [newData, setNewData] = useState(props.transactions);
  console.log(props.transactions, "HGG");
  const [pagination, setPagination] = useState({
    totalpage: 0,
    limit: props.fixedlimit,
    pageno: 1,
    pages: [],
  });

  const changepageno = (pageno) => {
    setPagination({
      ...pagination,
      pageno: pageno,
    });
  };

  useEffect(() => {
    let pagesDisplay = [];
    for (
      let i = 1;
      i <= Math.ceil(props.transactions.length / pagination.limit);
      i++
    ) {
      pagesDisplay.push(i);
    }

    setPagination({ ...pagination, pages: pagesDisplay });
  }, []);

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

  const groupBy = [
    { value: "none", key: "none" },
    { value: "Month Year", key: "tran_month" },
    { value: "Transaction type", key: "tran_type" },
    { value: "From Account", key: "tran_from" },
    { value: "To Account", key: "tran_to" },
  ];
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
    <table className="table main_table">
      <thead>
        <th onClick={() => sorting("tran_date")}>Transaction Date</th>
        <th onClick={() => sorting("tran_month")}>Month Year</th>
        <th onClick={() => sorting("tran_type")}>Transaction Type</th>
        <th onClick={() => sorting("tran_from")}>Transaction From</th>
        <th onClick={() => sorting("tran_to")}>To</th>
        <th onClick={() => sorting("tran_amount")}>Amount</th>
        <th onClick={() => sorting("tran_receipt")}>Receipt</th>
        <th onClick={() => sorting("tran_note")}>Notes</th>
      </thead>
      <tbody>
        {newData
          .slice(
            (pagination.pageno - 1) * pagination.limit,
            pagination.pageno * pagination.limit
          )
          .map((item, index) => {
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
              </tr>
            );
          })}
      </tbody>
      <Pagination pageTable={pagination} changepageno={changepageno} />
    </table>
  );
}
