import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Form, Row} from "react-bootstrap";
import { createPayment } from '../http/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';

const ConfirmationPayment = ({show, onHide, selectedOtpr, amount, selectedPol}) => {

  const [key, setKey] = useState('')
  const navigate = useNavigate()

  const check = () =>
    {
      return key === ''
    }

  const click = async () =>{
    try {
      let data;
      data = await createPayment({requisitesFrom: selectedOtpr.requisites, requisitesTo: selectedPol.requisites, amount: amount, code: key});
      
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
                  Подтверждаете перевод?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row className='mt-3'>Отправитель: {selectedOtpr.name}</Row>
                <Row className='mt-3'>Получатель: {selectedPol.name}</Row>
                <Row className='mt-3'>Сумма: {amount}</Row>
                <Form.Control
                  value={key}
                  className='mt-3'
                  onChange={e => setKey(e.target.value)}
                  placeholder={"Введите подтверждающий ключ"}
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

export default ConfirmationPayment;
