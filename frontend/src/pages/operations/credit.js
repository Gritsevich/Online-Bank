import React, {useEffect, useState} from "react";
import { Container, Card, Row, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image"
import { fetchOneAccount, fetchOneCredit } from "../../http/accountAPI";
import {useParams } from "react-router-dom";
import ChangeAccountName from "../../modals/ChangeAccountName";
import MonthPayment from "../../modals/MonthPayment";

const Credit = () => {

    const [changeAccountNameVisible, setChangeAccountNameVisible] = useState(false)
    const [monthPaymentVisible, setMonthPaymentVisible] = useState(false)
    const [account, setAccount] = useState({})
    const [credit, setCredit] = useState({})
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const {id} = useParams()


    useEffect(() => {
      fetchOneAccount(id).then(data => setAccount(data))
      setShouldUpdate(false)
    }, [shouldUpdate])

    useEffect(() => {
      fetchOneCredit(id).then(data => setCredit(data))
      setShouldUpdate(false)
    }, [id])

    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}
      >
      {account.cardId ? 
        <Card style={{width: 500}} className="p-5">
          <Image width={150} height={150} className="mt-3 m-auto" src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614549782_66-p-dengi-na-belom-fone-90.png"/>
          <h5 className="mt-3 m-auto" style={{color:"red"}}>{account.typeAccount} {account.name}</h5>
          <div className="mt-3 m-auto">{account.amount} {account.currency}</div>
          <Row className="mt-3 ">
            Реквизиты счёта: {account.requisites}
          </Row>
          <Row className="mt-3 ">
            Кредит на {credit.term} месяца(ев)
          </Row>
          <Row className="mt-3">
            Ежемесячный платёж {credit.month_amount}
          </Row>
          <Button variant={"outline-success"} className="mt-3" onClick={() => {setChangeAccountNameVisible(true)}}>Изменить название счёта</Button>
          <Button variant={"outline-success"} className="mt-3" onClick={() => {setMonthPaymentVisible(true)}}>Внести платёж</Button>
        </Card>
        :
        <Card style={{width: 500}} className="p-5">
          <Row> Для дальнейшей работы необходимо создать карту.</Row>
        </Card>
        }
        <ChangeAccountName show={changeAccountNameVisible} onHide={() => setChangeAccountNameVisible(false)} account={account} setShouldUpdate={setShouldUpdate}/>
        <MonthPayment show={monthPaymentVisible} onHide={() => setMonthPaymentVisible(false)} account={account} credit={credit}/>
      </Container>
    )
  }

export default Credit;