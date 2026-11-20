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

export async function getMealById(id) {
  const res = await fetch(`${apiBase}/lookup.php?i=${encodeURIComponent(id)}`)
  const data = await res.json()
  return data.meals ? refactorMeal(data.meals[0]) : null
}

export async function getRandomMeal() {
  const res = await fetch(`${apiBase}/random.php`)
  const data = await res.json()
  return data.meals ? refactorMeal(data.meals[0]) : null
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
        .map((line) => line.replace(/^(step\s*)?\d+[\.\)\-:]\s*/i, ''))
    : []

  return {
    ...meal,
    ingredients,
    instructions,
  }
}