import { Info } from 'lucide-react'

function ErrorMessage({title, message}) {

    function reloadPage() {
        window.location.reload()
    }
  return (
    <div className="error-message">
        <Info />
        <h1>{title}</h1>
        <p>{message}</p>
        <button onClick={reloadPage}>Tente Novamente</button>
    </div>
  )
}

export default ErrorMessage