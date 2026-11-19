import { useEffect, useState } from 'react'
import MealCard from '../components/MealCard'
import Search from '../components/Search'
import { buscarReceitas } from '../services/mealApi'

function HomePage() {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    buscarReceitas().then((dados) => {
      setMeals(dados)
    })
  }, [])

  return (
    <main className="main-content">
      <div>
        <h1>Explorar Receitas</h1>
        <p>
          Busque por nome, filtre por categoria ou escolha uma culinária para
          descobrir novos pratos e conferir o modo de preparo.
        </p>
      </div>

      <Search />

      <div className="result-container">
        <p>{meals.length} receitas encontradas</p>
        <div className="cards-grid">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default HomePage
