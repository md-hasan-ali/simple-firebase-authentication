import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider, signOut, FacebookAuthProvider } from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './firebase/firebase.initialize';


const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
const FacebookProvider = new FacebookAuthProvider();
initializeAuthentication();
const auth = getAuth();

function App() {
  const [user, setUser] = useState({});
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const logedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(logedInUser)
      })
      .catch(error => {
        console.log(error.messege)
      })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth, GithubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const logedInUser2 = {
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(logedInUser2)
      })
  }
  const handleFbLogin = () => {
    signInWithPopup(auth, FacebookProvider)
      .then(result => {
        const user = result.user;
        console.log(user)
      })
      .catch(error => {
        console.log(error.messege)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
  }
  return (
    <div className="App">
      {!user.photo ?
        <div>
          <button onClick={handleGoogleSingIn}>Google SignIn</button>
          <button onClick={handleGithubSignIn}>GitHub SignIn</button>
          <button onClick={handleFbLogin}>Facebook Login</button>
        </div> :
        <button onClick={handleSignOut}>SingOut</button>
      }

      {
        user.photo && <div>
          <h2>WelCome {user.name}</h2>
          <h3>Your Email : {user.email}</h3>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
