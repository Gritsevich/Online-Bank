import React from "react";
import { MultiStep } from "../../components/MultiStep";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState } from "react";
import "./registration.css"

const Registration = () => {

  const [index, setIndex] = useState(2)

  const prevButton = () => {
    if (index > 1) {
      setIndex(prevIndex => prevIndex - 1);
    }
  }

  const nextButton = () => {
    if (index <= 3) {
      setIndex(prevIndex => prevIndex + 1);
    } 
  }

  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col className='align-self-center'>
          Registration
          <MultiStep step={index}/>
        </Col>
      </Row>
      <Row>
        <Card>
          <Card.Footer className="d-flex justify-content-between">
            <Button onClick={prevButton} disabled={index === 1}>Назад</Button>
            <Button onClick={nextButton}>Далее</Button>
          </Card.Footer>
        </Card>
      </Row>
    </Container>
    
  )
}

export default Registration;