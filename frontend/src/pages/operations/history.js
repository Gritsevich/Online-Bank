import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pages from "../../components/pagination/Pages.Js";
import { MAX_LIMIT } from "../../utils/consts";
import { fetchHistory } from "../../http/historyAPI";
import HistoryList from "../../components/List/HistoryList";


const History = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [histories, setHistories] = useState([])

  useEffect(() => {
    fetchHistory(currentPage, MAX_LIMIT).then(data => {
      setHistories(data.rows)
      setTotalCount(data.count)
    })
  }, [currentPage])

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
        <Pages currentPage = {currentPage} setCurrentPage = {setCurrentPage} pageCount = {Math.ceil(totalCount / MAX_LIMIT)}/>
      </Container>
  )
};

export default History;