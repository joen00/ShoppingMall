import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addcart } from '../store';

const Detail = (props) => {

    const navigate = useNavigate();

    const state = useSelector((state) => { return state });
    const dispatch = useDispatch()

    let [fade2, setFade2] = useState('')

    useEffect(() => {
        setFade2('end')
        return () => {
            setFade2('')
        }
    }, [])

    const [alert, setalert] = useState(true);
    useEffect(() => {
        let a = setTimeout(() => { setalert(false); }, 2000);
        return () => {
            clearTimeout(a);
        }
    })

    let { id } = useParams();
    const findtitle = props.shoes.find((x) => {
        return x.id == id
    })

    const [탭, 탭변경] = useState(0);

    return (
        <div className="container">
            <div className={'container start ' + fade2}>
                {
                    alert == true ? <div className="alert alert-warning">
                        2초이내 구매시 할인
                    </div> : null
                }
            </div>
            <div className="row">
                <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (findtitle.id + 1) + '.jpg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{findtitle.title}</h4>
                    <p>{findtitle.content}</p>
                    <p>{findtitle.price}원</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addcart(findtitle.title))
                        navigate('/cart')
                    }}>주문하기</button>
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => { 탭변경(0) }}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => { 탭변경(1) }}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => { 탭변경(2) }}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TablContent 탭={탭} shoes={props.shoes} />
        </div>
    )
}

const TablContent = ({ 탭, shoes }) => {
    // if (props.탭 == 0) {
    //     return <div>내용0</div>
    // }
    // else if (props.탭 == 1) {
    //     return <div>내용1</div>
    // }
    // else if (props.탭 == 2) {
    //     return <div>내용2</div>
    // }
    let [fade, setFade] = useState('')

    useEffect(() => {
        let a = setTimeout(() => { setFade('end') }, 10)
        return () => {
            setFade('')
        }
    }, [탭])

    return (
        <div className={'start ' + fade}>
            {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
        </div>
    )

}

export default Detail;