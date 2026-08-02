import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
<<<<<<< HEAD
import App from "./App"
=======
import App from "./App" 
>>>>>>> ffd72e46e1143de213ba889e97c7cb6e4b3acb64

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
