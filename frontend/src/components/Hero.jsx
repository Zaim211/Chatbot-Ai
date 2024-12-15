import { useRef, useState } from "react";
import { curve } from "../assets";
import dash from "../assets/dashbot.PNG";
import scan from "../assets/scanurl.png";
import bot from '../assets/genai.png'
import Button from "./Button";
import Section from "./Section";

const Hero = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [bot, dash, scan];

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: index * sliderWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    scrollToIndex(newIndex);
  };

  return (
    <Section
      className="pt-[8rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative">
        <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-32 items-center px-12 md:px-6">
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
            <Button href="/pricing" className="text-black hover:text-gray-700">
              Tester notre démo ConverBot
            </Button>
          </div>

          {/* Right Content - Image Slider */}
          <div className="w-full max-w-[300px] h-[500px] lg:max-w-[500px] relative">
            <div
              ref={sliderRef}
              className="flex overflow-hidden"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[500px] object-contain  flex-shrink-0"
                  style={{ scrollSnapAlign: "center" }}
                />
              ))}
            </div>
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-[#77be89] text-2xl text-white font-bold p-2 rounded-full"
            >
              &#8592;
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-12 top-1/2 transform -translate-y-1/2 text-2xl bg-[#77be89] text-white font-bold p-2 rounded-full"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
