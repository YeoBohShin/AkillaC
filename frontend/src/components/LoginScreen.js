import { useState } from "react";
import { getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword } from "firebase/auth";
import { createProfile } from "../firebase";

export default function LoginScreen() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [signUp, setSignUp] = useState(false); // True if user is signing up
  const auth = getAuth();
  
  // signs in the user with the given email and password
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      // Handle login error
      alert("Invalid email or password");
      console.log(error);
    }
  };

  // creates a new user with the given email and password
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, createEmail, createPassword);
      // Create a profile for the user
      if (user) {
        createProfile(user.user.uid, { uid: user.user.uid });
      }
    } catch (error) {
      // Handle creation error
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div className="login-background">
      <div className="login-style">
        <h1 className="login-title">AKILLAC</h1>
        <h2 className="login-slogan">Soar and Score</h2>
        {signUp ? (
        <>
        <h3 className="login-subtitle">Sign Up</h3>
        <form onSubmit={handleCreate} id="signup">
          <label htmlFor="email" className="login-label">Username:</label>
          <input
            type="email"
            id="email"
            value={createEmail}
            onChange={(event) => setCreateEmail(event.target.value)}
            placeholder="Email"
            className="login-input"
            autoComplete="username"
            />
          <br />
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            value={createPassword}
            onChange={(event) => setCreatePassword(event.target.value)}
            placeholder="Password"
            className="login-input"
            />
          <br />
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        <button onClick={() => setSignUp(false)} className="login-anchor">Have an account already? Log In</button>
        </>
        ) : (
          <>
          <h3 className="login-subtitle">Log In</h3>
          <form onSubmit={handleLogin} id="login">
          <label htmlFor="email" className="login-label">Username:</label>
          <input
            type="email"
            id="email"
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            placeholder="Email"
            className="login-input"
            autoComplete="username"
          />
          <br />
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            placeholder="Password"
            className="login-input"
          />
          <br />
          <button type="submit" className="login-button">Login</button>
        </form>
        <button onClick={() => setSignUp(true)} className="login-anchor">Don't have an account? Sign Up</button>
        </>
        )}
      </div>
    </div>
  );
}
