import App from "../App"
import Home from "../views/Home"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import About from "@/views/About";

// 两种路由模式 BrowserRouter （history模式） HashRouter（Hash模式）

function baseRouter()  {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path={"/"} element={<Navigate to={"/home"}/>} ></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/about" element={<About/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default baseRouter