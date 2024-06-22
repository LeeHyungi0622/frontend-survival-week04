import useFetchRestaurants from '../hooks/useFetchRestaurants';

type filterRestaurantsProps = {
    searchKeyword: string,
    filterKeyword: string
};

function normalize(text: string) {
  return text.trim().toLocaleLowerCase();
}

export default function filterRestaurants(
  { searchKeyword, filterKeyword }: filterRestaurantsProps,
) {
  const { restaurants } = useFetchRestaurants();

  const filteredRestaurantsByCategory = filterKeyword === '전체' || !filterKeyword ? restaurants
    : restaurants.filter((restaurant) => restaurant.category === filterKeyword);

  const query = normalize(searchKeyword);

  if (!query) {
    return filteredRestaurantsByCategory;
  }

  return filteredRestaurantsByCategory.filter((restaurant) => restaurant.name.includes(query));
}
