import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Gallery from './pages/Gallery'
import Pricing from './pages/Pricing'
import PricingCategory from './pages/PricingCategory'
import Bio from './pages/Bio'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pricing/:slug" element={<PricingCategory />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App