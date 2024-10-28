import { useLocation, useParams } from 'react-router-dom';

const ContentDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const content = queryParams.get('content');

  return (
    <ul>
      <li>콘텐츠 ID: {id}</li>
      <li>콘텐츠 내용: {content}</li>
    </ul>
  );
};

export default ContentDetails;
