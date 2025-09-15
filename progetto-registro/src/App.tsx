import { BrowserRouter, Route, Routes } from 'react-router';
import { StartingPage } from './components/StartingPage';
import { Home } from './components/Home';
import './App.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartingPage/>} />
        <Route path="/login" element={<StartingPage/>} />
        <Route path="/signup" element={<StartingPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/profilo" element={<StartingPage/>} />
        <Route path="/studenti" element={<StartingPage/>} />
        <Route path="/registro" element={<StartingPage/>} />
        <Route path="/presenze" element={<StartingPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
