import React from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import { deleteAccount } from '../http/accountAPI';

const DeleteAccount = ({show, onHide, account}) => {

  const click = async () =>{
    try {
      let data;
      data = await deleteAccount({accountId: account.id,});
      
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
                  Подтверждение удаления
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {account.amount > 0.00 ? <div>На счету есть сумма. Невозможно удалить.</div> :  <div>Желаете удалить?</div>}
            </Modal.Body>
          { account.amount > 0.00 ? 
            <Modal.Footer>
                <Button variant="outline-success" onClick={onHide}>Ок</Button>
            </Modal.Footer>
            :
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Нет</Button>
                <Button variant="outline-success" onClick={click}>Да</Button>
            </Modal.Footer>
            }
        </Modal>
    );
};

export default DeleteAccount;
