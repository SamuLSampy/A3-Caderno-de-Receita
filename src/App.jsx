import { Route, Routes } from 'react-router-dom'
import { UtensilsCrossed } from 'lucide-react'
import logoImg from './assets/logo.png'

function Home() {
  return (
    <main className="main-content">
      <div className="card">
        <div className="badge">
          <UtensilsCrossed size={24} />
          <span>Projeto pronto para começar</span>
        </div>
        <h1 className="title">Caderno de Receitas</h1>
        <p className="subtitle">
          Ambiente configurado com React, Vite, React Router e Lucide Icons.
        </p>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <img src={logoImg} alt="Caderno de Receitas" className="logo" />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
