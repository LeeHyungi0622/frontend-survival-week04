import { useEffect, useState } from "react";
import { Restaurant } from "../types/Restaurants";

export default function useFetchRestaurants() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const fetchRestaurants = async() => {
      const restaurants = await fetch('http://localhost:3000/restaurants');
      const result = await restaurants.json();
      setRestaurants(result.restaurants);
    }

    useEffect(() => {
      fetchRestaurants();
    },[]);

    return {restaurants, fetchRestaurants};
}