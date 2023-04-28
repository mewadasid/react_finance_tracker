import React from 'react'

export default function Pagination({ pageTable, onclick, handlePage }) {
    console.log(pageTable)
    return (
        pageTable.totalPage.map((item) => {
            return <span className='page_number' onClick={() => handlePage(item)}>{item}</span>
        })

    )

}
