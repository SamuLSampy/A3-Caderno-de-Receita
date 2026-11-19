import { Sparkles } from 'lucide-react'
import logoImg from '../assets/logo.png'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logoImg} alt="Caderno de Receitas" className="logo" />
        <button type="button" className="btn-surprise">
          <Sparkles size={17} />
          <span>Surpreenda-me</span>
        </button>
      </div>
    </header>
  )
}

export default Header
