import React, {useState, useEffect} from "react";
import { fetchCards } from "../../http/cardAPI";
import { Container, Row, Col, Card } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import CardList from "../../components/List/CardList";
import ChooseCard from "../../modals/ChooseCard";
import { observer } from "mobx-react-lite";


const Cards =  observer(() => {

  const [chooseCardVisible, setChooseCardVisible] = useState(false)
  const [cards, setCards] = useState([])
  const [shouldUpdate, setShouldUpdate] = useState(false)

  useEffect(() => {
    fetchCards().then(data => setCards(data))
    setShouldUpdate(false)
}, [shouldUpdate])

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3} className={"mt-3"}>
          <button  onClick={() => {
            setChooseCardVisible(true)
            }} className="unstyled-button">
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"} >
              <Image width={140} height={100} src="https://media.istockphoto.com/id/1125042910/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B1%D0%B5%D0%BB%D0%B0%D1%8F-%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B0%D1%80%D1%82%D0%B0-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B0-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5.jpg?s=612x612&w=0&k=20&c=FNgolk9VK_ErR1_so7Plzd3QFgDKd-ZxlYv-OGwgrh8="/>
              <div><b>Новая карта</b></div>
            </Card>
          </button>
        </Col>
        <Col md={9}>
          <CardList cards={cards}/> 
        </Col>
      </Row>
    <ChooseCard show={chooseCardVisible} onHide={() => setChooseCardVisible(false)} setShouldUpdate={setShouldUpdate}/>
  </Container>
  )
})

export default Cards;