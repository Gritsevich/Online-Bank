import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form,} from "react-bootstrap";
import { update } from '../http/accountAPI';

const ChangeAccountName = ({show, onHide, account}) => {

  const [newName, setNewName] = useState(account === undefined ? '' : account.name)

  const check = () =>
    {
      return newName === ''
    }

  const click = async () =>{
    try {
      let data;
      data = await update({id: account.id, accountName: newName}).then(data => {
        setNewName('')
        onHide()})
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
