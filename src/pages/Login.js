import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


function Login({}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/");
        } catch(error) {
            console.error(error);
        }
    };

    return(
        <div className="login-page">
            <div className="login">
                <h1>User Login</h1>
                <form onSubmit={handleSubmit} className="login-inputs">
                    <input
                        type="email"
                        placeholder="Your Email"
                        required="required"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Your Password"
                        required="required"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;