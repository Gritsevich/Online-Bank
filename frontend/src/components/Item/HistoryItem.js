import React from 'react';
import {Row, Col} from "react-bootstrap";

const HistoryItem = ({history}) => {
  const date = new Date(history.createdAt);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const formattedDate = `${hours}:${minutes} ${month}.${day}.${year}`;

    return (
      <Row className="mt-2">
        <Col sm={3} style={{textAlign: "center"}}>
          <div>{history.senderName}</div>
        </Col>
        <Col sm={3} style={{textAlign: "center"}}>
          <div>{history.receiverName}</div>
        </Col>
        <Col sm={3} style={{textAlign: "center"}}>
          <div>{history.amount}</div>
        </Col>
        <Col sm={3} style={{textAlign: "center"}}>
          <div>{formattedDate}</div>
        </Col>
    </Row>
    );
};

export default HistoryItem;