const apiBase = 'https://www.themealdb.com/api/json/v1/1'

export const verifiedAreas = [
  'Brazil',
  'Portugal',
  'Italy',
  'France',
  'Spain',
  'United States',
  'Mexico',
  'Argentina',
  'Japan',
  'China',
  'India',
  'Thailand',
  'British',
  'Greek',
  'Turkish',
  'Moroccan',
  'Vietnamese',
  'Canadian',
]

export const categoryLabels = {
    'Beef': 'Carne bovina',
    'Chicken': 'Frango',
    'Dessert': 'Sobremesas',
    'Pasta': 'Massas',
    'Seafood': 'Frutos do mar',
    'Vegetarian': 'Vegetariano',
    'Vegan': 'Vegano',
    'Breakfast': 'Café da manhã'
}

export async function searchMeals(query = '', category = '', area = '') {
  try {
    const cleanQuery = query.trim()
    if(cleanQuery){
      const res = await fetch(`${apiBase}/search.php?s=${encodeURIComponent(cleanQuery)}`)
      const data = await res.json()
      let meals = data.meals || []
      if(category) {
        meals = meals.filter(meal => meal.strCategory === category)
      }
      if(area) {
        meals = meals.filter(meal => meal.strArea === area || meal.strCountry === area)
      }
      return meals
    }

    if (category && area) {
      const catMeals = await getMealsByCategory(category)
      const areaMeals = await getMealsByArea(area)
      const areaIds = areaMeals.map((meal) => meal.idMeal)
      return catMeals
        .filter((meal) => areaIds.includes(meal.idMeal))
        .map((meal) => ({ ...meal, strCategory: category, strArea: area }))
    }

    if (category) {
      return await getMealsByCategory(category)
    }

    if (area) {
      return await getMealsByArea(area)
    }

    const res = await fetch(`${apiBase}/search.php?s=`)
    const data = await res.json()
    return data.meals || []

  } catch(e){
    console.error('Erro ao buscar receitas:', e)
    return { error: true }
  }
}

export async function getMealsByCategory(category) {
  const res = await fetch(`${apiBase}/filter.php?c=${encodeURIComponent(category)}`)
  const data = await res.json()
  return (data.meals || []).map((meal) => ({
    ...meal,
    strCategory: category,
  }))
}

export async function getMealsByArea(area) {
  const res = await fetch(`${apiBase}/filter.php?a=${encodeURIComponent(area)}`)
  const data = await res.json()
  return (data.meals || []).map((meal) => ({
    ...meal,
    strArea: area,
  }))
}

export async function getMealById(id) {
  try {
    const res = await fetch(`${apiBase}/lookup.php?i=${encodeURIComponent(id)}`)
    const data = await res.json()
    return data.meals ? refactorMeal(data.meals[0]) : null
  } catch(e){
    console.error('Erro ao fazer a busca por ID: ', e)
    return { error: true }
  }
}

export async function getRandomMeal() {
  try {
    const res = await fetch(`${apiBase}/random.php`)
    const data = await res.json()
    return data.meals ? refactorMeal(data.meals[0]) : null
  } catch(e){
    console.error('Erro ao fazer busca aleatória: ', e)
    return { error: true }
  }
}

export function refactorMeal(meal) {
  if (!meal) return null

  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim()
    const measure = meal[`strMeasure${i}`]?.trim()

    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure || '',
        fullText: measure ? `${measure} ${ingredient}` : ingredient,
      })
    }
  }

  const instructions = meal.strInstructions
    ? meal.strInstructions
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== '' && !/^(step\s*)?\d+\.?$/i.test(line))
        .map((line) => line.replace(/^(step\s*)?\d+[.):-]\s*/i, ''))
    : []

  return {
    ...meal,
    ingredients,
    instructions,
  }
}