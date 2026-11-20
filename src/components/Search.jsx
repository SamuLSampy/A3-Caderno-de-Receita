import { useState } from 'react'
import {verifiedAreas} from '../services/mealApi'
import {categoryLabels} from '../services/mealApi'

function Search({query, category, area, onSearch, onCategoryChange, onAreaChange}){
    const [text, setText] = useState(query || '')

    function handleSubmit(e) {
        e.preventDefault()
        onSearch(text.trim())
    }

    return(
        <div className="search-and-filters">
            <div className="search-container">
                <p>Buscar receita por nome</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                    <button type="submit">Buscar</button>
                </form>
            </div>
            <div className="origin-container">
                <p>Culinária / Origem</p>
                <div>
                    <select value={area} onChange={(e) => onAreaChange(e.target.value)}>
                        <option value="">Todas as culinárias</option>
                        {verifiedAreas.map((areaName) => (
                            <option key={areaName} value={areaName}>
                                {areaName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <p className="text-gray">Dica: a base TheMealDB indexa títulos em inglês (ex.: chicken, pasta, cake).</p>
            <div className="filters-containers">
                <p>Filtrar por categoria</p>
                <div className="filters-buttons">
                    <button key="all" className={`filter-button ${category === '' ? 'active' : ''}`} onClick={() => onCategoryChange('')}>Todas</button>
                    {
                        Object.entries(categoryLabels).map(([key, label]) => (
                            <button key={key} className={`filter-button ${category === key ? 'active' : ''}`} onClick={() => onCategoryChange(key)}>
                                {label}
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Search