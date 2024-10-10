import React from 'react'
import NavBar from './compont/NavBar'
import Home from './padges/Home'
import Move from './padges/Move'
import Series from './padges/Series'
import ContactUs from './padges/ContactUs'
import { Route, Routes } from 'react-router-dom'
import Footer from './compont/Footer'
import Details from './padges/Details'
import Collection from './padges/DetailsPadges/Collection'
import CastPage from './padges/DetailsPadges/CastPage'

function App() {
  return (
    <div>
<NavBar/>
<Routes>
          <Route path="/" element={<Home />} />
          <Route path="/move" element={<Move/> }/>
          <Route path="/series" element={<Series/> }/>
          <Route path="/contacus" element={<ContactUs/> }/>
          <Route path="/:Subject/:id/:name" element={<Details/> }/>
          <Route path="/collection/:collectionid" element={<Collection/> }/>
          <Route path='/:Subject/:id/:name/cast' element={<CastPage/>}/>
        </Routes>
<Footer/>

    </div>
  )
}

export default App