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
                    <input type="text" placeholder="Ex: Brazil, Italian..." />
                </div>
            </div>
            <p className="text-gray">Dica: a base TheMealDB indexa títulos em inglês (ex.: chicken, pasta, cake).</p>
            <div className="filters-containers">
                <p>Filtrar por categoria</p>
                <div className="filters-buttons">
                    <button className="filter-button">Todas</button>
                    <button className="filter-button">Carne bovina</button>
                    <button className="filter-button">Frango</button>
                    <button className="filter-button">Sobremesas</button>
                    <button className="filter-button">Massas</button>
                    <button className="filter-button">Frutos do mar</button>
                    <button className="filter-button"> Vegetariano</button>
                    <button className="filter-button">Vegano</button>
                    <button className="filter-button">Café da manhã</button>
                </div>
            </div>
        </div>
    )
}

export default Search