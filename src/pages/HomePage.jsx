import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMeals } from '../services/mealApi'

import MealCard from '../components/MealCard'
import Search from '../components/Search'
import NotFoundRecipe from '../components/NotFoundRecipe'
import ErrorMessage from '../components/ErrorMessage'

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('categoria') || ''
  const area = searchParams.get('origem') || ''


  const [meals, setMeals] = useState([])
  const [visibleCount, setVisibleCount] = useState(12)
  const visibleMeals = Array.isArray(meals) ? meals.slice(0, visibleCount) : []
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadMeals() {
      setLoading(true)
      searchMeals(query, category, area).then((dados) => {
        console.log('Receitas encontradas: ', dados)
        console.log('Parâmetros de busca: ', { query, category, area })
        setMeals(dados)
        setVisibleCount(12)
        setLoading(false)
      })
    }
    loadMeals()
  }, [query, category, area])

  function updateFilters(newQuery, newCategory, newArea) {
    const newParams = new URLSearchParams()
    if (newQuery) newParams.set('q', newQuery)
    if (newCategory) newParams.set('categoria', newCategory)
    if (newArea) newParams.set('origem', newArea)
    setSearchParams(newParams)
  }

  return (
    <main className="main-content">
      <div>
        <h1>Explorar Receitas</h1>
        <p>
          Busque por nome, filtre por categoria ou escolha uma culinária para
          descobrir novos pratos e conferir o modo de preparo.
        </p>
      </div>

      <Search 
        query={query}
        category={category}
        area={area}
        onSearch={(nextQuery) => updateFilters(nextQuery, category, area)}
        onCategoryChange={(nextCategory) => updateFilters(query, nextCategory, area)}
        onAreaChange={(nextArea) => updateFilters(query, category, nextArea)}
      />
        {meals.error && (
          <ErrorMessage title={"Não foi possível carregar as receitas"} message={"Ocorreu um erro ao se comunicar com o serviço TheMealDB. Verifique sua conexão e tente novamente."} />
        )}
      <div className="result-container">
        {meals.length === 0 && !loading && <NotFoundRecipe/>}
        <p>{meals.length} receitas encontradas</p>
        <div className="cards-grid">
          {visibleMeals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
        <div className="load-more">
          <p>Mostrando {visibleMeals.length} de {meals.length}</p>
          {visibleCount < meals.length && (
            <button onClick={() => setVisibleCount((prevCount) => prevCount + 12)}>
              Carregar mais
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default HomePage
