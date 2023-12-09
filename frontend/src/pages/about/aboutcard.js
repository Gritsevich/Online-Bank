import React, {useState, useEffect} from "react";
import { Container, Row, Button, Card } from "react-bootstrap";
import Image from "react-bootstrap/Image"
import { cardBlock, cardUnblock, fetchOneCard } from "../../http/cardAPI";
import {useNavigate, useParams } from "react-router-dom";
import { fetchOneAccount } from "../../http/accountAPI";
import { CARDS_ROUTE } from "../../utils/consts";
import Unblock from "../../modals/Unblock";

const AboutCard = () => {

  const [card, setCard] = useState({})
  const [account, setAccount] = useState({})
  const {id} = useParams()
  const navigate = useNavigate()
  const [unblockVisible, setUnblockVisible] = useState(false)

  useEffect(() => {
    fetchOneCard(id).then(data => setCard(data))
  }, [])

  useEffect(() => {
    if(card.accountId)
      fetchOneAccount(card.accountId).then(data => setAccount(data))
  }, [card.accountId])

  const blocking = async () =>{
    try {
      let data;
      data = await cardBlock(card)
      navigate(CARDS_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 500}} className="p-5">
        <Image width={170} height={170} className="mt-3 m-auto" src="https://img.freepik.com/premium-vector/bank-card-cashless-payments-vector-illustration-isolated-on-white-background_528104-536.jpg?size=626&ext=jpg&ga=GA1.1.1483180068.1698148974&semt=ais"/>
        <Row className="mt-3">
          Связана со счётом "{account.name}" {account.amount} {account.currency}
        </Row> 
        <Row className="mt-3">
          Номер карты: {card.number}
        </Row>
        <Row className="mt-3">
          Имя: {card.name}
        </Row>
        <Row className="mt-3">
          Дата: {card.month}/{card.year}
        </Row>
        <Row className="mt-3">
          CVV: {card.CVV}
        </Row>
        <Row className="mt-3"> Статус карты: {card.block ? card.block.type : " "}</Row>
        {
          card.block ?  
          <Row>
            { 
              card.block.type === "unblock" ?
                <Button  
                  variant={"outline-danger"}
                  className="mt-3"
                  onClick={blocking}
                >
                  Заблокировать карту
                </Button>
              :
              <Row className="mt-3">
                { 
                  card.block.type === "block by user" ?
                  <Button  
                    variant={"outline-success"}
                    className="mt-3"
                    onClick={() => {setUnblockVisible(true)}}
                  >
                    Разблокировать карту 
                  </Button>
                :
                  <h5 style={{color:'red'}}>К сожалению ваша карта была заблокирована. Для её восстановления следует обратиться в ближайшее отделение банка.</h5>
                }
              </Row>
            }
          </Row>
        :
          <Row></Row>
        }
      </Card>
    <Unblock show={unblockVisible} onHide={() => setUnblockVisible(false)} card={card}/>
  </Container>
  )
}

export default AboutCard;



