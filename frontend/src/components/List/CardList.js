import React from "react";
import { Container, Row } from "react-bootstrap";
import CardItem from '../Item/CardItem'


const CardList = ({cards}) => {


  return (
    <Container>
      <Row className="d-flex">
        {cards.map(card =>
          <CardItem key={card.id} card={card}/>
        )}
      </Row>
    </Container>
  )
}

export default CardList;