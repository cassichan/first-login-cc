import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

//credentials to connect to firebase project
const firebaseConfig = {
  apiKey: "AIzaSyC0e1lrRMMqjck6MhbLfFApYxijQd7k98U",
  authDomain: "first-login-cc.firebaseapp.com",
  projectId: "first-login-cc",
  storageBucket: "first-login-cc.appspot.com",
  messagingSenderId: "447326846454",
  appId: "1:447326846454:web:03168b2fd1732ba3ac9bd7",
};

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const connectAuth = async () => {
    //connec to fb project
    const app = initializeApp(firebaseConfig);
    //connect to auth
    return getAuth(app);
  };

  const handleLogin = async () => {
    const auth = await connectAuth();
    const user = await signInWithEmailAndPassword(auth, email, password).catch(
      (err) => alert(err.message)
    );
    if (user) {
      console.log(user.user);
      setIsLoggedIn(true);
    }
  };

  //Sign in with google
  const handleGoogleLogin = async () => {
    const auth = await connectAuth();
    const provider = new GoogleAuthProvider();
    //When hit button, it will pop up google authentication
    const user = await signInWithPopup(auth, provider).catch((err) => {
      alert(err.message);
      if (user) {
        console.log(user.user);
        setIsLoggedIn(true);
      }
    });
  };

  const handleSignUp = async () => {
    const auth = await connectAuth();
    //create new user
    const user = await createUserWithEmailAndPassword(auth, email, password);
    //if all ok...
    if (user) {
      setIsLoggedIn(true);
      console
        .log(user.user)
        //if error, popup error
        .catch((err) => alert(err.message));
    }
  };

  return (
    //Make it so it does not automatically submit form when hit button
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="email">
        Email:
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          type="email"
          placeholder="you@there.com"
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          type="password"
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>&nbsp;
      <button onClick={handleSignUp}>Sign up</button>
      <br/>
      <button onClick={handleGoogleLogin}>Log in with Google</button>
    </form>
  );
}
