import React, {useEffect, useState} from "react";
import { Container, Button, Form } from "react-bootstrap";
import { createFTwoA, fetchQRCode } from "../../http/FTwoA";
import { Context } from '../../index';
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import Image from "react-bootstrap/Image"

const FTwoA = observer(() => {

  const [QRCode, setQRCode] = useState({})
  const [key, setKey] = useState('')
  const {user} = useContext(Context)

  useEffect(() => {
    fetchQRCode().then(data => setQRCode(data))
  }, [])

  const check = () => {
    return key === ''
  }

  const click = async () => {
    let data;
    try {
    data = await createFTwoA({code: key})
    user.setIsFTwoA(data.success)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const handleChange = (e) => 
  {
    let value = e.target.value
    if(value === '')
    {
      setKey('')
      return
    }
    value = value.replace(/^0+/,"")
    if(value.match("^[0-9]{1,6}$")!=null) 
    {
      setKey(value);
    }
  }

  return (
    <Container>
      {user.isFTwoA && <h1 className="mt-3" style={{color:'red'}}>Верефикация пройдена</h1>}
      <h4 className="mt-3">Чтобы получить доступ к переводам и работе со счетами требуется пройти двухфакторную аутентификацию. С её помощью будут подтверждаться все финансовые операции.</h4>
      <div className="mt-3">Отсканируйте QR-код в своём аккаунте Google Authenticator и введите секретный ключ.</div>
      <Image className="mt-3" width={200} height={200} src={QRCode}/>
      <Form className="d-flex flex-column">
        <Form.Control
          className="mt-3"
          placeholder="Введите секретный ключ..."
          value={key}
          onChange={handleChange}
        />
      </Form>
      <Button  className="mt-3" variant="outline-success" disabled={check()} onClick={click}>Отправить</Button>

    </Container>
  )
})

export default FTwoA;