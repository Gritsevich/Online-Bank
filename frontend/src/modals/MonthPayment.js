import React, { useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Col, Form, Row } from "react-bootstrap";
import { createPayment } from '../http/paymentAPI';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../utils/consts';
import { createMonthPayment } from '../http/accountAPI';

const MonthPayment = ({ show, onHide, account, credit }) => {

  const navigate = useNavigate()

  const click = async () => {
    try {
      let data; 
      data = await createMonthPayment({ creditAmount: credit.amount, month_amount: credit.month_amount, accountId: account.id });

      navigate(MAIN_ROUTE)
      onHide()
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
          Подтверждение
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
       Подтверждаете ежемесячный платёж?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Нет</Button>
        <Button variant="outline-success" onClick={click}>Да</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MonthPayment;
