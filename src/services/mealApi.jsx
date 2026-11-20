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
    const res = await fetch(`${apiBase}/search.php?s=${encodeURIComponent(query)}`)
    const data = await res.json()
    let meals = data.meals || []
    if(category) {
      meals = meals.filter(meal => meal.strCategory === category)
    }
    if(area) {
      meals = meals.filter(meal => meal.strArea === area)
    }
    return meals
  } catch(e){
    console.error('Erro ao buscar receitas:', e)
    return []
  }
}

export async function getCategories() {
  const res = await fetch(`${apiBase}/categories.php`)
  const data = await res.json()
  return data.categories || []
}

export async function getMealsByCategory(category) {
  const res = await fetch(`${apiBase}/filter.php?c=${encodeURIComponent(category)}`)
  const data = await res.json()
  return data.meals || []
}

export async function getMealsByArea(area) {
  const res = await fetch(`${apiBase}/filter.php?a=${encodeURIComponent(area)}`)
  const data = await res.json()
  return data.meals || []
}

export async function getMealById(id) {
  const res = await fetch(`${apiBase}/lookup.php?i=${encodeURIComponent(id)}`)
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}

export async function getRandomMeal() {
  const res = await fetch(`${apiBase}/random.php`)
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}