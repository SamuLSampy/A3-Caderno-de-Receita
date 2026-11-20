import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import logoImg from '../assets/logo.png'
import { getRandomMeal } from '../services/mealApi'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  function goToRandomRecipe(){
    getRandomMeal().then((mealData) => {
      if(mealData && mealData.idMeal){
        navigate(`/recipe/${mealData.idMeal}`)
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
