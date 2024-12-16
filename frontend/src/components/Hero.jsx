import { curve } from "../assets";
import aimobile from "../../src/assets/aimobile.png";
import Button from "./Button";
import Section from "./Section";

const Hero = () => {
  return (
       <Section
       className="pt-8 md:pt-20"
       crosses
       crossesOffset="lg:translate-y-[5.25rem]"
       customPaddings
       id="hero"
     >
    <div className="container relative lg:mt-8 mb-16">
    <div className="flex flex-col-reverse lg:flex-row  lg:gap-2 items-center  md:px-6">
          {/* Left Content */}
          <div className="text-center lg:text-left w-full lg:w-1/2  sm:px-6">
            <h1 className="text-black text-[1.3rem] md:text-[2rem] leading-[2rem] md:leading-[3rem] font-bold mb-4">
              Optimisez Votre Productivité
              <br />& Transformez l'Interaction <br /> Client avec 
              <span className="relative inline-block">
                &nbsp;Botgeneration.AI
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  alt="Curve"
                />
              </span>
            </h1>
            <p className="text-black text-sm md:text-lg mb-6 leading-relaxed">
              Libérez le pouvoir de l'IA avec Botgeneration.AI <br />
              Améliorez votre expérience utilisateur et optimisez<br /> votre
              service client grâce à notre chatbot intelligent.
            </p>
            <Button href="/pricing" className="bg-[#77be89] text-white py-2 px-4 rounded hover:bg-[#5ea76c]">
              Tester notre démo ConverBot
            </Button>
          </div>

          {/* Right Content - Image */}
          <div className="w-full  lg:w-1/2 flex justify-center">
            <img
              src={aimobile}
              alt="Botgeneration Assistant"
              className="w-full lg:h-[400px] object-contain"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
