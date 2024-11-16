import Section from "./Section";
import Heading from "./Heading";
import { service2, check } from "../assets";
import { brainwaveServices } from "../constants";
import { PhotoChatMessage, Gradient } from "./design/Services";
import Generating from "./Generating";

const Services = () => {
  return (
    <Section id="Comment-fonctionne">
      <div className="container">
        <Heading
          title="Comment fonctionne notre Chatbot ?"
          text="Intégrez facilement notre chatbot intelligent sur votre site web pour générer des prospects"
        />

        <div className="relative">
          <div className="relative z-1 flex items-center lg:h-[46rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20">
            {/* Image on the left */}
            <div className="relative z-1 w-1/2">
              <img
                src={service2}
                className="h-full w-full object-cover rounded-md"
                width={630}
                height={750}
                alt="Chatbot intégré"
              />
            </div>

            {/* Explanation about how the chatbot works on the right */}
            <div className="relative z-1 w-1/2 pl-8">
              <h4 className="h4 mb-4 mt-2">Comment fonctionne notre Chatbot ?</h4>

              <div className="mb-[3rem] text-n-3">
                <p className="flex items-center mb-[3rem]">
                  <span className="w-20 h-8 flex items-center justify-center rounded-full bg-purple-700 text-white mr-4">
                    1
                  </span>
                  Notre chatbot utilise des scénarios préconfigurés pour
                  interagir avec vos visiteurs en temps réel. Il est conçu pour
                  répondre rapidement à leurs questions et les guider dans leurs
                  recherches d'informations.
                </p>

                <p className="flex items-center mb-[3rem]">
                  <span className="w-20 h-8 flex items-center justify-center rounded-full bg-purple-700 text-white mr-4">
                    2
                  </span>
                  Il peut orienter les utilisateurs vers les informations
                  pertinentes en fonction des scénarios définis, assurant ainsi
                  une expérience fluide et efficace pour chaque visiteur.
                </p>

                <p className="flex items-center">
                  <span className="w-20 h-8 flex items-center justify-center rounded-full bg-purple-700 text-white mr-4">
                    3
                  </span>
                  Notre chatbot peut aussi prendre en charge la génération de
                  prospects, en recueillant les informations clés et en les
                  envoyant directement dans votre tableau de bord.
                </p>
              </div>

              <ul className="body-2">
                {brainwaveServices.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
