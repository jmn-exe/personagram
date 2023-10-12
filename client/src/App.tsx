import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './App.css'

import Homepage from './pages/Homepage'
import PostView from './pages/PostView'
import Upload from './pages/Upload'

export default function App(){

  return(
    <>
    <div className='main-container'>
      <h1>PersonaGram</h1>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/post/:id' element={<PostView/>} />
        <Route path='/upload' element={<Upload/>} />
      </Routes>
    </div>
  </>
  )
}


