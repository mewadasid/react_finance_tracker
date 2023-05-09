import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/style.css";


import Transactionform from "../../transactionForm/components/useform";
export default function Edituser() {
    const { id } = useParams();


    const transDetail = JSON.parse(localStorage.getItem("Transaction"));
    const index = Object.values(transDetail).map((item) => item.tran_id).findIndex((did) => did == id)

    return (
        <div>

            {Object.values(transDetail)
                .filter((data) => data.tran_id == id)
                .map((item) => {
                    console.log(index);
                    return <Transactionform formValues={item} userIndex={index} userId={id} />
                })
            }
        </div>
    )
}
