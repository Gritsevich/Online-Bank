import React, { useContext } from "react";
import { Context } from "../../index";
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { NavLink } from "react-router-dom";
import { AUTH_ROUTE,  CARDS_ROUTE, FTWOA_ROUTE, HISTORY_ROUTE,  MAIN_ROUTE,  PAYMENT_ROUTE,} from "../../utils/consts";
import {Button, Col, Row} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
    localStorage.setItem('token', '')
    navigate(MAIN_ROUTE)
  } 

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav>
          { !user.isAuth || user.isFTwoA ?
          <NavLink style={{color:'white'}} to = {MAIN_ROUTE}>Банкинг</NavLink>
          :
          <Row>
            <Col><NavLink style={{color:'white'}} to = {MAIN_ROUTE}>Банкинг</NavLink></Col>
            <Col style={{color:'red'}}>Не пройдена верефикация</Col>
          </Row>
          }
        </Nav>
        {user.isAuth ?
          <Nav className="ml-auto">
            <Button className="mx-3" variant={"outline-light"} onClick={() => navigate(HISTORY_ROUTE)} >История</Button>
            <Button className="mx-3" variant={"outline-light"} onClick={() => navigate(CARDS_ROUTE)} >Карты</Button>
            <Button className="mx-3" variant={"outline-light"} onClick={() => navigate(PAYMENT_ROUTE)} >Перевод</Button>
            <Button className="mx-3" variant={"outline-light"} onClick={() => navigate(FTWOA_ROUTE)} >Настройки</Button>
            <Button variant={"outline-light"} onClick={() => logOut()} className="mx-4">Выйти</Button>
          </Nav>
          :
          <Nav className="ml-auto">
            <Button variant={"outline-light"} onClick={() => navigate(AUTH_ROUTE)}>Авторизация</Button>
          </Nav>
        }
      </Container>
    </Navbar>
  );
});

export default NavBar;