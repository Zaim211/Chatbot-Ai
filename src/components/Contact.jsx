import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import Section from "./Section";
import Heading from "./Heading";
import { service1 } from "../assets";
import Title from "./Title";

const Contact = () => {
  return (
    <Section id="contact" className="mt-12">
      <div className="absolute inset-0 bg-gradient-to-r from-[#c0cfc0] via-[#d3dfd3] to-[#F8F8FF] z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white z-0" />
      
      <div className="container relative z-2 grid grid-cols-1 md:grid-cols-2  gap-10">
        {/* Left Section with Image */}
        <div className="flex justify-center items-center">
          <img
            src={service1}
            alt="Service"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section with Contact Information */}
        <div className=" p-8 rounded-lg shadow-lg flex flex-col justify-center">
          <Title
            className="text-center mb-8"
            title="Contactez-nous"
          />
          <div className="space-y-6">
            {/* Company Information */}
            <div>
              <h5 className="text-2xl font-bold text-n-1">Notre Adresse</h5>
              <p className="text-n-3">123 Rue de l'Innovation, Paris, France</p>
            </div>
            <div>
              <h5 className="text-2xl font-bold text-n-1">Téléphone</h5>
              <p className="text-n-3">+33 1 23 45 67 89</p>
            </div>
            <div>
              <h5 className="text-2xl font-bold text-n-1">Email</h5>
              <p className="text-n-3">contact@converbot.com</p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-6 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-n-3 hover:text-primary"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-n-3 hover:text-primary"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-n-3 hover:text-primary"
              >
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
              <a
                href="https://microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-n-3 hover:text-primary"
              >
                <FontAwesomeIcon icon={faMicrosoft} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
