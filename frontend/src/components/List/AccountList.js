import React from "react";
import { Container, Row } from "react-bootstrap";
import AccountItem from '../Item/AccountItem'


const AccountList = ({accounts}) => {


  return (
    <Container>
      <Row className="d-flex">
        {accounts.map(account =>
          <AccountItem key={account.id} account={account}/>
        )}
      </Row>
    </Container>
  )
}

export default AccountList;