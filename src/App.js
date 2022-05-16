/* eslint-disable */

import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import bg from './img/bg.png';
import { createContext, useState } from "react";
import data from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import styled from 'styled-components';
import axios from 'axios';
import Cart from './routes/Cart';


function App() {
    const [shoes, setshoes] = useState(data);
    const [checkbutton, setcheckbutton] = useState(2);
    const navigate = useNavigate();

    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">ShowShop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
                        <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
                        <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
                        <Nav.Link onClick={() => { navigate(-1) }}>Back</Nav.Link>
                        <Nav.Link onClick={() => { navigate('/about') }}>About</Nav.Link>
                        <Nav.Link onClick={() => { navigate('/event') }}>Event</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={
                    <>
                        <div className="main-bg" style={{ backgroundImage: 'url(' + bg + ')' }}></div>
                        <div className="container">
                            <div className="row">
                                {
                                    shoes.map((value, index) => {
                                        return (<Card key={index} shoes={shoes[index]} index={index} />)
                                    })
                                }
                            </div>
                        </div>
                        <button onClick={() => {
                            axios.get('https://codingapple1.github.io/shop/data' + checkbutton + '.json')
                                .then((result) => {
                                    const copy = [...shoes, ...result.data];
                                    setshoes(copy);
                                    setcheckbutton(checkbutton + 1);
                                })
                                .catch(() => {
                                    console.log(실패);
                                })
                        }}>버튼</button>
                    </>
                } />
                <Route path="/detail/:id" element={
                    <Detail shoes={shoes} />
                } />
                <Route path="/cart" element={<Cart></Cart>}></Route>
                <Route path="/about" element={<About />}>
                    <Route path="member" element={<div>멤버임</div>} />
                    <Route path="location" element={<div>위치정보이다</div>} />
                </Route>
                <Route path="/event" element={<Event />}>
                    <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
                    <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
                </Route>
                <Route path="*" element={<div>없는 페이지입니다.</div>} />
            </Routes>
        </div >
    );
}

const About = (props) => {
    return (
        <div>
            <h4>회사정보이다.</h4>
            <Outlet></Outlet>
        </div>
    )
}
const Event = (props) => {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
        </div>
    )
}

const Card = (props) => {
    const navigate = useNavigate();
    return (
        <div className="col-md-4" key={props.index}>
            <img src={'https://codingapple1.github.io/shop/shoes' + (props.index + 1) + '.jpg'} width="80%" />
            <h4><span onClick={() => { navigate('/detail/' + props.index) }}>{props.shoes.title}</span></h4>
            <p>{props.shoes.content}</p>
            <p>{props.shoes.price}</p>
        </div>
    )

}

export default App;
