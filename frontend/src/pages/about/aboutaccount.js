import React, {useEffect, useState} from "react";
import { Container, Card, Row, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image"
import { fetchOneAccount } from "../../http/accountAPI";
import {useParams } from "react-router-dom";
import ChangeAccountName from "../../modals/ChangeAccountName";
import DeleteAccount from "../../modals/DeleteAccount";
import { observer } from "mobx-react-lite";

const AboutAccount = observer(() => {

  const [changeAccountNameVisible, setChangeAccountNameVisible] = useState(false)
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false)
  const [account, setAccount] = useState({})
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    fetchOneAccount(id).then(data => setAccount(data))
    setShouldUpdate(false)
  }, [shouldUpdate])

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 54}}
    >
      <Card style={{width: 500}} className="p-5">
        <Image width={200} height={200} className="mt-3 m-auto" src="https://catherineasquithgallery.com/uploads/posts/2021-03/1614549782_66-p-dengi-na-belom-fone-90.png"/>
        <div className="mt-3 m-auto">{account.amount} {account.currency}</div>
        <h5 className="mt-3 m-auto">{account.name}</h5>
        <Row className="mt-3 m-auto">
          Реквизиты счёта: {account.requisites}
        </Row>
        <Button variant={"outline-success"} className="mt-3" onClick={() => {setChangeAccountNameVisible(true)}}>Изменить название счёта</Button>
      </Card>
      <ChangeAccountName show={changeAccountNameVisible} onHide={() => setChangeAccountNameVisible(false)} account={account} setShouldUpdate={setShouldUpdate}/>
      <DeleteAccount show={deleteAccountVisible} onHide={() => setDeleteAccountVisible(false)} account={account}/>
    </Container>
  )
})

export default AboutAccount;