import React from "react";


const LogIn = () => {
    return(
        <>
        <h1>Login</h1>
        <button>Sign Up</button>
        <form>
            <label htmlFor="UserName">UserName:</label>
            <input
                type = "text"
                required
                UserName
            />
        </form>
        </>
    )

}

export default LogIn;