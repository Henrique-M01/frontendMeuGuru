import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CreateOrUpdateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [equalPassword, setEqualPassword] = useState('');

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, , TYPE, ID] = pathname.split('/');

  async function createUser(name: string, email: string, password: string, equalPassword: string) {
    if (password === equalPassword && name && email) {
      await axios.post('http://localhost:3010/users/create', { name, email, password} )
      
      navigate('/')
    }
  }

  async function updateUser(
    name: string,
    email: string,
    password: string,
    equalPassword: string, 
    id: string,
    ) {
      if (password === equalPassword && name && email && id) {
        await axios.put(`http://localhost:3010/users/${id}`, { name, email, password } )
        
        navigate('/')
      }
  }

  return (
    <div className="bg-gray-600">
      <form>
      <label htmlFor="input-name">
        <input
          id="input-name"
          type="text"
          placeholder="Digite o nome do usuario"
          onChange={(event) => setName(event.target.value) }
        />
      </label>
      <label htmlFor="input-email">
        <input
          id="input-email"
          type="text"
          placeholder="Digite o email do usuario"
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label htmlFor="input-password">
        <input
          id="input-password"
          type="password"
          placeholder="Digite a senha do usuario"
          onChange={(event) => setPassword(event.target.value) }
        />
      </label>
      <label htmlFor="input-confirm-password">
        <input
          id="input-confirm-password"
          type="password"
          placeholder="Confirme a senha"
          onChange={(event) => setEqualPassword(event.target.value) }
        />
      </label>
      { TYPE === 'create' 
      ? 
        <button
          onClick={(event) => {
            event.preventDefault();
            createUser(name, email, password, equalPassword)
          }}
        >
          Criar usuario
        </button>
      : <button
          onClick={(event) => {
            event.preventDefault();
            updateUser(name, email, password, equalPassword, ID)
          }}
        >
          Atualiza usuario
        </button>
      }
      </form>
    </div>
  )
}