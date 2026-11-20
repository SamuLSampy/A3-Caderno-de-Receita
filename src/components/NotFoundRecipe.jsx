import { Link } from "react-router-dom";

function NotFoundRecipe() {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get("q") || null;

    return(
        <div className="not-found-recipe">
            <h1>Nenhuma receita encontrada</h1>
            {searchQuery ? <p>Não encontramos receitas para "{searchQuery}". Dica: os títulos da API TheMealDB estão em inglês.</p> : <p>Não encontramos receitas para os filtros atuais.</p>}
            <Link to="/"><button>Limpar filtros</button></Link>
        </div>
    )
}

export default NotFoundRecipe