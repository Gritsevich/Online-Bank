import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AccountList from "../../components/List/AccountList";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";
import { fetchAccounts } from "../../http/accountAPI";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_ROUTE } from "../../utils/consts";

const Homepage = () => {

  const [accounts, setAccounts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchAccounts().then(data => setAccounts(data))
}, [])

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3} className={"mt-3"}>
          <button  onClick={() => navigate(ACCOUNT_ROUTE)} className="unstyled-button">
            <Card style={{width: 100, cursor: 'pointer'}} border={"light"} >
              <Image width={100} height={100} src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614549783_68-p-dengi-na-belom-fone-92.png"/>
              <div><b>Новый счёт</b></div>
            </Card>
          </button>
        </Col>
        <Col md={9}>
          <AccountList accounts={accounts}/> 
        </Col>
      </Row>
  </Container>
  )
}

export default Homepage;