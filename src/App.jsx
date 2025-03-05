import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [users, setUsers] = useState(null);
    const [authName, setAuthName] = useState('Alice');
    const [displayError, setDisplayError] = useState(false);

    const fetching = async () => {
        try {
            const fetch = await axios.get('http://localhost:8000/api/users');
            setUsers(fetch.data);
        } catch (error) {
            setDisplayError(true);
        }
    };

  useEffect(() => {
    fetching()
  }, [])

    return (
      <>
          <h1>Hello world and {authName}</h1>
          <ul className="user-list">
            {!users ? (
              <li>Chargement...</li> )
            : displayError ? (
                <li>Une erreur est survenue</li> )
              : (
              users.map((user,index) => {
                return (
                  <li key={index} className="single-user">
                    <p>Nom : {user.lastName}</p>
                    <p>Prénom : {user.firstName}</p>
                    <p>Addresse : {user.address}</p>
                    <p>Téléphone : {user.telephone}</p>
                    <p>Hobbies : {user.hobbies.map((hobbie, idx) => { return (<span key={idx}>{hobbie} </span>) } )}</p>
                  </li>
                )}
              )
              )}
          </ul>
      </>
    ) 
}

export default App
