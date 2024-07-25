import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Welcome from "./pages/Welcome";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth/Auth";
import BookNow from "./pages/BookNow";
import List from "./pages/List";
import Schedule from "./pages/Schedule";

import { UserContextProvider } from "./context/user-context";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import PageNotFound from "./pages/PageNotFound";
import NotImplemented from "./pages/NotImplemented";

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
            <Route path="faq" element={<NotImplemented />} />
            <Route path="follow" element={<NotImplemented />} />
            <Route path="jobs" element={<NotImplemented />} />
            <Route path="manage" element={<NotImplemented />} />
            <Route path="profile" element={<NotImplemented />} />
            <Route path="setting" element={<NotImplemented />} />
            <Route path="list" element={<List />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="terms-and-privacy" element={<TermsAndPrivacy />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
