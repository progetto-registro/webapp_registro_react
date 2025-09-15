import { BrowserRouter, Route, Routes } from 'react-router';
import { StartingPage } from './components/StartingPage';
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartingPage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
