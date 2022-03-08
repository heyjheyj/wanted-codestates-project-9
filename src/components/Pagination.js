import styled from 'styled-components';
import { useEffect, useState } from 'react';

function PageComponent({ page, setPage, repository }) {
  const [start, setStart] = useState(page);
  const [last, setLast] = useState();

  useEffect(() => {
    if (page === 0) {
      return;
    } else if (page < start) {
      setStart(start - 1);
    } else if (page > start + 9) {
      setStart(start + 1);
    }
  }, [page, start]);

  useEffect(() => {
    if (repository && repository.length < 30) {
      setLast(page);
    }
  }, [repository, page]);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(10)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(start + i)}
              aria-current={page === i + start ? 'page' : null}
            >
              {i + start}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === last}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #ddd;
  color: black;
  font-size: 1rem;

  &:hover {
    background: #00a0ff50;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #ddd;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #00a0ff;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default PageComponent;
