import { Routes, Route } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Chatbot from "./components/Chatbot";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
      <div className="pt-[4.75rem] lg:pt-[0.25rem] overflow-hidden">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Benefits />
                <Faq />
                <Contact />
                <Footer />
                <Chatbot />
              </>
            }
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/Blog/:title" element={<BlogDetails />} />
        </Routes>
        <ButtonGradient />
        
      </div>
  );
};

export default App;
