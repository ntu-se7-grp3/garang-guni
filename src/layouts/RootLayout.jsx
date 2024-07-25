import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <>
      <Header />
      <div style={{ marginTop: "150px"}}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootLayout;
