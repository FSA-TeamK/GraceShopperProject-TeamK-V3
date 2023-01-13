import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <>
        <h1>Login</h1>
        <Link to={'/signup'}>
            <button>Sign Up</button>
        </Link>
        <form>
            <label htmlFor="username">UserName:</label>
            <input
                type = "text"
                required
                name = "username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
                type = "text"
                required
                name = "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
            />

            <button type="submit" >LogIn</button>
        </form>
        </>
    )

}

export default LogIn;