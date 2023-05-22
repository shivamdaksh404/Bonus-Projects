import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import Task from './pages/task/Task'

function App() {

  return (
      <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/contactUs' element={<Contact/>}/> 
        <Route path='/task' element={<Task/>}/> 
      </Routes>

      </BrowserRouter>
     
      </div>
  )
}

export default App
