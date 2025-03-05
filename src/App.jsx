import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
    const [users, setUsers] = useState(null);
    const name = 'Alice';

    const fetching = async () => {
        try {
            const fetch = await axios.get('http://localhost:8000/api/users');
            setUsers(fetch.data);
        } catch (error) {
            console.log(error);
        }
    };

  useEffect(() => {
    fetching()
  }, [])

    return (
      <>
          <h1>Hello world and {name}</h1>
          <div className="user-list">
            {users && users.map(user => {
              return (
                <div className="single-user">
                  <p>Nom : {user.lastName}</p>
                  <p>Prénom : {user.firstName}</p>
                  <p>Addresse : {user.address}</p>
                </div>
              )
            })}
          </div>
      </>
    ) 
}

export default App
