import { useState } from 'react';
import Filter from './components/Filter';
import RestaurantsTable from './components/RestaurantsTable';
import filterRestaurants from './utils/filterRestaurants';

export default function App() {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  const restaurants = filterRestaurants({ searchKeyword, filterKeyword });

  return (
    <div>
      <h1>푸드코트 키오스크</h1>
      <Filter
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        setFilterKeyword={setFilterKeyword}
      />
      {searchKeyword}
      {filterKeyword}
      <table>
        <thead>
          <tr>
            <th>종류</th>
            <th>식당 이름</th>
            <th>메뉴</th>
          </tr>
        </thead>
        <tbody>
          <RestaurantsTable restaurants={restaurants} />
        </tbody>
      </table>
    </div>
  );
}
