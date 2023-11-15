import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Form, Row} from "react-bootstrap";
import { createPayment } from '../http/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';

const DeleteAccount = ({show, onHide, }) => {

  const [name, setName] = useState('')

  const check = () =>
    {
      return name === ''
    }

  const click = async () =>{
    try {
      let data;
     // data = await createPayment({requisitesFrom: selectedOtpr.requisites, requisitesTo: selectedPol.requisites, amount: amount, code: key});
      
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
                  value={name}
                  className='mt-3'
                  onChange={e => setName(e.target.value)}
                  placeholder={"Новое имя"}
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

export default DeleteAccount;
