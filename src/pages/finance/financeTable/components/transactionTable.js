import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/style.css'

export default function Transactiontable() {

    const sortOrder = useRef('');
    const transDetail = JSON.parse(localStorage.getItem("Transaction"));
    const [lastSortkey, setLastSortKey] = useState(null);
    const [sortedData, setSortedData] = useState(transDetail);
    console.log(transDetail, "BEFORE");

    const sorting = (sortBy) => {

        if (sortBy === lastSortkey && sortOrder.current === "asc") {
            sortOrder.current = "desc";
        }
        else if (sortBy === lastSortkey && sortOrder.current === "desc") {
            sortOrder.current = "";
        }
        else {
            sortOrder.current = "asc";
            setLastSortKey(sortBy);
        }
        performSort(sortBy);
    }

    const month = [
        'JAN 2023',
        'FEB 2023',
        'MARCH 2023',
        'APRIL 2023',
        'MAY 2023',
        'JUNE 2023',
        'JULY 2023',
        'AUGUST 2023',
        'SEPTEMBER 2023',
        'OCTOBER 2023',
        'NOVEMBER 2023',
        'DECEMBER 2023',
    ]
    const monthChecker = (months, sort) => {
        let sortedmonth;
        switch (sort) {
            case "asc":
                sortedmonth = [...transDetail].sort((a, b) =>
                    month.indexOf(a[months]) > month.indexOf(b[months]) ? 1 : -1
                );
                break;
            case "desc":
                sortedmonth = [...transDetail].sort((a, b) =>
                    month.indexOf(a[months]) < month.indexOf(b[months]) ? 1 : -1
                );
                break;
            default:
                sortedmonth = [...transDetail];
                break;
        }
        return sortedmonth;

    }

    const dateChecker = (dates, sort) => {

        let sorteddate;
        switch (sort) {
            case "asc":
                sorteddate = [...transDetail].sort((a, b) => {
                    const objA = new Date(a[dates]);
                    const objB = new Date(b[dates]);
                    return objA > objB ? 1 : -1;
                });
                break;
            case "desc":
                sorteddate = [...transDetail].sort((a, b) => {
                    const objA = new Date(a[dates]);
                    const objB = new Date(b[dates]);
                    return objA < objB ? 1 : -1;
                });
                break;
            default:
                sorteddate = [...transDetail];
                break;
        }
        return sorteddate;
    }

    const amountChecker = (amount, sort) => {

        let sortedamount;
        switch (sort) {
            case 'asc':
                sortedamount = [...transDetail].sort((a, b) => {
                    return Number(a[amount]) > Number(b[amount]) ? 1 : -1;
                });
                break;
            case 'desc':

                sortedamount = [...transDetail].sort((a, b) => {
                    return Number(a[amount]) < Number(b[amount]) ? 1 : -1;
                });
                console.log(sortedamount);
                break;
            default:
                sortedamount = [...transDetail];
                break
        }
        return sortedamount;
    }

    const performSort = (sortBy) => {

        switch (sortOrder.current) {
            case "asc":
                if (sortBy === "tran_date") {
                    const data3 = dateChecker(sortBy, 'asc');
                    setSortedData(data3);
                }
                else if (sortBy === 'tran_month') {
                    const data3 = monthChecker(sortBy, "asc");
                    setSortedData(data3);
                }
                else if (sortBy === "tran_amount") {
                    const data3 = amountChecker(sortBy, "asc");
                    setSortedData(data3);
                }
                else {
                    const data3 = [...transDetail].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
                    setSortedData(data3);
                }
                break;

            case "desc":
                if (sortBy === "tran_date") {

                    const data3 = dateChecker(sortBy, 'desc');
                    setSortedData(data3);
                }
                else if (sortBy === 'tran_month') {
                    const data3 = monthChecker(sortBy, "desc");
                    setSortedData(data3);
                }
                else if (sortBy === "tran_amount") {
                    const data3 = amountChecker(sortBy, "desc");
                    setSortedData(data3);
                }
                else {
                    const data3 = [...transDetail].sort((a, b) => b[sortBy].localeCompare(a[sortBy]));
                    setSortedData(data3);
                }
                break;
            default:
                const data3 = [...transDetail];
                setSortedData(data3);
                break;
        }

    }

    return (
        <div>
            <Link to={"/createTransaction"}> <button type="button" className="btn btn-primary my-4 ">Create Transaction</button></Link>
            <table className="table main_table">
                <thead className="table-dark">
                    <tr>
                        {lastSortkey === 'tran_date' && sortOrder.current === 'asc' ? <><th onClick={() => sorting("tran_date")}><i class="fa-solid fa-sort-down" />Transaction Date</th></> : lastSortkey === 'tran_date' && sortOrder.current === "desc" ? <><th onClick={() => sorting("tran_date")}><i class="fa-solid fa-sort-up" />Transaction Date</th></> : <th onClick={() => sorting("tran_date")}>Transaction Date</th>}


                        {lastSortkey === 'tran_month' && sortOrder.current === 'asc' ? <><th onClick={() => sorting("tran_month")}><i class="fa-solid fa-sort-down" />Month Year</th></> : lastSortkey === 'tran_month' && sortOrder.current === "desc" ? <><th onClick={() => sorting("tran_month")}><i class="fa-solid fa-sort-up" />Month Year</th></> : <><th onClick={() => sorting("tran_month")}>Month Year</th></>}

                        {lastSortkey === 'tran_type' && sortOrder.current === 'asc' ? <th onClick={() => sorting("tran_type")}><i class="fa-solid fa-sort-down" />Transaction Type</th> : lastSortkey === 'tran_type' && sortOrder.current === 'desc' ? <th onClick={() => sorting("tran_type")}><i class="fa-solid fa-sort-up" />Transaction Type</th> : <th onClick={() => sorting("tran_type")}>Transaction Type</th>}


                        {lastSortkey === 'tran_from' && sortOrder.current === 'asc' ? <th onClick={() => sorting("tran_from")}><i class="fa-solid fa-sort-down" />From Account</th> : lastSortkey === 'tran_from' && sortOrder.current === 'desc' ? <th onClick={() => sorting("tran_from")}><i class="fa-solid fa-sort-up" />From Account</th> : <th onClick={() => sorting("tran_from")}>From Account</th>}

                        {lastSortkey === 'tran_to' && sortOrder.current === 'asc' ? <th onClick={() => sorting("tran_to")}><i class="fa-solid fa-sort-down" />To Account</th> : lastSortkey === 'tran_to' && sortOrder.current === 'desc' ? <th onClick={() => sorting("tran_to")}><i class="fa-solid fa-sort-up" />To Account</th> : <th onClick={() => sorting("tran_to")}>To Account</th>}


                        {lastSortkey === 'tran_amount' && sortOrder.current === 'asc' ? <th onClick={() => sorting("tran_amount")}><i class="fa-solid fa-sort-down" />Amount</th> : lastSortkey === 'tran_amount' && sortOrder.current === 'desc' ? <th onClick={() => sorting("tran_amount")}><i class="fa-solid fa-sort-up" />Amount</th> : <th onClick={() => sorting("tran_amount")}>Amount</th>}

                        <th>Receipt</th>

                        {lastSortkey === 'tran_note' && sortOrder.current === 'asc' ? <th onClick={() => sorting("tran_note")}><i class="fa-solid fa-sort-down" />Notes</th> : lastSortkey === 'tran_note' && sortOrder.current === 'desc' ? <th onClick={() => sorting("tran_note")}><i class="fa-solid fa-sort-up" />Notes</th> : <th onClick={() => sorting("tran_note")}>Notes</th>}

                        <th>View Transaction</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => {
                        return (
                            <tr key={index}>

                                <td>{item.tran_date}</td>
                                <td>{item.tran_month}</td>
                                <td>{item.tran_type}</td>
                                <td>{item.tran_from}</td>
                                <td>{item.tran_to}</td>
                                <td>{Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    minimumFractionDigits: 0,
                                }).format(item.tran_amount)}</td>
                                <td><img src={item.tran_receipt} width="100px" alt='Content' /></td>
                                <td>{item.tran_note}</td>
                                <td>
                                    <Link to={`/user/${index}`}>
                                        <i className="fa-sharp fa-solid fa-eye icon_ml"></i>
                                    </Link>
                                </td>

                            </tr>
                        )

                    })}
                </tbody>
            </table>

        </div>
    )
}
