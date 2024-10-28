import { NavLink, Outlet } from 'react-router-dom';

const Contents = () => {
  const contents = [
    { id: 1, title: 'Content 1' },
    { id: 2, title: 'Content 2' },
    { id: 3, title: 'Content 3' },
    { id: 4, title: 'Content 4' },
    { id: 5, title: 'Content 5' },
  ];

  return (
    <>
      <h1>Contents 페이지입니다.</h1>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <NavLink to={`${content.id}?content=${content.title}`}>{content.title}</NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
};

export default Contents;
