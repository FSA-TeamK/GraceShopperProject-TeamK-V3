import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import axios from 'axios';
import { useState } from 'react';

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [formValues , setFormValues] = useState({
    email: '',
    username : '',
  });

  const user = useSelector((state) => state.auth.me);

  const getUsers = async () => {
    const { data } = await axios.get('/api/users');
    setUsers(data);
    setShowUsers(true)
  };

  const getInfo = async () => {
    try {
      const { data } = await axios.get(`/api/users/${user.id}`);  
      setInfo([data]);
      setShowInfo(true);
    } catch (error) {
      console.log(error)
    }
  };

  const handleEdit = (userId) => {
    setShowEditForm(true);
    setCurrentUserId(userId);
    // get the current user information and set it to the form
    const currentUser = users.find(user => user.id === userId);
    if (currentUser) {
      setFormValues({ email: formValues.email || currentUser.email, username: formValues.username || currentUser.username });
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }))
  };

  const handleEditSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // send a patch request to the server to update the user information
      await axios.patch(`/api/users/${currentUserId}`, formValues);
      // update the local state to reflect the changes
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === currentUserId ? { ...user, ...formValues } : user
      ));
      setShowEditForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
      </form>


    {user && user.isAdmin ? <button onClick={getUsers}>User Info</button>: null}
    {showUsers ? <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Username</th>

        </tr>
      </thead>
      <tbody>
        {users.map((user) => {

          return (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.username}</td>
            </tr>
          ) 
        })}
      </tbody>
    </table> : null}

    {user && !user.isAdmin ? 
      <button onClick={getInfo}>Update Info</button> : 
      null}
    {showInfo ? (
      <table>
          <thead>
              <tr>
                  <th>Email</th>
                  <th>Username</th>
              </tr>
          </thead>
          <tbody>
          {info.map((user) => (
                 <tr key={user.id}>
                 <td>{user.email}</td>
                 <td>{user.username}</td>
                 <td>
                    <button onClick={() => handleEdit(user.id)}>edit</button>
                 </td>
               </tr>             

          ))}

          </tbody>
      </table>
    ) : null}

    {showEditForm ? (
      <form onSubmit={handleEditSubmit}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" value={formValues.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" value={formValues.username} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">Update</button>
        </div>
      </form>
    ) : null}

      {error && error.response && <div> {error.response.data} </div>}
    </div>
  );
};

export default AuthForm;


