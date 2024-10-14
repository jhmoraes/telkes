import { useNavigate } from "react-router-dom"
import { goToHomePage } from "../../routes/coordinator"

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div>
      <br />
      <h1>Ops! Essa página não existe!</h1>
      <br />
      <button onClick={() => goToHomePage(navigate)} >Ir para Homepage</button>
    </div>
  )
}

export default NotFoundPage