import { Link } from 'react-router-dom';
import { data } from '../assets/data/data';

const Main = () => {
  return (
    <ul>
      {data.map((el) => (
        <li key={el.id}>
          <Link to={`/details/${el.id}`}>
            <img src={el.img} alt={el.name} />
            <div>{el.name}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Main;
