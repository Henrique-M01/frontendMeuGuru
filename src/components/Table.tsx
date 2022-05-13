import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IUser from '../interface/IUser';
import '../styles/ButtonsAndInput.css';

export default function Table() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3010/users/all')
      .then((user) => {
        setUsers(user.data)
      })
  }, [name, email, forceUpdate])

  function filterByName(name: string) {
    const filteredByName = users.filter((user: IUser) => user.name.includes(name));
    setUsers(filteredByName);
  }

  function filterByEmail(email: string) {
    const filteredByEmail = users.filter((user: IUser) => user.email.includes(email));
    setUsers(filteredByEmail);
  }

  async function deleteById(id: string) {
    await axios.delete(`http://localhost:3010/users/${id}`);
    setForceUpdate(true)
  }

  return (
    <div>
      <div className="container-inputs-filter">
        <input
          type="text"
          placeholder="Filtrar por nome"
          onChange={(event) => setName(event.target.value) }
        />
        <button
          onClick={ () => filterByName(name)}
        >
          Filtrar por nome
        </button>
        <input
          type="text"
          placeholder="Filtrar por email"
          onChange={(event) => setEmail(event.target.value) }
        />
        <button
          onClick={ () => filterByEmail(email)}
        >
          Filtrar por email
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={ user.id }>
              <td>{ user.name }</td>
              <td>{ user.email }</td>
              <td>
                <button
                  onClick={() => navigate(`/users/update/${user.id}`)}
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  onClick={async () => await deleteById(user.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => navigate('/users/create')}
        className="create-user"
      >
        Criar usuario
      </button>
    </div>
  )
}