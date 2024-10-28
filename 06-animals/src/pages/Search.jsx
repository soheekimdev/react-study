import { Link, useSearchParams } from 'react-router-dom';
import { data } from '../assets/data/data';
import { getRegExp } from 'korean-regexp';

const Search = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get('animal');
  const reg = getRegExp(param);

  const filteredData = data.filter((el) => el.name.match(reg));

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
