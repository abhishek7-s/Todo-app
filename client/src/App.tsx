import {BrowserRouter , Routes ,Route} from "react-router-dom"
import './App.scss'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Singin';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
