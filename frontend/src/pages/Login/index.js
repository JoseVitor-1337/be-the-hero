import React, { useState } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory} from 'react-router-dom'
import './style.css'

import HeroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import api from '../../services/api'

export default function Login() {
  const [ id, setId ] = useState('')

  let history = useHistory();

  async function handleLogin(event) {
    event.preventDefault()

    const response = await api.post('sessions', { id });

    localStorage.setItem('ongId', id)
    localStorage.setItem('ongName', response.data.name)

    history.push('/profile')
  }

  return (
   <div className="login-container">
     <section className="form">
      <img src={logo} alt="Be The Hero"/>

      <form onSubmit={handleLogin}>
        <h1>Faça seu login</h1>

        <input 
          type="text" 
          placeholder="Seu ID"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
        <button className="button" type="submit">Entrar</button>

        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#E02041"/>
          Não tenho cadastro
        </Link>

      </form>
     </section>
     <img src={HeroesImg} alt="Heroes"/>
   </div>
  )
}