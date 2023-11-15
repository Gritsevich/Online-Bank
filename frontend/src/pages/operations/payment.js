import React, {useState, useEffect} from "react";
import {Container, Form, Row, Card, Button, Col, Dropdown} from "react-bootstrap";
import ConfirmationPayment from "../../modals/ConfirmationPayment";
import { fetchUserAccounts } from "../../http/paymentAPI";
import { fetchCurrencies } from "../../http/accountAPI";
import { isEmpty } from "../../utils/functions";

const Payment = () => {

  const [amount, setAmount] = useState(0)
  const [confirmationPaymentVisible, setConfirmationPaymentVisible] = useState(false)
  const [chooseOtpr, setChooseOtpr] = useState([])
  const [selectedOtpr, setSelectedOtpr] = useState({})
  const [choosePol, setChoosePol] = useState([])
  const [selectedPol, setSelectedPol] = useState({})

  useEffect(() => {
    fetchUserAccounts().then(data => setChooseOtpr(data))
    fetchUserAccounts().then(data => setChoosePol(data))
  }, [])
  
  const check = () => {
    return isEmpty(selectedOtpr) || isEmpty(selectedPol) || amount === 0 || amount === '' || selectedOtpr.id === selectedPol.id
  }

  const handleChange = (e) => {
    let value = e.target.value
    if(value === ''){
      setAmount(0)
      return
    }
    value = value.replace(/^0+/,"")
    if(value.match("^(([1-9][0-9]*)|(0))(($)|([.,][0-9]{0,2}$))")!=null) {
      setAmount(value);
    }
  }

  return (
    <Container
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}
    >
        <Card style={{width: 600}} className="p-5">
          <h2 className="m-auto">Перевод</h2>
            <Form className="d-flex flex-column">
              <Dropdown>
                <Dropdown.Toggle className="mt-3">{selectedOtpr.name || "Выберите счёт отправителя"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {chooseOtpr.map(otpr =>
                      <Dropdown.Item
                      onClick={() => setSelectedOtpr(otpr)}
                      key={otpr.id}
                      >
                      {otpr.name}
                      </Dropdown.Item>
                       )}
                  </Dropdown.Menu>
              </Dropdown> 
              <Dropdown>
                <Dropdown.Toggle className="mt-3">{selectedPol.name || "Выберите счёт получателя"}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {choosePol.map(pol =>
                      <Dropdown.Item
                      onClick={() => setSelectedPol(pol)}
                      key={pol.id}
                      >
                      {pol.name}
                  </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
              </Dropdown>

              { selectedOtpr.id === selectedPol.id ? 
              <Row className="mt-3">
                Счета не должны совпадать
              </Row>
              :
              <Row></Row>
              }

              <Form.Control
                className="mt-3"
                placeholder="Введите сумму..."
                value={amount}
                onChange={handleChange}/>

               {selectedOtpr.amount !== undefined ?
               
               <Row>
                { selectedOtpr.amount === 0 || selectedOtpr.amount < amount ? 
                <Row className="mt-3">На счету отправителя недостаточно средств</Row>
                :<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                  <Button
                  variant={"outline-success"}
                  className="mt-3"
                  disabled={check()}
                  onClick={() => {setConfirmationPaymentVisible(true)}}
                >
                
                  Перевести
                </Button>
                </Row>
                }

               </Row> 
               :
               <Row></Row>
               }

            </Form>
        </Card>
      <ConfirmationPayment show={confirmationPaymentVisible} onHide={() => setConfirmationPaymentVisible(false)} selectedOtpr={selectedOtpr} amount={parseFloat(amount)} selectedPol={selectedPol}/>
    </Container>
  )
}

export default Payment;