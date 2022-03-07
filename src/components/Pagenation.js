import styled from 'styled-components';

function PageComponent({ page, setPage }) {
  // const numPages = Math.ceil(total / limit);

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
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === 10}>
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
