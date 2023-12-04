import React from 'react';
import {observer} from "mobx-react-lite";
import {Pagination} from "react-bootstrap";

const Pages = observer(({currentPage, setCurrentPage, pageCount}) => {

    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;
