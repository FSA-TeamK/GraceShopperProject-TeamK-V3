import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';
import axios from 'axios';
import { useState } from 'react';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState([]);

  const user = useSelector((state) => state.auth.me);
  
  const getUsers = async () => {
    const { data } = await axios.get('/api/users');
    setUsers(data);
    setShowUsers(true);
  };
  
  const getInfo = async () => {
    const { data } = await axios.get('/api/userId');
    setUsers(data);
    setShowInfo(true);
  };
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    console.log(evt.target.username.value);
    dispatch(authenticate({ username, password, method: formName }));
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
      {user && user.isAdmin ? (
        <button onClick={getUsers}>User Info</button>
      ) : null}
      {showUsers ? (
        <table>
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
              );
            })}
          </tbody>
        </table>
      ) : null}
      {user && !user.isAdmin ? (
        <button onClick={getInfo}>Update Info</button>
      ) : null}
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      
    </div>
  )
};


export default AuthForm;
