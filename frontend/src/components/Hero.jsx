import { curve } from "../assets";

import Button from "./Button";
import Section from "./Section";
import { useRef } from "react";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[8rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-52  items-center px-2 md:px-0">
          {/* Left Content */}
          <div className="relative z-1 mb-12 text-center lg:text-left lg:max-w-[60%]">
            <h1 className="h1 mb-6 text-[1.2rem] text-black leading-[2.2rem] md:text-[2rem] md:leading-[3rem]">
              Optimisez Votre Productivité
              <br />
              & Transformez l'Interaction <br /> Client avec{" "}
              <span className="inline-block relative">
                &nbsp;Botgeneration.AI
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  alt="Curve"
                />
              </span>
            </h1>
            <p className="body-1 text-sm md:text-base mb-6 text-black">
              Libérez le pouvoir de l'IA avec Botgeneration.AI <br /> Améliorez
              votre expérience utilisateur <br /> et optimisez votre service
              client grâce <br />à notre chatbot intelligent.
            </p>
            <Button href="/pricing" className="text-black  hover:text-gray-700">
              Tester notre démo ConverBot
            </Button>
          </div>

          {/* Right Content */}
          <div className="w-full max-w-[300px] mb-12 md:max-w-[300px]  lg:max-w-[400px] relative rounded-lg shadow-md">

        <img
          src="https://via.placeholder.com/500" // Replace with your image URL
          alt="Botgeneration Assistant"
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
  
        </div>
      </div>
    </Section>
  );
};

export default Hero;
