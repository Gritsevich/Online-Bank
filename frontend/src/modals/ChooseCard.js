import React, {useState, useEffect} from 'react';
import Modal from "react-bootstrap/Modal";
import {Container, Dropdown} from "react-bootstrap";
import { createAccount, fetchAccountsWithoutCard } from '../http/accountAPI';
import { createCard } from '../http/cardAPI';
import { Button, Form } from "react-bootstrap";
import { isEmpty } from '../utils/functions';
import { fetchCurrencies, fetchTypes } from '../http/accountAPI';

const ChooseCard = ({show, onHide, setShouldUpdate}) => {

    const [chooseAccount, setChooseAccount] = useState([])
    const [selectedAccount, setSelectedAccount] = useState({})

    const [name, setName] = useState('')

    const [chooseCurrency, setChooseCurrency] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState({})
    const [chooseType, setChooseType] = useState([])
    const [selectedType, setSelectedType] = useState({})

    useEffect(() => {
        fetchCurrencies().then(data => setChooseCurrency(data))
    }, [])

    useEffect(() => {
        fetchTypes().then(data => setChooseType(data))
    }, [])

    useEffect(() => {
    fetchAccountsWithoutCard().then(data => 
        {
            data.push({id: -1, name: 'Новый счёт'})
            setChooseAccount(data)
            setSelectedAccount({})
        })
    }, [show])

  const click = async () => {
    try {
      let data;
      if(selectedAccount.id === -1)
      {
        if(!check())
            return
        data = await createAccount({accountName : name, currencyId : selectedCurrency.id, typeAccountId:  selectedType.id});
        data = await createCard({accountId: data.accountId})
      }
      else 
      {
        data = await createCard({accountId: selectedAccount.id});
      }
        setShouldUpdate(true)
        onHide()
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const check = () => {
    return name !== '' && !isEmpty(selectedCurrency) && !isEmpty(selectedType)
    }

  const checkIn = () => {
    return (isEmpty(selectedAccount) || selectedAccount.id === -1) && !check()
  }

  const prov = () => {
    return selectedAccount.id === -1
  }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Вы можете выбрать существующий счёт или создать новый
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{selectedAccount.name || "Выберите счёт"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {chooseAccount.map(account =>
                            <Dropdown.Item
                                onClick={() => setSelectedAccount(account)}
                                key={account.id}
                            >
                                {account.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            
            {prov() && <Container>
            <Dropdown className="mt-3 mb-2">
            <Dropdown.Toggle>{selectedType.value || "Выберите тип счёта"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {chooseType.map(type =>
                    <Dropdown.Item
                        onClick={() => setSelectedType(type)}
                        key={type.id}
                    >
                        {type.value}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
            </Dropdown>
            <Form className="d-flex flex-column">
              {selectedType.id === 1 && 
              <div>
                  <Form.Control
                      className="mt-3"
                      placeholder="Введите название счёта..."
                      value={name}
                      onChange={e => setName(e.target.value)}
                  />
                  <Dropdown className="mt-2 mb-2">
                          <Dropdown.Toggle>{selectedCurrency.value || "Выберите тип валюты"}</Dropdown.Toggle>
                          <Dropdown.Menu>
                              {chooseCurrency.map(currency =>
                                  <Dropdown.Item
                                      onClick={() => setSelectedCurrency(currency)}
                                      key={currency.id}
                                  >
                                      {currency.value}
                                  </Dropdown.Item>
                              )}
                          </Dropdown.Menu>
                      </Dropdown>
                </div> }
                {selectedType.id === 2 && 
                <div>
                    К сожелению кредит открывается со счёта, после вы можете создать к нему карту.
                </div>}
            </Form>
            </Container> }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Отмена</Button>
                <Button variant="outline-success" disabled={checkIn()} onClick={click}>Создать</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChooseCard;
