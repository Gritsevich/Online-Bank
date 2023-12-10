import React, {useState, useEffect} from "react";
import { Container, Card, Form, Row, Col, Button } from "react-bootstrap";
import { createAccount, createCreditAccount, fetchCurrencies, fetchTypes } from "../../http/accountAPI";
import { MAIN_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { isEmpty } from "../../utils/functions";


const Account = (number) => {

  const [name, setName] = useState('')
  const [creditName, setCreditName] = useState('')
  const [creditAmount, setCreditAmount] = useState(0)
  const [term, setTerm] = useState(0)

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

  const checkCredit = () => {
    return creditName === '' || isEmpty(selectedCurrency) || isEmpty(selectedType) || creditAmount === 0 || term === 0 
  }

  const handleChangeForAmount = (e) => 
  {
    let value = e.target.value
    if(value === '')
    {
      setCreditAmount(0)
      return
    }
    value = value.replace(/^0+/,"")
    if(value.match("^[0-9]{1,5}$")!=null) 
    {
      setCreditAmount(value);
    }
  }

  const handleChangeForMonth = (e) => 
  {
    let value = e.target.value
    if(value === '')
    {
      setTerm(0)
      return
    }
    value = value.replace(/^0+/,"")
    if(value.match("^[0-9]{1,3}$")!=null) 
    {
      setTerm(value);
    }
  }

  const debit = async () => {
    try {
      let data;
      data = await createAccount({accountName : name, currencyId : selectedCurrency.id, typeAccountId:  selectedType.id});
      
      navigate(MAIN_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const credit = async () => {
    try {
      let data;
      data = await createCreditAccount({accountName : creditName, currencyId : selectedCurrency.id, typeAccountId:  selectedType.id, creditAmount : creditAmount, term : term});
      
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
                  {selectedType.id === 2 && <div>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите название кредитного счёта..."
                        value={creditName}
                        onChange={e => setCreditName(e.target.value)}
                      />
                      <Row className="mt-3">Введите сумму кредита</Row>
                      <Form.Control
                        className="mt-3"
                        placeholder="Введите сумму кредита..."
                        value={creditAmount}
                        onChange={handleChangeForAmount}
                      />
                      <Row className="mt-3">Введите срок кредита (в месяцах)</Row>
                      <Form.Control
                        className="mt-3"
                        placeholder="Введите срок кредита..."
                        value={term}
                        onChange={handleChangeForMonth}
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
                  </div>
                  }
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                {selectedType.id === 1 && <div>
                    <Button
                      variant={"outline-success"}
                      className="mt-3"
                      disabled={check()}
                      onClick={debit}
                    >
                      Создать дебетовый счёт
                    </Button></div>}
                {selectedType.id === 2 && <div>
                <Button
                  variant={"outline-success"}
                  className="mt-3"
                  disabled={checkCredit()}
                  onClick={credit}
                >
                  Создать кредитный счёт
                </Button></div>}
                </Row>
            </Form>
        </Card>
    </Container>
  )
}

export default Account;