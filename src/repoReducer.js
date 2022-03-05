export default function repoReducer(state, action) {
  switch (action.type) {
    case 'SET':
      window.localStorage.setItem('repos', JSON.stringify(state));
      return;
    case 'GET':
      return JSON.parse(window.localStorage.getItem('repos'));
    case 'DELETE':
  }
}
