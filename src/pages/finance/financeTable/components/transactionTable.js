import React from 'react'
import { Link } from 'react-router-dom';
import '../css/table.css'
export default function Transactiontable() {
    const transDetail = JSON.parse(localStorage.getItem("Transaction"));

    return (
        <div>
            <table className="table main_table">
                <thead className="table-dark">
                    <tr>
                        <th>Transaction Date</th>
                        <th>Month Year</th>
                        <th>Transaction Type</th>
                        <th>From Account</th>
                        <th>To Account</th>
                        <th>Amount</th>
                        <th>Receipt</th>
                        <th>Notes</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {transDetail.map((item) => {

                        return (
                            <tr>
                                <td>{item.tran_date}</td>
                                <td>{item.tran_month}</td>
                                <td>{item.tran_type}</td>
                                <td>{item.tran_from}</td>
                                <td>{item.tran_to}</td>
                                <td>{item.tran_amount}</td>
                                <td><img src={item.tran_receipt} width="100px" alt='Content' /></td>
                                <td>{item.tran_note}</td>
                                <td> <Link to={""}>
                                    <i class="fa-sharp fa-solid fa-eye icon_ml"></i>
                                </Link></td>

                            </tr>
                        )

                    })}
                </tbody>
            </table>
        </div>
    )
}
