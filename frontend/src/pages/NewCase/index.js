import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import './style.css'

import api from '../../services/api'
import logo from '../../assets/logo.svg'

export default function NewCase() {
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ value, setValue ] = useState('')

  const history = useHistory();
  const ongId = localStorage.getItem('ongId')

  async function handleNewCase(event) {
    event.preventDefault()

    console.log(title, description, value)

    await api.post('/cases', {
      title,
      description,
      value
    }, {
      headers: {
        authorization: ongId
      }
    })

    history.push('/profile')
  }

  return (
    <div className="new-case-container">
      <div className="content">
        <section>
          <img src={logo} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewCase}>
          <input 
            placeholder="Título do caso"
            onChange={event => setTitle(event.target.value)}
            value={title}
          />
          <textarea 
            placeholder="Descriçao"
            onChange={event => setDescription(event.target.value)}
            value={description}
          />
          <input 
            placeholder="Valor em Reais"
            onChange={event => setValue(event.target.value)}
            value={value}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}