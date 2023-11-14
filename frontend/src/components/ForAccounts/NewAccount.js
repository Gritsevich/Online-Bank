import React, {useState, useEffect} from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import { createAccount, fetchCurrencies } from "../../http/accountAPI";
import { MAIN_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";


const NewAccount = () => {

  const [name, setName] = useState('')
  const type = 1

  const [chooseCurrency, setChooseCurrency] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    fetchCurrencies().then(data => setChooseCurrency(data))
}, [])

  const check = () => {
    return name === '' || selectedCurrency === undefined
  }

  const click = async () => {
    try {
      let data;
      data = await createAccount({accountName : name, currencyId : selectedCurrency.id, typeAccountId:  type});
      
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div>      <h4 className="m-auto">Создание нового счёта</h4>
        <Form className="d-flex flex-column">
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
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    <Button
                      
                      variant={"outline-success"}
                      className="mt-3"
                      disabled={check()}
                      onClick={click}
                    >
                      Создать
                    </Button>
                </Row>
        </Form>
    </div>
  )
}

export default NewAccount;