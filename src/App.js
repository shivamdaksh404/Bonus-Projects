import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddFav from './pages/AddFav Page/AddFav';
import Home from './pages/Home Page/Home';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/fav' element={<AddFav/>}/>
    </Routes>
    </div>
  );
}

export default App;
