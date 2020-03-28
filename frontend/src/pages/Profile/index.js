import React, { useState, useEffect } from 'react'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import './style.css'

import logo from '../../assets/logo.svg'

export default function Profile() {
  const [ cases, setCases ] = useState([])

  const history = useHistory();
  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  useEffect(() => {
    api.get('/profiles', {
      headers: {
        authorization:  ongId
      }
    }).then(response => {
      setCases(response.data)
    })
  }, [ongId])


  async function handleDeleteCase(id) {
    await api.delete(`cases/${id}`, {
      headers: {
        authorization: ongId
      }
    })

    setCases(cases.filter(data => data.id !== id))
  }

  async function handleLogout(id) {
    localStorage.clear();

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero"/>
        <span>Bem vindo, {ongName}</span>

        <Link className="button" to="case/new">Cadastrar novo caso</Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {cases.map(data => (
          <li key={data.id}>
            <strong>CASO:</strong>
            <p>{data.title}</p>
  
            <strong>DESCRIÇÃO:</strong>
            <p>{data.description}</p>
  
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat(`pt-BR`, { style: 'currency', currency: 'BRL' }).format(data.value)}</p>
  
            <button onClick={() => handleDeleteCase(data.id)} type="button">
              <FiTrash2 size={20} color="#A8A8B3"/>
            </button>
          </li> 
        ))}    
      </ul>
    </div>
  )
}