import { useState } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

//credentials to connect to firebase project
const firebaseConfig = {
  apiKey: "AIzaSyC0e1lrRMMqjck6MhbLfFApYxijQd7k98U",
  authDomain: "first-login-cc.firebaseapp.com",
  projectId: "first-login-cc",
  storageBucket: "first-login-cc.appspot.com",
  messagingSenderId: "447326846454",
  appId: "1:447326846454:web:03168b2fd1732ba3ac9bd7",
};

//prop
export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async () => {
    //connect to firebase project
    const app = initializeApp(firebaseConfig);
    //send email and pw to firebase auth

    //connect to auth
    const auth = getAuth(app);

    //create new user
    const user = await createUserWithEmailAndPassword(auth, email, password);

    //if all ok...
    if (user) {
      setIsLoggedIn(true);
      console
        .log(user)
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
      <button onClick={handleSignUp}>Sign up</button>
    </form>
  );
}
