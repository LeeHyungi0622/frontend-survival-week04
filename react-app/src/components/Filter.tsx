import { useRef } from "react";

type filterValue = {
    searchKeyword: string,
    setSearchKeyword: (searchKeyword: string) => void,
    filterKeyword: string,
    setFilterKeyword: (filterKeyword: string) => void
}

export default function Filter({ searchKeyword, setSearchKeyword, filterKeyword, setFilterKeyword } : filterValue) {
    
    const searchId = useRef(`input-${Math.random()}`);
  
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchKeyword(value);
      }
    
      const filterButtonClick = (sort: string) => {
        setFilterKeyword(sort);
      };

    return (
        <>
            <div>
                <label htmlFor={searchId.current}></label>
                <input type="text" id={searchId.current} placeholder="검색 식당명" value={searchKeyword} onChange={onChangeInput}/>
            </div>
            <div>
                <button onClick={() => filterButtonClick('전체')}>전체</button>
                <button onClick={() => filterButtonClick('한식')}>한식</button>
                <button onClick={() => filterButtonClick('중식')}>중식</button>
                <button onClick={() => filterButtonClick('일식')}>일식</button>
            </div>
        </>
    )
}