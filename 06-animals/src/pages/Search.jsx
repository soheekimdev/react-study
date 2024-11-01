import { Link, useSearchParams } from 'react-router-dom';
import { data } from '../assets/data/data';
import { getRegExp } from 'korean-regexp';
import { useEffect, useRef, useState } from 'react';

// const Search = () => {
//   const [searchParams] = useSearchParams();
//   const param = searchParams.get('animal');
//   const reg = getRegExp(param);

//   const filteredData = data.filter((el) => el.name.match(reg));

//   return (
//     <>
//       <ul>
//         {filteredData.map((el) => (
//           <li key={el.id}>
//             <Link to={`/details/${el.id}`}>
//               <img src={el.img} alt={el.name} />
//               <div>{el.name}</div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// Debounce 방식
// const Search = () => {
//   const [searchParams] = useSearchParams();
//   const [filteredData, setFiltered] = useState(data); // 추가
//   const param = searchParams.get('animal');
//   const reg = getRegExp(param);

//   // useEffect로 Debounce 구현
//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       const newFilteredData = data.filter((el) => el.name.match(reg));
//       setFiltered(newFilteredData);
//     }, 1000);
//     return () => clearTimeout(debounceTimer);
//   }, [param]);

//   return (
//     <>
//       <ul>
//         {filteredData.map((el) => (
//           <li key={el.id}>
//             <Link to={`/details/${el.id}`}>
//               <img src={el.img} alt={el.name} />
//               <div>{el.name}</div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// Throttle 방식
const Search = () => {
  const [searchParams] = useSearchParams();
  const [filteredData, setFiltered] = useState(data);
  const param = searchParams.get('animal');
  const reg = getRegExp(param);
  const time = useRef(new Date());

  // useEffect로 Debounce 구현
  useEffect(() => {
    const newTime = new Date();

    const throttleTimer = setTimeout(() => {
      const newFilteredData = data.filter((el) => el.name.match(reg));
      setFiltered(newFilteredData);
      time.current = new Date();
    }, 1000 - (newTime - time.current));
    return () => clearTimeout(throttleTimer);
  }, [param]);

  return (
    <>
      <ul>
        {filteredData.map((el) => (
          <li key={el.id}>
            <Link to={`/details/${el.id}`}>
              <img src={el.img} alt={el.name} />
              <div>{el.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Search;
