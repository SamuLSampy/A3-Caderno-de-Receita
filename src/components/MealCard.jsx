import { Link } from 'react-router-dom'

function MealCard({ meal }) {
  const origin = meal.strArea || meal.strCountry

  return (
    <div className="card-meal">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="card-meal-body">
        <div className="card-meal-tags">
          {meal.strCategory && <span>{meal.strCategory}</span>}
          {origin && <span>{origin}</span>}
        </div>
        <h3>{meal.strMeal}</h3>
        <Link to={`/recipe/${meal.idMeal}`} className="btn btn-primary" aria-hidden="true">Ver receita</Link>
      </div>
    </div>
  )
}

export default MealCard
