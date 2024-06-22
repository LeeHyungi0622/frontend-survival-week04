import { useState } from "react";
import { Food } from "../types/Food";
import OrderList from "./OrderList";

let orderNumber=0;

type orderResponseType = {
    success: boolean,
    message: string,
    order: Food[]
}

export default function OrderListTable({orderList, totalPrice}: {orderList: Food[], totalPrice: number}) {
    const [orderResponse, setOrderResponse] = useState<orderResponseType>();

    const orderBtnClick = async() => {
        if (orderList.length === 0) {
            alert('한 개 이상의 메뉴를 선택해주세요.');
            return;
        }

        const orderFood = await fetch('http://localhost:3000/orders',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderList)
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Server response:', data);
            setOrderResponse(data);
            if (data.success === true) {
                orderNumber += 1;
            }
          })
          .catch(error => {
            console.error('Fetch error:', error);
            setOrderResponse(error);
          });
    }

    return (
        <>
            {orderList.map((order, idx) => (
                <OrderList menu={order} idx={idx} key={`order-${idx}`} />
            ))}
                <tr>
                    <td colSpan={2}>총 주문금액</td>
                    <td colSpan={2}>{totalPrice}원</td>
                </tr>
                <tr>
                    <td colSpan={3} 
                        style={
                            { border: '1px solid black', 
                              borderRadius: '5px', 
                              textAlign: 'center', 
                              padding: '5px 0', 
                              backgroundColor: 'yellow',
                              cursor: 'pointer'}}
                              onClick={orderBtnClick}>
                        주문하기
                    </td>
                </tr>
                <tr>
                    {orderResponse && orderResponse.success === true &&
                    <td colSpan={3}>
                        <>
                            <h1>주문 성공~!</h1>
                            <h3>주문 영수증</h3>
                            <h4>주문번호 : {orderNumber}</h4>
                            <>
                                {orderResponse.order.map((menu: Food, idx) => (
                                    <OrderList menu={menu} idx={idx} key={`receipt-${idx}`}/>
                                ))}
                            </>
                            <div style={{fontSize: '30px'}}>총 결제금액 : {totalPrice}원</div>
                        </>
                    </td>}
                </tr>
        </>
    )
}