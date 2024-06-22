import { Food } from "../types/Food";

export default function OrderListTable({orderList, totalPrice}: {orderList: Food[], totalPrice: number}) {
    return (
        <>
            {orderList.map((order, idx) => (
                <tr>
                    주문메뉴 {idx + 1}
                    <td>{order.name}</td>
                    <td>{order.price}원</td>
                </tr>
            ))}
                <tr>
                    <td colSpan={2}>총 주문금액</td>
                    <td colSpan={2}>{totalPrice}원</td>
                </tr>
        </>
    )
}