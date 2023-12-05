import React from 'react';
import {Row} from "react-bootstrap";
import HistoryItem from '../Item/HistoryItem';

const HistoryList =({histories}) => {

    return (
        <Row className="d-flex">
            {histories.map(history =>
                <HistoryItem key={history.id} 
                  history={history} />
            )}
        </Row>
    );
};

export default HistoryList;