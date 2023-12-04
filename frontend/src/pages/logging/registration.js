import React from "react";
import { MultiStep } from "../../components/ForRegistration/MultiStep";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import {questions} from "../../components/ForRegistration/questions"
import {StepForm} from '../../components/ForRegistration/StepForm'
import { AUTH_ROUTE, MAIN_ROUTE } from "../../utils/consts";
import { NavLink, useNavigate } from "react-router-dom";
import { registration } from "../../http/userAPI";
import { Context } from "../../index";

const Registration = () => {

  const [index, setIndex] = useState(1)
  const totalPagesCount = questions?.length || 0;
  const [pagesAnswers, setPagesAnswers] = useState({});
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const onPageAnswerUpdate = (step, answersObj) => {
    if (answersObj) {
      let answersKeys = Object.keys(answersObj);
      for (let i = 1; i < answersKeys.length; i++) {
        if (!(answersObj[answersKeys[0]] in pagesAnswers)) {
          pagesAnswers[answersObj[answersKeys[0]]] = {};
        }
        pagesAnswers[answersObj[answersKeys[0]]][answersKeys[i]] =  answersObj[answersKeys[i]];
      }
    } 
  }

  const prevButton = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1);
    }
  }

  const nextButton = () => {
    if(index===4){
       click()
    }
    if (index < 4) {
      setIndex(prevIndex => prevIndex + 1);
    } 
  }

  const click = async () => {
    try {
      let data = await registration(pagesAnswers[1]['login'], pagesAnswers[1]['password'], pagesAnswers[2]['name'], pagesAnswers[2]['surname'], pagesAnswers[3]['identNumber']);
      
      user.setUser(data.user)
      user.setIsFTwoA(data.f2a)
      user.setIsAuth(true)
      navigate(MAIN_ROUTE)
    } catch (e) {
      alert(e.response ? e.response.data.message : e.message)
    }
  }

  return (
  <Container>
    <Card className="p-5" style={{ marginTop:"10%", marginRight: "20%", marginLeft: "20%"}} >
      <Row className="mt-3">
        <Col className='align-self-center mt-3'>
          <MultiStep step={index} list={questions}/>
        </Col>
      </Row>
      <Row>
        <h2 style={{ marginTop:"3%", display:"flex", alignItems: 'center', justifyContent: 'center' }}>
          Регистрация
        </h2>
      </Row>
      <Row className="mt-3">
        <Card>
          <Card.Body>
            <StepForm step={index} list={questions} onPageUpdate={onPageAnswerUpdate} pagesAnswers={pagesAnswers}/>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between">
            <Button onClick={prevButton} disabled={index === 1}>Назад</Button>
            <Button onClick={nextButton}>{index === totalPagesCount ? 'Регистрация' : 'Далее'}</Button>
          </Card.Footer>
          <div className="mt-3">
            Уже зарегистрированы? <NavLink to={AUTH_ROUTE}>Входите!</NavLink>
          </div>
        </Card>
      </Row>
    </Card>
  </Container>
    
  )
}

export default Registration;