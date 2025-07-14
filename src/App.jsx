import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFound';
import SinglePokemon from './pages/SinglePokemon';
import Types from './pages/Types';
import Navbar from './components/Navbar';
import SingleType from './components/types/SingleType';
import WorldMap from './pages/WorldMap';
import SingleRegion from './pages/SingleRegion';
import ScrollToTop from './components/layout/ScrollToTop';
import SingleLocation from './pages/SingleLocation';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/pokemon/:id' element={<SinglePokemon />} />
          <Route path='/types' element={<Types />} />
          <Route path='/types/:type_name' element={<SingleType />} />
          <Route path="/types/:type_name/*" element={<NotFoundPage />} />
          <Route path='/regions' element={<WorldMap />} />
          <Route path='/regions/:region_name' element={<SingleRegion />} />
          <Route path='/regions/:region_name/:location_name' element={<SingleLocation />} />
              {/* <Route path='/favourites' element={<FavouritePage/>}/> */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
