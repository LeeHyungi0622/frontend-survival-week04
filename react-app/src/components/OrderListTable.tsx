import { useState } from 'react';
import axios from 'axios';
import { Food } from '../types/Food';
import OrderList from './OrderList';

let orderNumber = 0;

type orderResponseType = {
    success: boolean,
    message: string,
    order: Food[]
}

export default function OrderListTable(
  {
    orderList, totalPrice,
  }:
    {
        orderList: Food[], totalPrice: number
    },
) {
  const [orderResponse, setOrderResponse] = useState<orderResponseType>();

  const orderBtnClick = async () => {
    if (orderList.length === 0) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/orders', orderList, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const { data } = response;
      setOrderResponse(data);
      if (data.success === true) {
        orderNumber += 1;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {orderList.map((order, idx) => (
        <OrderList menu={order} idx={idx} key={`order-${Math.random()}`} />
      ))}
      <tr>
        <td colSpan={2}>총 주문금액</td>
        <td colSpan={2}>
          {totalPrice}
          원
        </td>
      </tr>
      <tr>
        <td colSpan={3}>
          <button
            type="button"
            style={
              {
                display: 'flex',
                justifyContent: 'center',
                width: '200px',
                border: '1px solid black',
                borderRadius: '5px',
                textAlign: 'center',
                padding: '5px 0',
                backgroundColor: 'yellow',
                cursor: 'pointer',
              }
            }
            onClick={orderBtnClick}
          >
            주문하기
          </button>
        </td>
      </tr>
      <tr>
        {orderResponse && orderResponse.success === true
                    && (
                      <td colSpan={3}>
                        <h1>주문 성공~!</h1>
                        <h3>주문 영수증</h3>
                        <h4>
                          주문번호 :
                          {orderNumber}
                        </h4>
                        {orderResponse.order.map((menu: Food, idx) => (
                          <OrderList menu={menu} idx={idx} key={`receipt-${Math.random()}`} />
                        ))}
                        <div style={{ fontSize: '30px' }}>
                          총 결제금액 :
                          {totalPrice}
                          원
                        </div>
                      </td>
                    )}
      </tr>
    </>
  );
}
