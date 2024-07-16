import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthContextProvider } from './context/AuthContext'
import RootLayout from './layouts/RootLayout'
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App
