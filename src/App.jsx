import React from 'react'
import NavBar from './compont/NavBar'
import Home from './padges/Home'
import Move from './padges/Move'
import Series from './padges/Series'
import CpntactUs from './padges/CpntactUs'
import { Route, Routes } from 'react-router-dom'
import Footer from './compont/Footer'

function App() {
  return (
    <div>
<NavBar/>
<h1>hhhh</h1>
<Routes>
          <Route path="/" element={<Home />} />
          <Route path="/move" element={<Move/> }/>
          <Route path="/series" element={<Series/> }/>
          <Route path="/cpntacus" element={<CpntactUs/> }/>
        </Routes>
<Footer/>

    </div>
  )
}

export default App