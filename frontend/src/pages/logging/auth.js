import React, {useState, useContext} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useNavigate} from "react-router-dom";
import {AUTH_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import { login } from '../../http/userAPI';
import { Context } from '../../index';


const Auth = () => {
  const navigate = useNavigate()
  const {user} = useContext(Context)
  const [identify, setIdentify] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data;
      data = await login(identify, password);
      
      user.setUser(data.user)
      user.setIsFTwoA(data.f2a)
      user.setIsAuth(true)
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
          <h2 className="m-auto">Авторизация</h2>
            <Form className="d-flex flex-column">
                <Form.Control
                    className="mt-3"
                    placeholder="Введите ваш идентификационный номер или логин..."
                    value={identify}
                    onChange={e => setIdentify(e.target.value)}
                />
                <Form.Control
                    className="mt-3"
                    placeholder="Введите ваш пароль..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                  <div>
                      Ещё не пользуетесь нашим банком? <NavLink to={REGISTRATION_ROUTE}>Присоединяйся!</NavLink>
                  </div>
                    <Button
                      
                      variant={"outline-success"}
                      className="mt-3"
                      onClick={click}
                    >
                      Войти
                    </Button>
                </Row>

            </Form>
        </Card>
    </Container>
  );
}

export default Auth;
