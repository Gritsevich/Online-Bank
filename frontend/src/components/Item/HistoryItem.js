import React from 'react';
import {Row, Col} from "react-bootstrap";

const HistoryItem = ({history}) => {

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
          <div>{history.createAt}</div>
        </Col>
    </Row>
    );
};

export default HistoryItem;