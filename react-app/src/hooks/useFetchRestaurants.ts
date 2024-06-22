import { useEffect, useState } from 'react';
import { Restaurant } from '../types/Restaurants';

export default function useFetchRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchRestaurants = async () => {
    const result = await fetch('http://localhost:3000/restaurants');
    const jsonResult = await result.json();
    setRestaurants(jsonResult.restaurants);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return { restaurants, fetchRestaurants };
}
