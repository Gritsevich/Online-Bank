import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Row} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { CARDS_ROUTE} from '../utils/consts';
import { cardUnblock } from '../http/cardAPI';

const Unblock = ({show, onHide, card}) => {

  const [key, setKey] = useState('')
  const navigate = useNavigate()

  const check = () =>
    {
      return key === ''
    }

  const unblocking = async () =>{
    try {
      let data;
      data = await cardUnblock([card, {code: key}]) //user?
      navigate(CARDS_ROUTE)
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
              <Form>
                <Row className='mt-3'>Подтверждаете разблокировку?</Row>
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
                <Button variant="outline-success" disabled={check()} onClick={unblocking}>Да</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Unblock;
