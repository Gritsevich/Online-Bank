import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchHistory } from "../../http/historyAPI";
import HistoryList from "../../components/List/HistoryList";


const History = () => {

  const [histories, setHistories] = useState([])

  useEffect(() => {
    fetchHistory().then(data => {
      setHistories(data)
    })
  }, [])

  return ( 
      <Container>
        <Row className="d-flex">
          <Row className="mt-2">
            <Col sm={3} style={{textAlign: "center"}}>
                Отправитель
            </Col>
            <Col sm={3} style={{textAlign: "center"}}>
                Получатель
            </Col>
            <Col sm={3} style={{textAlign: "center"}}>
              Сумма
            </Col>
            <Col sm={3} style={{textAlign: "center"}}>
              Дата перевода
            </Col>
          </Row>
        </Row>
        <hr style={{
              color: 'black',
              height: 5}}/>
        <HistoryList histories={histories}/>
        <hr style={{
              color: 'black',
              height: 5}}/>
      </Container>
  )
};

export default History;