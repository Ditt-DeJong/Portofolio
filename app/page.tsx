import CustomCursor from "../components/ui/CustomCursor";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Intro from "../components/sections/Intro";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Kitchen from "../components/sections/Kitchen";
import Achievements from "../components/sections/Achievements";
import SousChef from "../components/features/SousChef";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-[#F5F5DC] selection:text-[#14213D]">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Intro />
        <About />
        <Projects />
        <Kitchen /> 
        <Achievements />
      </main>
      
      <SousChef /> 
      <Footer />
    </div>
  );
}
