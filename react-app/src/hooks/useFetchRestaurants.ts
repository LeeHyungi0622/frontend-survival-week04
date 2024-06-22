import { useEffect, useState } from 'react';
import axios from 'axios';
import { Restaurant } from '../types/Restaurants';

export default function useFetchRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchRestaurants = async () => {
    const result = await axios.get('http://localhost:3000/restaurants');
    setRestaurants(result.data.restaurants);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return { restaurants, fetchRestaurants };
}
