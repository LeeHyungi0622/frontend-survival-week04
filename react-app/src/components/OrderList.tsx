import { Food } from '../types/Food';

export default function OrderList({ menu, idx }: {menu: Food, idx: number}) {
  return (
    <>
      <tr>
        <td>
          주문메뉴
          {' '}
          {idx + 1}
        </td>
      </tr>
      <tr>
        <td>{menu.name}</td>
        <td>
          {menu.price}
          원
        </td>
      </tr>
    </>
  );
}
