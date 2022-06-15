import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import MainPage from './components/contents/MainPage/MainPage'
import AddNewNovel from './components/functionality/AddNewNovel/AddNewNovel'
import Novel from './components/contents/Novels/Novel/Novel'
import EditNovel from './components/functionality/EditNovel/EditNovel'
import { Navigate } from 'react-router-dom'
import NovelChapter from './components/contents/Novels/Novel/NovelChapter/NovelChapter'
import AddNewChapter from './components/functionality/AddNewChapter/AddNewChapter'
import EditChapter from './components/functionality/EditChapter/EditChapter'
import Login from './components/authentication/Login/Login'
import Register from './components/authentication/Register/Register'
import DashBoard from './components/contents/DashBoard/DashBoard'
import UserCart from './components/contents/UserCart/UserCart'

function MyRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/cart' element={<UserCart />} />
      <Route path='/authentication' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<DashBoard />} />
      <Route path='/add' element={<AddNewNovel />} />
      <Route path='/add/:id' element={<AddNewChapter />} />
      <Route path='/novels/:id' element={<Novel />} />
      <Route path='/novels/:id/:chapter' element={<NovelChapter />} />
      <Route path='/update/:id' element={<EditNovel />} />
      <Route path='/update/:id/:_id' element={<EditChapter />} />
      <Route path='/redirect' element={<Navigate to="/" />} />
    </Routes>
  )
}

export default MyRoutes