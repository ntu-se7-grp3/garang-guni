import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <div>
      <Header />
      {/* the outlet content keep display behind the header */}
      <main style={{ paddingTop: "200px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
