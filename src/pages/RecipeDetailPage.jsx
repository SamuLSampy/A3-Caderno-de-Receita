import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getMealById } from '../services/mealApi'
import { useEffect, useState } from 'react'
import {ExternalLink} from 'lucide-react'

function RecipeDetailPage() {
  const [meal, setMeal] = useState(null)
  const [checkedIngredients, setCheckedIngredients] = useState([])

  const {id} = useParams()
  useEffect(() => {
    getMealById(id).then((mealData) => {
      setMeal(mealData)
      console.log(mealData)
    })
  },[id])

  if (!meal) {
    return (
      <main className="main-content">
        <p>Carregando receita...</p>
      </main>
    )
  }

  function toggleIngredient(index){
    setCheckedIngredients((prevChecked) => {
      const newChecked = [...prevChecked]
      newChecked[index] = !newChecked[index]
      return newChecked
    })
  }

  function returnToPreviousPage() {
    window.history.back()
  }

  return (
    <div>
      <main className="main-content">
        <nav>
          <button onClick={returnToPreviousPage}>Voltar</button>
          <Link to="/">Explorar todas as receitas</Link>
        </nav>
        <div className="recipe-detail">
          <div className="recipe-info">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="recipe-info-text">
              <div className="recipe-tags">
                <Link to={`/?categoria=${meal.strCategory}`} className="recipe-category-tag">{meal.strCategory}</Link>
                <Link to={`/?origem=${meal.strCountry}`} className="recipe-origin-tag">{meal.strCountry}</Link>
              </div>
              <h1 className="recipe-title">{meal.strMeal}</h1>
              <p className="recipe-counts">{meal.ingredients.length} ingredientes • {meal.instructions.length} de preparo</p>
              <div>
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="youtube-button">Assistir no YouTube <ExternalLink /></a>
                <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="youtube-button">Fonte Original <ExternalLink /></a>
              </div>
            </div>
          </div>
          <div className="recipe-ingredients">
            <div className="recipe-ingredients-header">
              <h2>Ingredientes</h2>
              <p className="recipe-ingredients-step-checked">{checkedIngredients.filter(Boolean).length} de {meal.ingredients.length} separados</p>
            </div>
            <ul className="recipe-ingredients-list">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <input type="checkbox" id={`ingredient-${index}`} onChange={() => toggleIngredient(index)} checked={Boolean(checkedIngredients[index])} />
                  <label htmlFor={`ingredient-${index}`}>
                    <span className="ingredient-check">{ingredient.ingredient}</span>
                    {ingredient.measure ? ` — ${ingredient.measure}` : ''}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe-tutorial">
            <h2>Modo de preparo</h2>
            <ol className="recipe-tutorial-list">
              {meal.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RecipeDetailPage