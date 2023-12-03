import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";

const MainWebsite = () => {
  return (
  <Container>
    <Row className="mt-3"> 
      <h1>
        Простой и удобный онлайн-банк 
      </h1>
    </Row>
    <Row className="mt-3"> 
      <Col md={7} className="mt-3">
        <h7>
          Самый простой и безопасный доступ к вашим счетам и картам. В любой момент вы можете сделать перевод близкому человеку, проверить, сколько осталось денег, или пополнить счет мобильного. 
        </h7>
        <Row md={7} className="mt-3">
          <b>Переводы</b>
          <div className="mt-3">Осуществляйте переводы на карточки банка по Республике Беларусь.</div>
        </Row>
        <Row md={7} className="mt-3">
          <b>Карты</b>
          <div className="mt-3">Просматривайте актуальные балансы и историю операций, оперативно блокируйте и разблокируйте карты.</div>
        </Row>
        <Row md={7} className="mt-3">
          <b>Кредитование</b>
          <div className="mt-3">Откройте кредит и получите средства на долгожданные покупки по привлекательным процентам.</div>
          <Image width={300} height={400} src="https://static.vecteezy.com/system/resources/previews/000/411/245/original/vector-people-characters-and-online-banking-security-concept-illustration.jpg"/>
        </Row>
      </Col>
      <Col md={5}className="mt-3">
        <Image width={500} height={450} src="https://wnfx.ru/wp-content/uploads/2021/08/5917_.jpg"/>
        <h6 className="mt-3">Станьте клиентом нашего банка и откройте для себя новый мир возможностей для ваших сбережений.</h6>
      </Col>
    </Row>
  </Container>
  )
}

export default MainWebsite;