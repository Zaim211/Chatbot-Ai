import Section from "./Section";
import Heading from "./Heading";
import { service2, check, bénéfite } from "../assets";
import { brainwaveServices } from "../constants";
import Title from "./Title";

const Services = () => {
  return (
    <Section id="Comment-fonctionne" className="h-full relative">
      {/* Horizontal Gradient */}

      <div className="relative z-10 container">
        <Title
          title="Comment fonctionne notre Chatbot ?"
          text="Intégrez facilement notre chatbot intelligent sur votre site web pour générer des prospects"
          className="md:max-w-md text-black lg:max-w-2xl text-center lg:text-xl text-md"
        />

        <div className="relative">
          <div className="relative z-10 flex flex-col lg:flex-row  lg:h-[32rem] p-6 lg:p-2 border border-n-1/10 rounded-3xl overflow-hidden gap-8">
            {/* Image on the left */}
            <div className="w-full lg:w-1/2">
              <img
                src={bénéfite}
                className="h-[100px] sm:h-[300px]  w-full object-contain rounded-md"
                width={630}
                height={750}
                alt="Chatbot intégré"
              />
              <ul className="body-2 mt-4">
                {brainwaveServices.map((item, index) => (
                  <li key={index} className="flex items-start py-4 px-6">
                    <img width={24} height={24} src={check} alt="Check" />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explanation about how the chatbot works on the right */}
            <div className="relative z-10 mt-2 w-full lg:w-1/2">
              <h1 className="md:max-w-md text-black mt-2 lg:max-w-2xl text-start mb-6 lg:text-2xl text-md">
                Comment fonctionne notre Chatbot ?
              </h1>

              <div className=" text-n-3">
                <p className="flex sm:flex-row items-start mb-6">
                  <span className="w-24 h-8 flex items-center justify-center rounded-full bg-[#228B22] text-white mr-4">
                    1
                  </span>
                  Notre chatbot utilise des scénarios préconfigurés pour
                  interagir avec vos visiteurs en temps réel. Il est conçu pour
                  répondre rapidement à leurs questions et les guider dans leurs
                  recherches d'informations.
                </p>

                <p className="flex sm:flex-row items-start mb-6">
                  <span className="w-20 h-8 flex items-center justify-center rounded-full bg-[#228B22] text-white mr-4">
                    2
                  </span>
                  Il peut orienter les utilisateurs vers les informations
                  pertinentes en fonction des scénarios définis, assurant ainsi
                  une expérience fluide et efficace pour chaque visiteur.
                </p>

                <p className="flex sm:flex-row items-start">
                  <span className="w-20 lg:w-20 h-8 flex items-center justify-center rounded-full bg-[#228B22] text-white mr-4">
                    3
                  </span>
                  Notre chatbot peut aussi prendre en charge la génération de
                  prospects, en recueillant les informations clés et en les
                  envoyant directement dans votre tableau de bord.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Services;
