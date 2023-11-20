import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Row} from "react-bootstrap";
import { updateAccount } from '../http/accountAPI';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from "../utils/consts";


const ChangeAccountName = ({show, onHide, account}) => {

  //account === undefined ? '' : account.name
  const [newName, setNewName] = useState('')
  const navigate = useNavigate()

  const check = () =>
    {
      return newName === ''
    }

  const click = async () =>{
    try {
      let data;
      data = await updateAccount({accountId: account.id, accountName: newName}).then(data => {
        setNewName('')
        onHide()})
      navigate(MAIN_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Введите новое название
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className= "mt-3">Текущее название: {account.name}</Row>
                <Form.Control
                  value={newName}
                  className='mt-3'
                  onChange={e => setNewName(e.target.value)}
                  placeholder={"Название"}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Нет</Button>
                <Button variant="outline-success" disabled={check()} onClick={click}>Да</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeAccountName;
