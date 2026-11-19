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
      </div>
    </div>
  )
}

export default MealCard
