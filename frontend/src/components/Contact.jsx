import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faMicrosoft,

} from "@fortawesome/free-brands-svg-icons"; // Import the needed icons
import Section from "./Section";
import Title from "./Title";
import Button from "./Button";
import { service1 } from "../assets";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { smallSphere, stars } from "../assets";

const Contact = () => {
  return (
    <Section id="contact" className="mt-12 bg-gradient-to-b from-gray-50 to-white py-12">
       <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>
      <Title
        className="text-center max-w-2xl mx-auto"
        title="Contact"
        text="Pour toute question ou assistance, n'hésitez pas à nous contacter via notre formulaire en ligne ou par email. Nous sommes là pour vous aider !"
      />

      <div className="container  mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
  
        <div className="flex justify-center items-center">
          <img
            src={service1}
            alt="Service"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

 
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-center space-y-8">
  
          <div className="space-y-4">
            <div>
              <h5 className="text-xl font-semibold text-black">Notre Adresse</h5>
              <p className="text-gray-600">123 Rue de l'Innovation, Paris, France</p>
            </div>
            <div>
              <h5 className="text-xl font-semibold text-black">Téléphone</h5>
              <p className="text-gray-600">+33 1 23 45 67 89</p>
            </div>
            <div>
              <h5 className="text-xl font-semibold text-black">Email</h5>
              <p className="text-gray-600">botgeneration.ai@gmail.com</p>
            </div>
          </div>


          <div>
            <h5 className="text-xl font-semibold text-black mb-4">Suivez-nous</h5>
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/people/Botgenerationia/61569901421109/?mibextid=LQQJ4d&rdid=PaLOYCueA8SQzb1R&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19VpNpmHaX%2F%3Fmibextid%3DLQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-blue-600"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a
                href="https://www.instagram.com/botgeneration.ia/?igsh=YWVjNmNyb3FzeDMx&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600"
              >
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
              {/* <a
                href="https://microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faMicrosoft} size="2x" />
              </a> */}
            </div>
          </div>


          <div className="flex justify-start">
            <Button
              className="bg-green-600 text-white text-lg rounded-lg flex items-center  hover:bg-green-400 transition"
            >
              <span className="mr-2 font-semibold">Formulaire</span>
              <FontAwesomeIcon icon={faEnvelope} className="text-white" />
              
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
