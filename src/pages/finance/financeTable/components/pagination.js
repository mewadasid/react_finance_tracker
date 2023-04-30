import { React, useState } from "react";
import "../css/style.css";
export default function Pagination({
  newData,
  pageChange,
  number,
  previous,
  cuurentPage,
  next,
  noPage,
}) {
  const numbers = [];
  return (
    <div className="paginationNumber">
      <span onClick={() => previous()}>Prev</span>
      {number.slice(cuurentPage - 1, noPage).map((pageNo) => {
        numbers.push(pageNo);
        return (
          <>
            <span
              className={`${cuurentPage == pageNo ? "active" : ""}`}
              onClick={() => pageChange(pageNo)}
            >
              {pageNo}
            </span>
          </>
        );
      })}

      <span
        className={`${noPage == 1 ? "disable" : ""}`}
        onClick={() => next()}
      >
        Next
      </span>
    </div>
  );
}
