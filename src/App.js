import React from "react";

const Button = ({ ...props }) => <button {...props} />;

const filter = (users, query) =>
  users.filter(user => user.login.toLowerCase().includes(query));

const UserList = React.memo(function UserList({ users, query }) {
  const filtereds = React.useMemo(() => filter(users, query), [users, query]);
  return filtereds.map(user => <div key={user.id}>{user.login}</div>);
});

const App = () => {
  const [count, setCount] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const getUsers = React.useCallback(async setUsers => {
    const response = await fetch("https://api.github.com/users");
    const data = await response.json();
    setUsers(data);
  }, []);

  React.useEffect(() => {
    getUsers(setUsers);
  }, [getUsers]);

  return (
    <div>
      {count}
      <div>
        <Button
          onClick={React.useCallback(() => setCount(state => state + 1), [])}
        >
          Increment
        </Button>
        <div>
          <input
            type="text"
            value={query}
            onChange={ev => setQuery(ev.target.value)}
          />
        </div>
        <UserList users={users} query={query} />
      </div>
    </div>
  );
};

export default App;
