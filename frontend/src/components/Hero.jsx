import { curve } from "../assets";
// import aimobile from "../../src/assets/aimobile.png";
import Button from "./Button";
import Section from "./Section";
import heroai from "../../src/assets/heroai.png";

const Hero = () => {
  return (
    <Section
      className="pt-8 md:pt-20 md:px-2"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative lg:mt-8 mb-16">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:gap-2 md:px-2">
          {/* Left Content
          <div className="text-center  lg:text-left w-full lg:w-1/2 sm:px-2">
            <h1 className="text-black block text-[1.3rem] md:text-[2rem] leading-[2rem] md:leading-[3rem] font-bold mb-4">
              Optimisez Votre Productivité
              <span className="hidden lg:inline">
                <br />
              </span>
              & Transformez l'Interaction
              <span className="hidden lg:inline">
                <br />
              </span>
              Client avec
              <span className="relative inline-block">
                &nbsp;<span className="text-[#77be89]">Leads</span>Generation.
                <span className="text-[#77be89]">AI</span>
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  alt="Curve"
                />
              </span>
            </h1>
            <p className="text-black  text-md md:text-lg mb-6 px-auto leading-relaxed">
              Libérez le pouvoir de l'IA avec{" "}
              <strong className="text-[#5ba85b]">LeadsGeneration.AI</strong>{" "}
              <span className="hidden lg:inline">
                <br />
              </span>
              Améliorez votre expérience utilisateur et optimisez
              <span className="hidden lg:inline">
                <br />
              </span>
              votre service client grâce à notre chatbot intelligent.
            </p>
            <Button
              href="/"
              className="bg-[#77be89] text-white py-2 px-4 rounded hover:bg-[#5ea76c]"
            >
              Tester notre démo ConverBot
            </Button>
          </div> */}
{/* Left Content */}
<div className="text-center lg:text-left w-full lg:w-1/2 sm:px-2">
  <h1 className="text-black block text-[1.1rem] sm:text-[1.2rem] md:text-[1.5rem] lg:text-[2rem] leading-[1.5rem] sm:leading-[1.8rem] md:leading-[2rem] lg:leading-[3rem] font-bold mb-4">
    Optimisez Votre Productivité
    <span className="hidden lg:inline">
      <br />
    </span>
    & Transformez l'Interaction
    <span className="hidden lg:inline">
      <br />
    </span>
    Client avec
    <span className="relative inline-block">
      &nbsp;<span className="text-[#77be89]">Leads</span>Generation.
      <span className="text-[#77be89]">AI</span>
      <img
        src={curve}
        className="absolute top-full left-0 w-full xl:-mt-2"
        alt="Curve"
      />
    </span>
  </h1>
  <p className="text-black text-sm sm:text-md md:text-lg mb-6 px-auto leading-relaxed">
    Libérez le pouvoir de l'IA avec{" "}
    <strong className="text-[#5ba85b]">LeadsGeneration.AI</strong>{" "}
    <span className="hidden lg:inline">
      <br />
    </span>
    Améliorez votre expérience utilisateur et optimisez
    <span className="hidden lg:inline">
      <br />
    </span>
    votre service client grâce à notre chatbot intelligent.
  </p>
  <Button
    href="/"
    className="bg-[#77be89] text-white py-2 px-4 rounded hover:bg-[#5ea76c]"
  >
    Tester notre démo ConverBot
  </Button>
</div>

          {/* Right Content - Image */}
          <div className="w-full lg:w-1/2 lg:mb-0 mb-4 flex justify-center">
            <img
              src={heroai}
              alt="Botgeneration Assistant"
              className="w-full lg:h-[380px] h-[300px] object-contain"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;




