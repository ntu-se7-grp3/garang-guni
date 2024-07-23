import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Follow from "./pages/Follow";
import Jobs from "./pages/Jobs";
import TermsAndCondition from "./pages/TermsAndCondition";
import BookNow from "./pages/BookNow";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Schedule from "./pages/Schedule";
import { AuthContextProvider } from "./context/AuthContext";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Welcome />} />
            <Route path="book" element={<BookNow />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<Faq />} />
            <Route path="follow" element={<Follow />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="list" element={<List />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="terms-and-condition" element={<TermsAndCondition />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
