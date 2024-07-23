import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "200px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
