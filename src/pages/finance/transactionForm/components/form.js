import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Selectcombo from "./comboBox";
import "../css/formStyle.css";
export default function Form() {
  const navigate = useNavigate();
  const intialTransaction = {
    tran_id: Math.ceil(Math.random() * 100),
    tran_date: "",
    tran_month: "",
    tran_type: "",
    tran_from: "",
    tran_to: "",
    tran_amount: "",
    tran_receipt: "",
    tran_note: "",
  };

  const [transaction, setTransaction] = useState(intialTransaction);
  const [formerror, setFormError] = useState({});

  const monthOpiton = [
    { value: "JAN 2023", key: "jan" },
    { value: "FEB 2023", key: "feb" },
    { value: "MARCH 2023", key: "march" },
    { value: "APRIL 2023", key: "apr" },
    { value: "MAY 2023", key: "may" },
    { value: "JUNE 2023", key: "june" },
    { value: "JULY 2023", key: "jul" },
    { value: "AUGUST 2023", key: "aug" },
    { value: "SEPTEMBER 2023", key: "sep" },
    { value: "OCTOBER 2023", key: "oct" },
    { value: "NOVEMBER 2023", key: "nov" },
    { value: "DECEMBER 2023", key: "dec" },
  ];
  const transactionType = [
    { value: "", key: "" },
    { value: "Home Expense", key: "Home Expense" },
    { value: "Personal Expense", key: "Personal Expense" },
    { value: "Income", label: "Income" },
  ];
  const fromToAccount = [
    { value: "", key: "" },
    { value: "Personal Account", key: "Personal Account" },
    { value: "Real Living", key: "Real Living" },
    { value: "My Dream Home", key: "My Dream Home" },
    { value: "Full Circle", key: "Full Circle" },
    { value: "Core Realtors", key: "Core Realtors" },
    { value: "Big Block", key: "Big Block" },
  ];

  const handelSubmit = (e) => {
    const error = emptyCheck();

    console.log(error, "EORORORO");

    switch (error) {
      case false:
        setFormError({ ...formerror, field_empty: "Please fill field" });
        alert("Please Select all field");
        e.preventDefault();
        break;
      case undefined:
        setFormError((c) => {
          console.log(c);
          const { field_empty, ...rest } = c;
          return rest;
        });

        if (Object.keys(formerror).length > 0) {
          e.preventDefault();
        } else {
          setLocalstorage();
          navigate("/");
        }
        break;

      default:
        console.log("object");
        break;
    }
  };
  const setLocalstorage = () => {
    let getData = JSON.parse(localStorage.getItem("Transaction"));
    console.log(getData);
    if (getData !== null) {
      getData.push(transaction);
      localStorage.setItem("Transaction", JSON.stringify(getData));
    } else {
      localStorage.setItem("Transaction", JSON.stringify([transaction]));
    }
  };
  const handelChange = (e, index) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });

    switch (name) {
      case "tran_receipt":
        if (e.target.files[0].size > "500000") {
          setFormError({
            ...formerror,
            file_error: "Files size must be less than 1 MB",
          });
        } else {
          setFormError((c) => {
            console.log(c);
            const { file_big, ...rest } = c;
            return rest;
          });

          let fileExtension = e.target.files[0].type;
          fileExtension = fileExtension.substr(
            fileExtension.indexOf("/") + 1,
            fileExtension.length
          );

          console.log(typeof fileExtension);
          if (
            fileExtension.toLowerCase() == "jpeg" ||
            fileExtension.toLowerCase() == "jpg" ||
            fileExtension.toLowerCase() == "png"
          ) {
            setFormError((c) => {
              console.log(c);
              const { file_error, ...rest } = c;
              return rest;
            });
          } else {
            setFormError({
              ...formerror,
              file_error: "File type must be JPG PNG JPEG",
            });
          }

          const reader = new FileReader();
          const file_banner = e.target.files[0];

          reader.addEventListener("load", () => {
            let imgSrc = reader.result;
            setTransaction({ ...transaction, [name]: imgSrc });
          });
          reader.readAsDataURL(file_banner);
        }
        break;

      default:
        console.log("object");
        break;
    }
  };
  console.log(formerror);

  useEffect(
    (e) => {
      console.log(transaction);
      if ((transaction["tran_from"] && transaction["tran_to"]) !== "") {
        if (transaction["tran_from"] === transaction["tran_to"]) {
          setFormError({ ...formerror, account_same: "Both same" });
        } else {
          setFormError((c) => {
            console.log(c);
            const { account_same, ...rest } = c;
            return rest;
          });
        }
      }
      if (transaction["tran_amount"] !== "") {
        if (
          transaction["tran_amount"] === 0 ||
          transaction["tran_amount"] < 0
        ) {
          setFormError({
            ...formerror,
            amount_error: "Amount should be greater than 0",
          });
        } else {
          setFormError((c) => {
            console.log(c);
            const { amount_error, ...rest } = c;
            return rest;
          });
        }
      }

      if (transaction["tran_note"] !== "") {
        if (transaction["tran_note"].length > 250) {
          setFormError({ ...formerror, note_error: "Length is reached!!!" });
        } else {
          setFormError((c) => {
            console.log(c);
            const { note_error, ...rest } = c;
            return rest;
          });
        }
      }
    },
    //eslint-disable-next-line
    [transaction]
  );

  const emptyCheck = () => {
    for (const key in transaction) {
      if (transaction[key] === "") {
        return false;
      }
    }
  };

  return (
    <div>
      <div>
        {formerror.field_empty ? (
          <div className="formWrapper">{formerror.field_empty}</div>
        ) : null}

        <form
          className="userform"
          encType="multipart/form-data"
          onSubmit={handelSubmit}
        >
          <table id="main_table">
            <tbody>
              <tr>
                <td>
                  <label>Transaction Date : </label>
                </td>

                <td>
                  <input
                    type="date"
                    name="tran_date"
                    id="tranDate"
                    onChange={handelChange}
                  />
                  <span className="fieldError"></span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Month Year : </label>
                </td>
                <td>
                  <Selectcombo
                    name="tran_month"
                    id="tranMonth"
                    option={monthOpiton}
                    onchange={handelChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Transaction Type : </label>
                </td>
                <td>
                  <Selectcombo
                    name="tran_type"
                    id="tranType"
                    option={transactionType}
                    onchange={handelChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>From Account : </label>
                </td>
                <td>
                  <Selectcombo
                    name="tran_from"
                    id="tranFrom"
                    option={fromToAccount}
                    onchange={handelChange}
                  />
                  <span className="fieldError">{formerror.account_same}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>To Account : </label>
                </td>
                <td>
                  <Selectcombo
                    name="tran_to"
                    id="tranTo"
                    option={fromToAccount}
                    onchange={handelChange}
                  />
                  <span className="fieldError">{formerror.account_same}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Amount : </label>
                </td>
                <td>
                  <input
                    type="number"
                    name="tran_amount"
                    id="tranAmount"
                    onChange={handelChange}
                  />
                  <span className="fieldError">{formerror.amount_error}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Receipt : </label>
                </td>
                <td>
                  <input
                    type="file"
                    name="tran_receipt"
                    id="tranReceipt"
                    onChange={handelChange}
                  />
                  <img
                    src={transaction.tran_receipt}
                    width="100"
                    alt="content"
                  />
                  <span className="fieldError">{formerror.file_error}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Notes : </label>
                </td>
                <td>
                  <textarea
                    name="tran_note"
                    id="tranNote"
                    rows="3"
                    onChange={handelChange}
                  ></textarea>
                  <span className="fieldError">{formerror.note_error}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <button id="submitBtn">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
