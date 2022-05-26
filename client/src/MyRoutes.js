import React from 'react'
import { Routes } from 'react-router'
import { Route } from 'react-router-dom'
import MainPage from './components/contents/MainPage/MainPage'
import Body2 from './components/contents/Body2/Body2'
import Body3 from './components/contents/Body3/Body3'
import AddNewNovel from './components/functionality/AddNewNovel/AddNewNovel'
import Novel from './components/contents/Novel/Novel'
import EditNovel from './components/functionality/EditNovel/EditNovel'
import { Navigate } from 'react-router-dom'
import NovelChapter from './components/contents/NovelChapter/NovelChapter'
import AddNewChapter from './components/functionality/AddNewChapter/AddNewChapter'
import EditChapter from './components/functionality/EditChapter/EditChapter'

function MyRoutes() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/add' element={<AddNewNovel />} />
      <Route path='/add/:id' element={<AddNewChapter />} />
      <Route path='/novels/:id' element={<Novel />} />
      <Route path='/novels/:id/:chapter' element={<NovelChapter />} />
      <Route path='/update/:id' element={<EditNovel />} />
      <Route path='/update/:id/:_id' element={<EditChapter />} />
      <Route path='/redirect' element={<Navigate to="/" />} />
      <Route path='/c' element={<Body3 />} />
    </Routes>
  )
}

export default MyRoutes