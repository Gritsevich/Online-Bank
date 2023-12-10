import React from "react";
import { Container, Col, Card} from "react-bootstrap";
import { ABOUTACCOUNT_ROUTE, CREDIT_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";

const AccountItem = ({account}) => {

  const navigate = useNavigate()

  return (
    <Col>
      <Col>
      { account.typeAccount === "DEBIT" &&
      <Col md={3} className={"mt-3"} onClick={() => navigate(ABOUTACCOUNT_ROUTE + '/' + account.id)}>
        <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
          <Image width={150} height={150} src={'https://catherineasquithgallery.com/uploads/posts/2021-03/1614549782_66-p-dengi-na-belom-fone-90.png'}/>
          <div>{account.name}</div>
          <h3>{account.amount} {account.currency}</h3>
        </Card>
      </Col>
      }</Col>
    <Col>
      { account.typeAccount === "CREDIT" &&
      <Col md={3} className={"mt-3"} onClick={() => navigate(CREDIT_ROUTE + '/' + account.id)}>
        <Card style={{width: 150, cursor: 'pointer', color: 'red'}} border={"light"}>
          <Image width={150} height={150} src={'https://catherineasquithgallery.com/uploads/posts/2021-03/1614549782_66-p-dengi-na-belom-fone-90.png'}/>
          <div >Кредит</div>
          <div>{account.name}</div>
          <h3>{account.amount} {account.currency}</h3>
        </Card>
      </Col>
      }</Col>
    </Col>
  )
}

export default AccountItem;