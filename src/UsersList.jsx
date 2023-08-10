import { useEffect, useState } from "react";
import "./UsersList.css";

const UsersList = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    usertype: "Admin",
  });

  const [users, setUsers] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData((prevDataForm) => {
      return { ...prevDataForm, [name]: target.value };
    });
  };

  const setUser = (e) => {
    e.preventDefault();
    setUsers(users.concat({ ...formData, id: Date.now() }));
  };

  const removeUser = (id) => {
    const filteredUsers = users.filter(user => user.id !== id)
    setUsers(filteredUsers)
  }

  const filtering = (e) => {
    console.log((e.target.className).split(" ")[1])


    const className = (e.target.className).split(" ")[1]

    let newFiltered

    if (className === 'showUsers') {
      newFiltered = users.filter((user) => {
        return user.usertype === 'User'
      })
    }

    if (className === 'showAdmins') {
      newFiltered = users.filter((user) => {
        return user.usertype === 'Admin'
      })
    }

    if (className === 'showAll') {
      newFiltered = users
    }

    setFilterList(newFiltered)
  }

  useEffect(() => {
    setFilterList(users)
  }, [users])

  return (
    <div className="usersList">
      <form onSubmit={setUser}>
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="User name"
          onChange={handleInputChange}
          value={formData.username}
        />
        <label htmlFor="email">User email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="User email"
          onChange={handleInputChange}
          value={formData.email}
        />
        <label htmlFor="usertype">User type</label>
        <select id="usertype" name="usertype" onChange={handleInputChange}>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button>Save</button>
      </form>


      <div className="buttons">
        <button className="btn showUsers" onClick={(e) => {
          filtering(e)
        }}>pokaż users</button>
        <button className="btn showAdmins" onClick={(e) => {
          filtering(e)
        }}>pokaż admins</button>
        <button className="btn showAll" onClick={(e) => {
          filtering(e)
        }}>pokaż all</button>
      </div>

      <div className="list">
        {filterList.map((user) => {
          return (
            <div className="userItem" key={user.id} onClick={() => removeUser(user.id)} >
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.usertype}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersList;
