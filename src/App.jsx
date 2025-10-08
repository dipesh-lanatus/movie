import Home from './pages/Home'
import Edit from './pages/Edit'
import { Route, Routes } from 'react-router-dom'
import MovieDetail from './pages/MovieDetail'
import OutletComponent from './pages/Outlet'
import { useContext, useEffect } from 'react'
import { MovieContext } from './context/movie.context'

function App() {
  const { isDarkMode, setIsDarkMode } = useContext(MovieContext);

  useEffect(() => {
    const storedValue = localStorage.getItem('darkMode');
    setIsDarkMode(storedValue === 'true');
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode
      ? 'bg-gray-800 text-white'
      : 'bg-white/80 text-gray-700';

    localStorage.setItem('darkMode', isDarkMode); 
  }, [isDarkMode]);
  return (
    <div>
      <Routes>
        <Route element={<OutletComponent />}>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetail />} />
          <Route path='/edit' element={<Edit />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
