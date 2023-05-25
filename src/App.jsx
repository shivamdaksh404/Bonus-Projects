import './App.css'
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import Task from './pages/task/Task'

function App() {

  return (
      <div >


      <BrowserRouter>

<div className="NavBar">
  <Link to={'/'}><li>Home</li></Link>
  <Link to={'/task'}><li>Task</li></Link>
  <Link to={'/contactUs'}><li>Contact Us</li></Link>

</div>



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/contactUs' element={<Contact/>}/> 
        <Route path='/task' element={<Task/>}/> 
        <Route path='/*' element={<h1> 404 Page is Not found</h1>}/> 

      </Routes>

      </BrowserRouter>
     
      </div>
  )
}

export default App
