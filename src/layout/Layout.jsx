import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function ({ children }) {
  return (
    <>
      <Navbar />
      <div className="container px-5 md:px-10 mx-auto min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
