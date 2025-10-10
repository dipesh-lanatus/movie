import {Home} from './pages/Home'
import {Edit} from './pages/Edit'
import { Route, Routes } from 'react-router-dom'
import {MovieDetail} from './pages/MovieDetail'
import {OutletComponent} from './pages/Outlet'
import { useContext, useEffect } from 'react'
import { MovieContext } from './context/movie.context'

export function App() {

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
