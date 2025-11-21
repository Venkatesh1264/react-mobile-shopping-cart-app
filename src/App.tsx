import './App.css';
import MobileDashboard from './components/dashboard/mobile-dashboard'
import { Routes, Route, Link } from 'react-router-dom';
import Products from './components/products/products';
import Blog from './components/blog/blog';
import Pricing from './components/pricing/pricing';
import MobileSummary from './components/dashboard/mobile-summary';
import CartSummary from './components/dashboard/cart-summary';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MobileDashboard />} />
        <Route path="/dashboard" element={<MobileDashboard />} />
        <Route path= "/products" element={<Products/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/summary" element={<MobileSummary/>}/>
        <Route path='/cart-summary' element={<CartSummary/>}/>
      </Routes>
    </div>
  );
}

export default App;
