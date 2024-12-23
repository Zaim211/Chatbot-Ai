// import React from "react";
// import Section from "./Section";

// import aibotgen from "../../src/assets/aibotgen.png";

// const About = () => {
//   return (
//     <Section className="flex mt-6 flex-col lg:flex-row items-center lg:items-start justify-between px-4 lg:px-32 py-10">
//       {/* Image Section */}
//       <div className="w-full mb-12 md:max-w-[300px]  lg:max-w-[600px] relative">
//         <img
//          src={aibotgen}
//           alt="Botgeneration Assistant"
//           className="w-full h-full"
//         />
//       </div>

//       {/* Content Section */}
//       <div className="w-full text-center lg:w-1/2 lg:pl-10 text-black">
//         <h1 className="text-3xl lg:text-4xl font-bold mb-6">Pourquoi Nous ?</h1>
//         <p className="text-xl lg:text-xl font-semibold mb-4">
//           Décuplez vos taux de transformation de leads.
//         </p>
//         <p className="text-lg leading-relaxed">
//           Accélérez le processus de vente grâce à l'assistant personnel{" "}
//           <strong>Botgeneration.ia</strong> exclusivement conçu pour les
//           conseillers qui contactent les leads, les conseille en temps réel en
//           leur indiquant les bonnes pratiques à suivre face à un prospect en
//           ligne. Transformez vos conversations en ventes potentielles.
//         </p>
//       </div>
//     </Section>
//   );
// };

// export default About;
import React from "react";
import Section from "./Section";
import aibotgen from "../../src/assets/aibotgen.png";

const About = () => {
  return (
    <Section className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 md:px-10 lg:px-32 py-10 space-y-8 lg:space-y-0">
      {/* Image Section */}
      <div className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[600px]">
        <img
          src={aibotgen}
          alt="Botgeneration Assistant - Enhance Your Sales"
          className="w-full h-auto object-contain mx-auto"
        />
      </div>

      {/* Content Section */}
      <div className="w-full text-center lg:text-left lg:w-1/2 text-black space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Pourquoi Nous ?
        </h1>
        <p className="text-lg md:text-xl font-semibold">
          Décuplez vos taux de transformation de leads.
        </p>
        <p className="text-base md:text-lg leading-relaxed">
          Accélérez le processus de vente grâce à l'assistant personnel{" "}
          <strong className="text-[#5ba85b]">Leadsgeneration.AI</strong> exclusivement conçu pour les
          conseillers qui contactent les leads, les conseille en temps réel en
          leur indiquant les bonnes pratiques à suivre face à un prospect en
          ligne. Transformez vos conversations en ventes potentielles.
        </p>
      </div>
    </Section>
  );
};

export default About;
