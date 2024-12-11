import React from "react";
import Section from "./Section";

const About = () => {
  return (
    <Section className="flex mt-6 flex-col lg:flex-row items-center lg:items-start justify-between px-20 lg:px-32 py-10">
      {/* Image Section */}
      <div className="w-full max-w-[300px] mb-12 md:max-w-[300px]  lg:max-w-[400px] relative rounded-lg shadow-md">
        <img
          src="https://via.placeholder.com/500" // Replace with your image URL
          alt="Botgeneration Assistant"
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 lg:pl-10 text-black">
        <h1 className="text-3xl lg:text-4xl font-bold mb-6">Pourquoi Nous ?</h1>
        <p className="text-xl lg:text-xl font-semibold mb-4">
          Décuplez vos taux de transformation de leads.
        </p>
        <p className="text-lg leading-relaxed">
          Accélérez le processus de vente grâce à l'assistant personnel{" "}
          <strong>Botgeneration.ia</strong> exclusivement conçu pour les
          conseillers qui contactent les leads, les conseille en temps réel en
          leur indiquant les bonnes pratiques à suivre face à un prospect en
          ligne. Transformez vos conversations en ventes potentielles.
        </p>
      </div>
    </Section>
  );
};

export default About;
