import { useLocation, useParams } from 'react-router-dom';

const User = () => {
  const { userId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userName = queryParams.get('name');

  return (
    <>
      <h1>User Page</h1>
      <ul>
        <li>유저 ID: {userId}</li>
        <li>유저 Name: {userName}</li>
      </ul>
    </>
  );
};

export default User;
