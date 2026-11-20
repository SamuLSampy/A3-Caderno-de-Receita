import {verifiedAreas} from '../services/mealApi'
import {categoryLabels} from '../services/mealApi'

function Search(){
    return(
        <div className="search-and-filters">
            <div className="search-container">
                <p>Buscar receita por nome</p>
                <div>
                    <input type="text" />
                    <button>Buscar</button>
                </div>
            </div>
            <div className="origin-container">
                <p>Culinária / Origem</p>
                <div>
                    <select>
                        <option value="all">Todas as culinárias</option>
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
                    <button className="filter-button">Todas</button>
                    {
                        Object.entries(categoryLabels).map(([key, label]) => (
                            <button key={key} className="filter-button">
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