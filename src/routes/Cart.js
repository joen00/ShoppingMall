import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeuser, increase } from '../store/userSlice';
import { changecount } from '../store';


const Cart = () => {
    const state = useSelector((state) => { return state });
    const dispatch = useDispatch()

    return (
        <div>
            <h6>{state.user.name}의 {state.user.age}장바구니</h6>
            <button onClick={() => {
                dispatch(increase(1))
            }}>나이 변경</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cartdata.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{state.cartdata[index].id}</td>
                                    <td>{state.cartdata[index].name}</td>
                                    <td>{state.cartdata[index].count}</td>
                                    <td><button onClick={() => {
                                        dispatch(changecount(state.cartdata[index].id))
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )

}

export default Cart;