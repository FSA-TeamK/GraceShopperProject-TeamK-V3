import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserAsync } from "../../slices/userSlice";


const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const createUser = {username, email, password};
        dispatch(addUserAsync(createUser)).then(()=>{
            navigate("/login");
        });
    };

    return(
        <>
        <h1>Sign Up</h1>
        <Link to={'/login'}>
        <button>Log In</button>
        </Link>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">UserName:</label>
            <input
                type = "text"
                required
                name = "username"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email">E-mail:</label>
            <input
            type = "email"
            required
            name = "email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password:</label>
            <input
                type = "text"
                required
                name = "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
            />

            <button type="submit" >SignUp</button>
        </form>
        </>
    )

}

export default SignUp;