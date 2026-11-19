const apiBase = 'https://www.themealdb.com/api/json/v1/1'

export async function buscarReceitas(texto = '') {
  const res = await fetch(`${apiBase}/search.php?s=${encodeURIComponent(texto)}`)
  const data = await res.json()
  return data.meals || []
}

export async function buscarCategorias() {
  const res = await fetch(`${apiBase}/categories.php`)
  const data = await res.json()
  return data.categories || []
}

export async function buscarPorCategoria(categoria) {
  const res = await fetch(`${apiBase}/filter.php?c=${encodeURIComponent(categoria)}`)
  const data = await res.json()
  return data.meals || []
}

export async function buscarPorPais(pais) {
  const res = await fetch(`${apiBase}/filter.php?a=${encodeURIComponent(pais)}`)
  const data = await res.json()
  return data.meals || []
}

export async function buscarReceitaPorId(id) {
  const res = await fetch(`${apiBase}/lookup.php?i=${encodeURIComponent(id)}`)
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}

export async function buscarAleatoria() {
  const res = await fetch(`${apiBase}/random.php`)
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}