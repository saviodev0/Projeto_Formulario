import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import './App.css'

function App() {
  // estado para controlar qual aba está ativa: cadastro ou login
  const [activeTab, setActiveTab] = useState('register')

  return (
    <div className="app">
      {/* Área de navegação entre abas */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Cadastro
        </button>
        <button
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
      </div>

      {/* Renderizar o formulário correspondente com base na aba ativa */}
      {activeTab === 'register' && <RegisterForm />}
      {activeTab === 'login' && <LoginForm />}
    </div>
  )
}

export default App
