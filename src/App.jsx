import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Welcome from "./pages/Welcome";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Follow from "./pages/Follow";
import Jobs from "./pages/Jobs";
import Auth from "./pages/Auth/Auth";
import BookNow from "./pages/BookNow";
import List from "./pages/List";
import Schedule from "./pages/Schedule";

import { UserContextProvider } from "./context/user-context";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Welcome />} />
            <Route path="auth" element={<Auth />} />
            <Route path="book" element={<BookNow />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<Faq />} />
            <Route path="follow" element={<Follow />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="list" element={<List />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="terms-and-privacy" element={<TermsAndPrivacy />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
