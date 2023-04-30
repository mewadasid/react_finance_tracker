import React from "react";

export default function Pagination({ pageTable, changepageno }) {
  console.log(pageTable);
  return pageTable.pages.map((item) => {
    return (
      <span className="page_number" onClick={() => changepageno(item)}>
        {item}
      </span>
    );
  });
}
