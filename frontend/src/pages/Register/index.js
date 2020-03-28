import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import './style.css'

import logo from '../../assets/logo.svg'

export default function Register() {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ whatsapp, setWhatapp ] = useState('')
  const [ city, setCity ] = useState('')
  const [ uf, setUF ] = useState('')

  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault()

    let response = await api.post('/ongs', {
      name,
      email,
      whatsapp,
      city,
      uf
    })

    alert(`Seu ID de acesso: ${response.data.id}`)

    history.push('/')
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Nome da ONG"
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input 
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={event => setEmail(event.target.value)}
           />
          <input 
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={event => setWhatapp(event.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={event => setCity(event.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={event => setUF(event.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}