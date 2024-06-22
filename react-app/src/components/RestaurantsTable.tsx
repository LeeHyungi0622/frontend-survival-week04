import { useState } from "react";
import { Restaurant } from "../types/Restaurants";
import { Food } from "../types/Food";
import OrderListTable from "./OrderListTable";

export default function RestaurantsTable({restaurants} : {restaurants: Restaurant[]}) {

    const [orderList, setOrderList] = useState<Food[]>([]);

    const totalPriceReducer = (acc: number, order: Food) => acc + order.price;
    const totalPrice = orderList.reduce(totalPriceReducer, 0);

    const selectMenu = (menu: Food) => {
        console.log('check menu : ', menu);
        setOrderList([...orderList, menu]);
        console.log('order check : ', orderList);
    };

    return (
        <>
            {restaurants && restaurants.map((restaurant) => (
                <tr key={restaurant.name}>
                    <td>{restaurant.category}</td>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.menu.map(menu => (
                        <div key={`${menu.id}-${menu.name}-${menu.price}`}>
                            <div>
                                {menu.name} / {menu.price}
                                <button onClick={() => selectMenu(menu)}>선택</button>
                            </div>
                        </div>
                    ))}
                    </td>
                </tr>
            ))}
           <tr>
                <td colSpan={3} style={{ borderBottom: '3px solid black'}}></td>
           </tr>
            <OrderListTable orderList={orderList} totalPrice={totalPrice}/>
        </>
    )
}