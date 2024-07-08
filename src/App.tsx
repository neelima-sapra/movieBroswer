import { Home } from "./pages/Home/Home"

{
  /* To include bootstrap css */
}
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.scss"

const App = () => {
  return (
    <div className="App">
      <Home />
    </div>
  )
}

export default App
