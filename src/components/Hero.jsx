import { curve, robot } from "../assets";
import brain from "../assets/brain.mp4";
import Button from "./Button";
import Section from "./Section";
import { useRef } from "react";
import { cover, boot } from "../assets";



const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      // className="pt-[8rem] bg-[#228B22] -mt-[4rem]"
      className="pt-[8rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        
        <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-36 items-center px-4 md:px-12">
          {/* Left Content */}
          <div className="relative z-1 mb-12 text-center lg:text-left lg:max-w-[50%]">
            
            <h1 className="h1 mb-6 text-[1.2rem] text-black leading-[2.2rem] md:text-[2rem] md:leading-[3rem]">
              Optimisez Votre Productivité
              <br />
              & Transformez l'Interaction <br /> Client avec{" "}
              <span className="inline-block relative">
                &nbsp;AIChat&nbsp;Ledz
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  alt="Curve"
                />
              </span>
            </h1>
            <p className="body-1 text-sm md:text-base mb-6 text-black">
              Libérez le pouvoir de l'IA avec ConverBot. <br /> Améliorez votre
              expérience utilisateur <br /> et optimisez votre service client 
              grâce <br />à notre chatbot intelligent.
            </p>
            <Button href="/pricing" className="text-black  hover:text-gray-700">
              Tester notre démo ConverBot
            </Button>
          </div>

          {/* Right Content */}
          <div className="w-full max-w-[300px] mb-12 md:max-w-[400px]  lg:max-w-[500px] relative rounded-lg shadow-md">
            <div className="rounded-lg overflow-hidden">
              <video
                className="w-full h-[200px] md:h-[250px] lg:h-[350px] rounded-md object-contain"
                controls
                poster={boot}
              >
                <source src={brain} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>
          </div>
        </div>

        {/* Robot Section */}
        {/* <div className="relative max-w-[26rem] mx-auto mt-12 md:max-w-6xl xl:mb-2">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
          <div className="relative bg-n-8 rounded-[1rem]">
          <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />
          <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
          <img
          src={robot}
          className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
          alt="AI"
          />
          </div>
          </div>
          </div>
          </div> */}
          </div>
      
    </Section>
  );
};

export default Hero;
