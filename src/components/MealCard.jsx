import { Link } from 'react-router-dom'

function MealCard({ meal }) {
  const origin = meal.strArea || meal.strCountry

  return (
    <Link to={`/recipe/${meal.idMeal}`} className="card-meal">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="card-meal-body">
        <div className="card-meal-tags">
          {meal.strCategory && <Link to={`/?categoria=${meal.strCategory}`}>{meal.strCategory}</Link>}
          {origin && <Link to={`/?origem=${origin}`}>{origin}</Link>}
        </div>
        <h3>{meal.strMeal}</h3>
        <button className="btn btn-primary" aria-hidden="true">Ver receita</button>
      </div>
    </Link>
  )
}

export default MealCard
