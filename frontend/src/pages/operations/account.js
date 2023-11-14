import React, {useState, useEffect} from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import { createAccount, fetchCurrencies, fetchTypes } from "../../http/accountAPI";
import { MAIN_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { isEmpty } from "../../utils/functions";


const Account = (number) => {

  const [name, setName] = useState('')

  const [chooseCurrency, setChooseCurrency] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState({})
  const [chooseType, setChooseType] = useState([])
  const [selectedType, setSelectedType] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    fetchCurrencies().then(data => setChooseCurrency(data))
  }, [])

  useEffect(() => {
    fetchTypes().then(data => setChooseType(data))
  }, [])

  const check = () => {
    return name === '' || isEmpty(selectedCurrency) || isEmpty(selectedType)
  }

  const click = async () => {
    try {
      let data;
      data = await createAccount({accountName : name, currencyId : selectedCurrency.id, typeAccountId:  selectedType.id});
      
      navigate(MAIN_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}
    >
        <Card style={{width: 600}} className="p-5">
          <h2 className="m-auto">Создание нового счёта</h2>
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
                  </div>}
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
        </Card>
    </Container>
  )
}

export default Account;