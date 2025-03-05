import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [users, setUsers] = useState(null);
    const [authName, setAuthName] = useState("Alice");
    const [displayListError, setDisplayListError] = useState(false);
    const [displayAddUserError, setDisplayAddUserError] = useState('');


    const [lastName,setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');

    const [hobby, setHobby] = useState('');
    const [hobbies, setHobbies] = useState([]);

    const fetching = async () => {
        try {
            const fetch = await axios.get("http://localhost:8000/api/users");
            setUsers(fetch.data);
        } catch (error) {
          setDisplayListError(true);
        }
    };

    const addHobby = (e) => {
      e.preventDefault();
      if (hobby.trim() !== "") {
        setHobbies(hobbies => [...hobbies, hobby]);
        setHobby("");
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:8000/api/user/add', {lastName, firstName, address, telephone, hobbies});
        await fetching();
        setDisplayAddUserError(`Un nouvel utilisateur a été ajouté !`)
        
      } catch (error) {
        setDisplayAddUserError(`L'utilisateur n'a pas pu être ajouté`)
      }
    }

    useEffect(() => {
      fetching();
    }, []);

    return (
        <>
            <h1>Hello world and {authName}</h1>
            <ul className="user-list">
                {!users ? (
                    <li>Chargement...</li>
                ) : displayListError ? (
                    <li>Une erreur est survenue</li>
                ) : (
                    users.map((user, index) => {
                        return (
                            <li key={index} className="single-user">
                                <p>Nom : {user.lastName}</p>
                                <p>Prénom : {user.firstName}</p>
                                <p>Addresse : {user.address}</p>
                                <p>Téléphone : {user.telephone}</p>
                                <p>
                                    Hobbies :{" "}
                                    {user.hobbies.map((hobbie, idx) => {
                                        return <span key={idx}>{hobbie} </span>;
                                    })}
                                </p>
                            </li>
                        );
                    })
                )}
            </ul>
            
            {displayAddUserError && (
              <p className="add-user-error">{displayAddUserError}</p>
            )}

            <form onSubmit={handleSubmit} className="form-add-user">
                <div>
                  <label htmlFor="lastName">Nom</label>
                  <input id="lastName" type="text" onChange={(e) => {setLastName(e.target.value)}} />
                </div>
                <div>
                  <label htmlFor="firstName">Prénom</label>
                  <input id="firstName" type="text" onChange={(e) => {setFirstName(e.target.value)}} />
                </div>
                <div>
                  <label htmlFor="address">Addresse</label>
                  <input id="address" type="text" onChange={(e) => {setAddress(e.target.value)}} />
                </div>
                <div>
                  <label htmlFor="telephone">Téléphone</label>
                  <input id="telephone" type="text" onChange={(e) => {setTelephone(e.target.value)}} />
                </div>

                <div>
                  <label htmlFor="hobby">Hobbie</label>
                  <input id="hobby" type="text" onChange={(e) => {setHobby(e.target.value)}} />
                  <button onClick={(e) => addHobby(e)}>Ajouter hobby</button>
                </div>
                
                <button type="submit">Ajouter</button>
            </form>
              
        </>
    );
}

export default App;
