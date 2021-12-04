/* eslint-disable */

import logo from "./logo.svg";
import "./App.css";
import React, { useState, useContext } from "react";
import { Navbar, Container, NavDropdown, Nav, Button } from "react-bootstrap";
import Data from "./data";
import Detail from "./Detail";
import axios from "axios";
import Cart from "./cart";

import { Link, Route, Switch } from "react-router-dom";

//
export let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shopping mall</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/detail">
                Detail
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="jumbortron">
            <h1>20% Season Off</h1>
            <p>이것은 쇼핑몰입니다</p>
            <p>원하는 상품을 골라주세요</p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>
          <div className="container">
            <재고context.Provider value={재고}>
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i} key={i} />;
                })}
              </div>
            </재고context.Provider>
            <button
              className="btn btn-primary"
              onClick={() => {
                // 로딩중이라는 UI 듸움
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    // result에 데이터가 담겨온다
                    // 로딩중이라 UI 안보이게 처리

                    console.log(result.data);
                    shoes변경([...shoes, ...result.data]);
                    //shoes [{},{},{}] => ...shoes는 대괄호를 벗긴다.
                    // result[{},{},{}]
                    // 결과물 [{},{},{},{},{},{}]
                  }) // get요청 코드 .then은 성공할때 사용
                  .catch(() => {
                    // 로딩중이라 UI 안보이게 처리
                    console.log("실패했다");
                  }); //실패할때 하용 //경로가 없는 경우로 들어가면 실패로 나옴
              }}
            >
              더보기
            </button>
          </div>
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} 재고={재고} 재고변경={재고변경} />
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>
    </div>
  );
}

function Card(props) {
  let 재고 = useContext(재고context);
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
      <Test i={props.i}></Test>
    </div>
  );
}
function Test(props) {
  let 재고 = useContext(재고context);
  return <p>{재고[props.i]}</p>;
}

export default App;
