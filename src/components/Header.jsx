import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import logoImg from '../assets/logo.png'
import { getRandomMeal } from '../services/mealApi'

function Header() {

  function goToRandomRecipe(){
    getRandomMeal().then((mealData) => {
      if(mealData && mealData.idMeal){
        window.location.href = `/recipe/${mealData.idMeal}`
      }
    })
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <img src={logoImg} alt="Caderno de Receitas" className="logo" />
        </Link>
        <button type="button" className="btn-surprise" onClick={goToRandomRecipe}>
          <Sparkles size={17} />
          <span>Surpreenda-me</span>
        </button>
      </div>
    </header>
  )
}

export default Header
