import React, {useState, useEffect} from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image"
import { fetchOneCard } from "../../http/cardAPI";
import {useParams } from "react-router-dom";

const AboutCard = () => {

  const [card, setCard] = useState({})
  const {id} = useParams()

  useEffect(() => {
    fetchOneCard(id).then(data => setCard(data))
  }, [])

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 500}} className="p-5">
        <Image width={200} height={200} className="mt-3 m-auto" src="https://img.freepik.com/premium-vector/bank-card-cashless-payments-vector-illustration-isolated-on-white-background_528104-536.jpg?size=626&ext=jpg&ga=GA1.1.1483180068.1698148974&semt=ais"/>
        <Row className="justify-content-between mt-3 m-auto">   
          <Col><Button  
            variant={"outline-success"}
            className="mt-3"
          >
            Пополнить
          </Button></Col>
          <Col><Button  
            variant={"outline-success"}
            className="mt-3"
          >
            Перевести
          </Button></Col>
          <Col><Button  
            variant={"outline-success"}
            className="mt-3"
          >
            История
          </Button></Col>
        </Row>
        <Row className="mt-3">
          Номер карты: {card.number}
        </Row>
        <Row className="mt-3">
          Дата: {card.month}/{card.year}
        </Row>
        <Row className="mt-3">
          CVV: {card.CVV}
        </Row>
      </Card>
    </Container>
  )
}

export default AboutCard;