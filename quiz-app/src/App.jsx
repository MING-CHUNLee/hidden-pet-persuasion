import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { QuizProvider } from './context/QuizContext'
import WelcomePage from './pages/WelcomePage'
import NicknamePage from './pages/NicknamePage'
import DoorPage from './pages/DoorPage'
import PetInteractionPage from './pages/PetInteractionPage'
import QuizPage from './pages/QuizPage'
import ResultPage from './pages/ResultPage'

function App() {
  const location = useLocation()

  return (
    <QuizProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/nickname" element={<NicknamePage />} />
          <Route path="/door" element={<DoorPage />} />
          <Route path="/pet" element={<PetInteractionPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </AnimatePresence>
    </QuizProvider>
  )
}

export default App
