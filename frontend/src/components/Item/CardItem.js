import React from "react";
import { Container, Col, Card} from "react-bootstrap";
import { ABOUTCARD_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";

const CardItem = ({card}) => {

  const navigate = useNavigate()

  return (
    <Col md={3} className={"mt-3"} onClick={() => navigate(ABOUTCARD_ROUTE + '/' + card.id)}>
      <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
        <Image width={150} height={150} src={'https://img.freepik.com/premium-vector/bank-card-cashless-payments-vector-illustration-isolated-on-white-background_528104-536.jpg?size=626&ext=jpg&ga=GA1.1.1483180068.1698148974&semt=ais'}/>
        <div>{card.number}</div>
        <div>{card.currency}</div>
      </Card>
    </Col>
  )
}

export default CardItem;