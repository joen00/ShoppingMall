import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { 재고context } from "./App.js";
import { Navbar, Container, NavDropdown, Nav, Button } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

let 박스 = styled.div`
  padding: 20px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

//
//
//
function Detail(props) {
  let history = useHistory();
  let { id } = useParams();
  let 찾는상품 = props.shoes.find(function (상품) {
    return 상품.id == id;
  });
  let [alert변수, alert변경] = useState(true);

  let [누른탭, 누른탭변경] = useState(0);

  let [스위치, 스위치변경] = useState(true);

  // 훅
  useEffect(() => {
    // 2초 후에 제거
    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);
    return () => {
      clearTimeout(타이머);
    };
  }, []);

  return (
    <div className="container">
      <박스>
        <제목 className="red">Detail</제목>
      </박스>

      {alert변수 === true ? <Alertpage /> : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾는상품.title}</h4>
          <p>{찾는상품.content}</p>
          <p>{찾는상품.price}</p>

          <Info 재고={props.재고}></Info>

          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 10, 11]);
              props.dispatch({
                type: "항목추가",
                payload: { id: 2, name: "새로운 상품", quan: 1 },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push("/");
            }}
          >
            홈으로 가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false);
              누른탭변경(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false);
              누른탭변경(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  );
}

// tab을 보여주기
function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
    return <div>내용0</div>;
  } else if (props.누른탭 === 1) {
    return <div>내용1</div>;
  } else if (props.누른탭 === 2) {
    return <div>내용2</div>;
  }
}

function Alertpage(props) {
  return (
    <div className="my-alert">
      <p>재고가 얼마 남지 않았습니다</p>
    </div>
  );
}

function Info(props) {
  return <p>재고 : {props.재고[0]}</p>;
}

function state를props화(state) {
  return {
    state: state.reducer,
    alert열렸니: state.reducer2,
  };
}

export default connect(state를props화)(Detail);
