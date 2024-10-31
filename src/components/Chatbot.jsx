import React, { useState, useEffect, useRef } from "react";
import botImage from "../assets/bot.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setChatVisible] = useState(false);
  const [currentScenario, setCurrentScenario] = useState("initial");
  const [userInfo, setUserInfo] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isBotResponded, setIsBotResponded] = useState(false);


  const chatContainerRef = useRef(null);

  const scenarios = {
    initial: {
      question:
        "Salut 👋, Bienvenue sur le chatbot de Lead-ia Academy. Je m’appelle Lydia et je suis ici pour t'aider avec toutes tes questions concernant l'université 😌. Pour commencer, pourrais-tu me dire qui tu es ?",
      options: [
        { label: "Étudiant 📚", next: "student" },
        { label: "Salarié en activité 💼", next: "job_seeker" },
        { label: "Demandeur d'emploi 🔎", next: "job_seeker" },
        { label: "Une entreprise 🏢", next: "company" },
        { label: "Un parent 👨‍👩‍👧‍👦", next: "parent" },
      ],
      botResponse: "Ok 🙂",
    },

    // Student Scenario
    student: {
      question:
        "Super ! Nos nouveaux élèves peuvent étudier sur 3 campus. Dis-moi lequel t’intéresse en priorité ?",
      options: [
        { label: "Paris", next: "choose_course" },
        { label: "Lyon", next: "choose_course" },
        { label: "Marseille", next: "choose_course" },
      ],
      botResponse: "D'accord 🙂",
    },
    choose_course: {
      question:
        "Clique sur le domaine de formation qui t’intéresse chez Lead-ia Academy",
      options: [
        { label: "COMMERCE & MARKETING", next: "course_details" },
        { label: "COMMUNICATION", next: "course_details" },
        { label: "INFORMATIQUE", next: "course_details" },
      ],
      botResponse: "Un excellent choix pour ta carrière 🎓",
    },
    course_details: {
      question: "Génial ! Quel type de diplôme souhaites-tu obtenir ?",
      options: [
        { label: "Licence", next: "duration" },
        { label: "Master", next: "duration" },
        { label: "Certificat", next: "duration" },
      ],
      botResponse: "Excellent choix 😊",
    },
    duration: {
      question: "Combien de temps es-tu prêt à consacrer à tes études ?",
      options: [
        { label: "Temps plein", next: "financial_aid" },
        { label: "Temps partiel", next: "financial_aid" },
      ],
      botResponse: "Parfait, je note cela !",
    },
    financial_aid: {
      question:
        "As-tu besoin d'informations sur les bourses ou l'aide financière ?",
      options: [
        { label: "Oui, je veux en savoir plus", next: "scholarships" },
        { label: "Non, merci", next: "request_email" },
      ],
      botResponse: "Je comprends. Parlons des options disponibles 🎓",
    },
    scholarships: {
      question: "Voici quelques options de bourses disponibles :",
      options: [
        { label: "Bourse d'excellence", next: "request_email" },
        { label: "Bourse pour étudiants étrangers", next: "request_email" },
        {
          label: "Bourse basée sur les besoins financiers",
          next: "request_email",
        },
      ],
      botResponse: "Ces options sont excellentes pour alléger les frais 💰",
    },

    // Job Seeker Scenario
    job_seeker: {
      question:
        "Bienvenue ! Cherchez-vous des programmes pour développer vos compétences ou explorer de nouvelles carrières ?",
      options: [
        { label: "Développer mes compétences", next: "choose_program" },
        { label: "Explorer de nouvelles carrières", next: "choose_program" },
      ],
      botResponse: "Excellent ! Nous avons plusieurs options pour vous 😊",
    },
    choose_program: {
      question: "Quel domaine de formation vous intéresse le plus ?",
      options: [
        { label: "Informatique", next: "job_course_details" },
        { label: "Management", next: "job_course_details" },
        { label: "Communication", next: "job_course_details" },
      ],
      botResponse: "Un choix judicieux pour faire évoluer votre carrière 📈",
    },
    job_course_details: {
      question: "Parfait ! Quel est votre niveau actuel dans ce domaine ?",
      options: [
        { label: "Débutant", next: "job_support" },
        { label: "Intermédiaire", next: "job_support" },
        { label: "Avancé", next: "job_support" },
      ],
      botResponse: "C'est toujours le bon moment pour progresser 💪",
    },
    job_support: {
      question:
        "Besoin d'assistance pour trouver des stages ou opportunités d'emploi ?",
      options: [
        {
          label: "Oui, je veux des informations sur les stages",
          next: "request_email",
        },
        { label: "Non, merci", next: "request_email" },
      ],
      botResponse: "Les stages peuvent offrir une expérience précieuse 📚",
    },

    // Company Scenario
    company: {
      question:
        "Bonjour ! Êtes-vous intéressé par la formation pour vos employés ou la collaboration sur des projets de recherche ?",
      options: [
        { label: "Formation pour employés", next: "employee_training" },
        { label: "Collaboration sur projets", next: "research_projects" },
      ],
      botResponse: "Nous avons d'excellentes options pour les entreprises ! 🤝",
    },
    employee_training: {
      question:
        "Quel domaine de formation souhaitez-vous offrir à vos employés ?",
      options: [
        { label: "Informatique", next: "training_details" },
        { label: "Gestion de projet", next: "training_details" },
        { label: "Communication", next: "training_details" },
      ],
      botResponse:
        "C'est une excellente initiative pour le développement de votre équipe !",
    },
    training_details: {
      question: "Souhaitez-vous des formations en ligne ou en présentiel ?",
      options: [
        { label: "En ligne", next: "training_format" },
        { label: "En présentiel", next: "training_format" },
      ],
      botResponse:
        "Les deux options sont très efficaces pour un apprentissage réussi !",
    },
    training_format: {
      question:
        "Avez-vous des préférences concernant la durée des formations ?",
      options: [
        { label: "Courtes (1-3 mois)", next: "request_email" },
        { label: "Longues (plus de 3 mois)", next: "request_email" },
      ],
      botResponse: "Une bonne durée peut vraiment maximiser l'apprentissage !",
    },
    research_projects: {
      question:
        "Quels types de projets de recherche souhaitez-vous explorer avec nous ?",
      options: [
        { label: "Technologie", next: "project_details" },
        { label: "Sciences sociales", next: "project_details" },
        { label: "Santé", next: "project_details" },
      ],
      botResponse:
        "Nous avons hâte de collaborer sur ces projets passionnants !",
    },
    project_details: {
      question: "Quel est le principal objectif de votre projet de recherche ?",
      options: [
        { label: "Développement de produits", next: "request_email" },
        { label: "Analyse de données", next: "request_email" },
        { label: "Recherche appliquée", next: "request_email" },
      ],
      botResponse:
        "C'est formidable de voir des entreprises investies dans la recherche !",
    },
    // Parent Scenario
    parent: {
      question:
        "Bonjour ! Souhaitez-vous obtenir des informations pour aider votre enfant à choisir une filière ou en savoir plus sur la vie étudiante ?",
      options: [
        { label: "Aider à choisir une filière", next: "program_interest" },
        { label: "Vie étudiante", next: "student_life" },
      ],
      botResponse:
        "C'est formidable que vous soyez impliqué dans l'éducation de votre enfant ! 👩‍👧",
    },
    program_interest: {
      question: "Quels domaines vous intéressent pour votre enfant ?",
      options: [
        { label: "Sciences", next: "program_details" },
        { label: "Commerce", next: "program_details" },
        { label: "Littérature", next: "program_details" },
        { label: "Arts", next: "program_details" },
        { label: "Ingénierie", next: "program_details" },
      ],
      botResponse:
        "Ces choix offrent de belles opportunités pour l'avenir de votre enfant !",
    },
    program_details: {
      question: "Quel type de diplôme cherchez-vous pour votre enfant ?",
      options: [
        { label: "Licence", next: "support_services" },
        { label: "Master", next: "support_services" },
        { label: "Certificat", next: "support_services" },
        { label: "DUT", next: "support_services" },
      ],
      botResponse:
        "C'est un bon investissement dans l'avenir de votre enfant !",
    },
    support_services: {
      question:
        "Aimeriez-vous en savoir plus sur les bourses disponibles pour aider au financement des études ?",
      options: [
        { label: "Oui, ça m'intéresse", next: "scholarships" },
        { label: "Non, merci", next: "request_email" },
      ],
      botResponse:
        "Les bourses peuvent faire une grande différence financièrement !",
    },
    scholarships: {
      question: "Voici quelques types de bourses disponibles :",
      options: [
        { label: "Bourse d'excellence", next: "excellence_details" },
        {
          label: "Bourse pour étudiants étrangers",
          next: "foreign_students_details",
        },
        {
          label: "Bourse basée sur les besoins financiers",
          next: "need_based_details",
        },
        { label: "Bourse de recherche", next: "research_grant_details" },
        { label: "Bourse sportive", next: "athletic_scholarship_details" },
        {
          label: "Bourse d'études professionnelles",
          next: "professional_studies_details",
        },
      ],
      botResponse:
        "Ces options peuvent vraiment aider à alléger les frais ! 💰",
    },
    excellence_details: {
      question:
        "Les bourses d'excellence sont attribuées en fonction des performances académiques. Souhaitez-vous des détails sur les critères d'éligibilité ?",
      options: [
        { label: "Oui, je veux en savoir plus", next: "request_email" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "C'est un excellent moyen de récompenser le travail acharné !",
    },
    foreign_students_details: {
      question:
        "Les bourses pour étudiants étrangers aident à couvrir les frais de scolarité pour les étudiants internationaux. Avez-vous besoin d'informations spécifiques sur le processus de demande ?",
      options: [
        { label: "Oui, je suis intéressé", next: "request_email" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "C'est une opportunité incroyable pour les étudiants internationaux !",
    },
    need_based_details: {
      question:
        "Les bourses basées sur les besoins financiers aident les étudiants dont les familles ont des difficultés économiques. Souhaitez-vous des conseils sur comment postuler ?",
      options: [
        { label: "Oui, donnez-moi des conseils", next: "request_email" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "Cela peut vraiment aider à rendre l'éducation accessible !",
    },
    research_grant_details: {
      question:
        "Les bourses de recherche soutiennent les étudiants qui souhaitent mener des projets de recherche. Souhaitez-vous en savoir plus sur les domaines couverts ?",
      options: [
        { label: "Oui, j'aimerais en savoir plus", next: "request_email" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "C'est une belle manière de contribuer à l'innovation !",
    },
    athletic_scholarship_details: {
      question:
        "Les bourses sportives récompensent les étudiants-athlètes pour leurs performances. Souhaitez-vous connaître les sports couverts ?",
      options: [
        { label: "Oui, je veux plus d'infos", next: "request_email" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "Le sport peut ouvrir des portes étonnantes pour les étudiants !",
    },
    professional_studies_details: {
      question:
        "Les bourses d'études professionnelles aident les étudiants dans des domaines spécifiques comme l'art, la musique ou le théâtre. Êtes-vous intéressé par ces programmes ?",
      options: [
        { label: "Oui, donnez-moi plus d'infos", next: "request_email" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "C'est une excellente voie pour les étudiants passionnés !",
    },

    request_email: {
      question: "S'il te plaît, entre ton email ci-dessous.",
      botResponse: "Merci pour l'information 📧",
      inputType: "text",
      next: "request_name",
    },
    request_name: {
      question: "S'il te plaît, entre ton nom ci-dessous.",
      botResponse: "D'accord, continuons !",
      inputType: "text",
      next: "request_phone",
    },
    request_phone: {
      question: "S'il te plaît, entre ton numéro de téléphone ci-dessous.",
      botResponse: "Parfait, merci !",
      inputType: "text",
      next: "final_response",
    },

    final_response: {
      question: "Merci pour l'information ! Nous vous contacterons bientôt.",
      options: [],
      botResponse:
        "Merci d'avoir pris le temps de discuter avec moi, À bientôt ! 😊",
    },
  };
//   const handleInputSubmit = (field) => {
//     const userResponse = userInfo[field];
//     const botResponse = scenarios[currentScenario].botResponse;
  
//     // Add the user response to messages
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: userResponse, sender: "user" },
//     ]);
  
//     // Display bot typing indication
//     displayMessageWithTypingIndicator(botResponse, "bot");
  
//     // Get the next scenario
//     const nextScenario = scenarios[currentScenario].next;
  
//     // After a short delay, show the next question
//     if (nextScenario) {
//       setTimeout(() => {
//         displayMessageWithTypingIndicator(
//           scenarios[nextScenario].question,
//           "bot"
//         );
//         setCurrentScenario(nextScenario); // Move to the next scenario
//         setIsBotResponded(true); // Mark bot as responded
//       }, 1000);
//     }
    
//     // Clear the input after submitting
//     setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [field]: "" }));
//   };
  
const handleInputSubmit = () => {
    const userResponse = userInfo[scenarios[currentScenario].inputType];

    if (!userResponse) return; // Prevent submission if the input is empty

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userResponse, sender: "user" },
    ]);

    // Move to the next scenario after a delay
    const nextScenario = scenarios[currentScenario].next;
    displayMessageWithTypingIndicator(scenarios[nextScenario].question, "bot");

    setCurrentScenario(nextScenario); // Move to the next scenario

    // Clear the input after submitting
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [scenarios[currentScenario].inputType]: "" }));
  };


  const displayMessageWithTypingIndicator = (message, sender) => {
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (selectedOptionLabel, nextScenario) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: selectedOptionLabel, sender: "user" },
    ]);

    // Display typing indicator for the bot response
    displayMessageWithTypingIndicator(
      scenarios[currentScenario].botResponse,
      "bot"
    );

    // Show the next question after typing delay
    setTimeout(() => {
      displayMessageWithTypingIndicator(
        scenarios[nextScenario].question,
        "bot"
      );
      setCurrentScenario(nextScenario);
    }, 1000); // Adjust delay as needed
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([{ text: scenarios.initial.question, sender: "bot" }]);
  }, []);

  const toggleChatVisibility = () => {
    setChatVisible(!isChatVisible);
  };

  const closeChat = () => {
    setChatVisible(false);
  };


  return (
    <div>
      <div className="fixed bottom-4 z-50 right-4 flex items-center cursor-pointer">
        {isChatVisible ? (
          <button
            onClick={closeChat}
            className="text-gray-500 hover:text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <div className="flex items-center bg-white text-black shadow-lg rounded-lg p-4">
            <img src={botImage} alt="Bot Logo" className="w-16 h-16 mr-3" />
            <div>
              <span className="text-lg font-semibold">
                Bonjour 👋, besoin d'aide ? 😃
              </span>
              <p
                onClick={toggleChatVisibility}
                className={`text-sm mt-1 cursor-pointer text-center rounded-lg w-48 py-4 ${
                  isChatVisible
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } hover:bg-blue-500 hover:text-white`}
              >
                👉 Par ici la démo 😀
              </p>
            </div>
          </div>
        )}
      </div>

      {isChatVisible && (
        <div className="fixed bottom-16 right-4  bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-300 z-50">
          <div
            className="h-[400px] w-full overflow-y-auto flex flex-col space-y-2"
            ref={chatContainerRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src={botImage}
                    alt="Bot"
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div
                  className={`p-3 max-w-xs rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* {isTyping && (
              <div className="text-gray-500 font-bold pr-32">Bot est en train d'écrire...</div>
            )} */}
            {isTyping && (
        <div className="flex items-center">
          <img
            src={botImage}
            alt="Bot Typing"
            className="w-12 h-12 rounded-full mr-2" // Smaller image for typing indicator
          />
          <div className="text-gray-500 font-bold">Bot est en train d'écrire...</div>
        </div>
      )}

            <div className="mt-4 text-left">
              {!isTyping && scenarios[currentScenario].options && (
                <div className="flex flex-col items-end space-y-2">
                  {scenarios[currentScenario].options.map((option, index) => (
                    <button
                      key={index}
                      //   onClick={() => handleOptionClick(option.next)}
                      onClick={() =>
                        handleOptionClick(option.label, option.next)
                      }
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* {isBotResponded && scenarios[currentScenario].inputType && (
              <div className="mt-4 flex items-center justify-center">
                <input
                  type={scenarios[currentScenario].inputType}
                  placeholder={`Entrez votre ${
                    scenarios[currentScenario].inputType === "email"
                      ? "email"
                      : scenarios[currentScenario].inputType === "text"
                      ? "nom"
                      : "numéro de téléphone"
                  }`}
                  value={userInfo[scenarios[currentScenario].inputType] || ""} // Ensure you use an empty string if no value is set
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      [scenarios[currentScenario].inputType]: e.target.value,
                    })
                  }
                  className="border p-2 rounded-lg w-full"
                />
                <button
                  onClick={() =>
                    handleInputSubmit(scenarios[currentScenario].inputType)
                  }
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Envoyer
                </button>
              </div>
            )} */}
            {!isTyping && scenarios[currentScenario].inputType && (
              <div className="mt-4 flex items-center justify-center">
                <input
                  type={scenarios[currentScenario].inputType}
                  placeholder={`Entrez votre ${scenarios[currentScenario].inputType === "email" ? "email" : scenarios[currentScenario].inputType === "text" ? "nom" : "numéro de téléphone"}`}
                  value={userInfo[scenarios[currentScenario].inputType] || ""}
                  onChange={(e) => setUserInfo({ ...userInfo, [scenarios[currentScenario].inputType]: e.target.value })}
                  className="border p-2 rounded-lg w-full"
                />
                <button onClick={handleInputSubmit} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Envoyer</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;































// import React, { useState, useEffect, useRef } from "react";
// import botImage from "../assets/bot.png";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [isChatVisible, setChatVisible] = useState(false);
//   const [currentScenario, setCurrentScenario] = useState("initial");
//   const [userInfo, setUserInfo] = useState({ email: "", name: "", phone: "" });
//   const [isTyping, setIsTyping] = useState(false);

//   const chatContainerRef = useRef(null);

//   const scenarios = {
//     initial: {
//       question:
//         "Salut 👋, Bienvenue sur le chatbot de Lead-ia Academy. Je m’appelle Lydia et je suis ici pour t'aider avec toutes tes questions concernant l'université 😌. Pour commencer, pourrais-tu me dire qui tu es ?",
//       options: [
//         { label: "Étudiant 📚", next: "student" },
//         { label: "Salarié en activité 💼", next: "job_seeker" },
//         { label: "Demandeur d'emploi 🔎", next: "job_seeker" },
//         { label: "Une entreprise 🏢", next: "company" },
//         { label: "Un parent 👨‍👩‍👧‍👦", next: "parent" },
//       ],
//       botResponse: "Ok 🙂",
//     },

//     // Student Scenario
//     student: {
//       question:
//         "Super ! Nos nouveaux élèves peuvent étudier sur 3 campus. Dis-moi lequel t’intéresse en priorité ?",
//       options: [
//         { label: "Paris", next: "choose_course" },
//         { label: "Lyon", next: "choose_course" },
//         { label: "Marseille", next: "choose_course" },
//       ],
//       botResponse: "D'accord 🙂",
//     },
//     choose_course: {
//       question:
//         "Clique sur le domaine de formation qui t’intéresse chez Lead-ia Academy",
//       options: [
//         { label: "COMMERCE & MARKETING", next: "course_details" },
//         { label: "COMMUNICATION", next: "course_details" },
//         { label: "INFORMATIQUE", next: "course_details" },
//       ],
//       botResponse: "Un excellent choix pour ta carrière 🎓",
//     },
//     course_details: {
//       question: "Génial ! Quel type de diplôme souhaites-tu obtenir ?",
//       options: [
//         { label: "Licence", next: "duration" },
//         { label: "Master", next: "duration" },
//         { label: "Certificat", next: "duration" },
//       ],
//       botResponse: "Excellent choix 😊",
//     },
//     duration: {
//       question: "Combien de temps es-tu prêt à consacrer à tes études ?",
//       options: [
//         { label: "Temps plein", next: "financial_aid" },
//         { label: "Temps partiel", next: "financial_aid" },
//       ],
//       botResponse: "Parfait, je note cela !",
//     },
//     financial_aid: {
//       question:
//         "As-tu besoin d'informations sur les bourses ou l'aide financière ?",
//       options: [
//         { label: "Oui, je veux en savoir plus", next: "scholarships" },
//         { label: "Non, merci", next: "request_email" },
//       ],
//       botResponse: "Je comprends. Parlons des options disponibles 🎓",
//     },
//     scholarships: {
//       question: "Voici quelques options de bourses disponibles :",
//       options: [
//         { label: "Bourse d'excellence", next: "request_email" },
//         { label: "Bourse pour étudiants étrangers", next: "request_email" },
//         {
//           label: "Bourse basée sur les besoins financiers",
//           next: "request_email",
//         },
//       ],
//       botResponse: "Ces options sont excellentes pour alléger les frais 💰",
//     },

//     // Job Seeker Scenario
//     job_seeker: {
//       question:
//         "Bienvenue ! Cherchez-vous des programmes pour développer vos compétences ou explorer de nouvelles carrières ?",
//       options: [
//         { label: "Développer mes compétences", next: "choose_program" },
//         { label: "Explorer de nouvelles carrières", next: "choose_program" },
//       ],
//       botResponse: "Excellent ! Nous avons plusieurs options pour vous 😊",
//     },
//     choose_program: {
//       question: "Quel domaine de formation vous intéresse le plus ?",
//       options: [
//         { label: "Informatique", next: "job_course_details" },
//         { label: "Management", next: "job_course_details" },
//         { label: "Communication", next: "job_course_details" },
//       ],
//       botResponse: "Un choix judicieux pour faire évoluer votre carrière 📈",
//     },
//     job_course_details: {
//       question: "Parfait ! Quel est votre niveau actuel dans ce domaine ?",
//       options: [
//         { label: "Débutant", next: "job_support" },
//         { label: "Intermédiaire", next: "job_support" },
//         { label: "Avancé", next: "job_support" },
//       ],
//       botResponse: "C'est toujours le bon moment pour progresser 💪",
//     },
//     job_support: {
//       question:
//         "Besoin d'assistance pour trouver des stages ou opportunités d'emploi ?",
//       options: [
//         {
//           label: "Oui, je veux des informations sur les stages",
//           next: "request_email",
//         },
//         { label: "Non, merci", next: "request_email" },
//       ],
//       botResponse: "Les stages peuvent offrir une expérience précieuse 📚",
//     },

//     // Company Scenario
//     company: {
//       question:
//         "Bonjour ! Êtes-vous intéressé par la formation pour vos employés ou la collaboration sur des projets de recherche ?",
//       options: [
//         { label: "Formation pour employés", next: "employee_training" },
//         { label: "Collaboration sur projets", next: "research_projects" },
//       ],
//       botResponse: "Nous avons d'excellentes options pour les entreprises ! 🤝",
//     },
//     employee_training: {
//       question:
//         "Quel domaine de formation souhaitez-vous offrir à vos employés ?",
//       options: [
//         { label: "Informatique", next: "training_details" },
//         { label: "Gestion de projet", next: "training_details" },
//         { label: "Communication", next: "training_details" },
//       ],
//       botResponse:
//         "C'est une excellente initiative pour le développement de votre équipe !",
//     },
//     training_details: {
//       question: "Souhaitez-vous des formations en ligne ou en présentiel ?",
//       options: [
//         { label: "En ligne", next: "training_format" },
//         { label: "En présentiel", next: "training_format" },
//       ],
//       botResponse:
//         "Les deux options sont très efficaces pour un apprentissage réussi !",
//     },
//     training_format: {
//       question:
//         "Avez-vous des préférences concernant la durée des formations ?",
//       options: [
//         { label: "Courtes (1-3 mois)", next: "request_email" },
//         { label: "Longues (plus de 3 mois)", next: "request_email" },
//       ],
//       botResponse: "Une bonne durée peut vraiment maximiser l'apprentissage !",
//     },
//     research_projects: {
//       question:
//         "Quels types de projets de recherche souhaitez-vous explorer avec nous ?",
//       options: [
//         { label: "Technologie", next: "project_details" },
//         { label: "Sciences sociales", next: "project_details" },
//         { label: "Santé", next: "project_details" },
//       ],
//       botResponse:
//         "Nous avons hâte de collaborer sur ces projets passionnants !",
//     },
//     project_details: {
//       question: "Quel est le principal objectif de votre projet de recherche ?",
//       options: [
//         { label: "Développement de produits", next: "request_email" },
//         { label: "Analyse de données", next: "request_email" },
//         { label: "Recherche appliquée", next: "request_email" },
//       ],
//       botResponse:
//         "C'est formidable de voir des entreprises investies dans la recherche !",
//     },
//     // Parent Scenario
//     parent: {
//       question:
//         "Bonjour ! Souhaitez-vous obtenir des informations pour aider votre enfant à choisir une filière ou en savoir plus sur la vie étudiante ?",
//       options: [
//         { label: "Aider à choisir une filière", next: "program_interest" },
//         { label: "Vie étudiante", next: "student_life" },
//       ],
//       botResponse:
//         "C'est formidable que vous soyez impliqué dans l'éducation de votre enfant ! 👩‍👧",
//     },
//     program_interest: {
//       question: "Quels domaines vous intéressent pour votre enfant ?",
//       options: [
//         { label: "Sciences", next: "program_details" },
//         { label: "Commerce", next: "program_details" },
//         { label: "Littérature", next: "program_details" },
//         { label: "Arts", next: "program_details" },
//         { label: "Ingénierie", next: "program_details" },
//       ],
//       botResponse:
//         "Ces choix offrent de belles opportunités pour l'avenir de votre enfant !",
//     },
//     program_details: {
//       question: "Quel type de diplôme cherchez-vous pour votre enfant ?",
//       options: [
//         { label: "Licence", next: "support_services" },
//         { label: "Master", next: "support_services" },
//         { label: "Certificat", next: "support_services" },
//         { label: "DUT", next: "support_services" },
//       ],
//       botResponse:
//         "C'est un bon investissement dans l'avenir de votre enfant !",
//     },
//     support_services: {
//       question:
//         "Aimeriez-vous en savoir plus sur les bourses disponibles pour aider au financement des études ?",
//       options: [
//         { label: "Oui, ça m'intéresse", next: "scholarships" },
//         { label: "Non, merci", next: "request_email" },
//       ],
//       botResponse:
//         "Les bourses peuvent faire une grande différence financièrement !",
//     },
//     scholarships: {
//       question: "Voici quelques types de bourses disponibles :",
//       options: [
//         { label: "Bourse d'excellence", next: "excellence_details" },
//         {
//           label: "Bourse pour étudiants étrangers",
//           next: "foreign_students_details",
//         },
//         {
//           label: "Bourse basée sur les besoins financiers",
//           next: "need_based_details",
//         },
//         { label: "Bourse de recherche", next: "research_grant_details" },
//         { label: "Bourse sportive", next: "athletic_scholarship_details" },
//         {
//           label: "Bourse d'études professionnelles",
//           next: "professional_studies_details",
//         },
//       ],
//       botResponse:
//         "Ces options peuvent vraiment aider à alléger les frais ! 💰",
//     },
//     excellence_details: {
//       question:
//         "Les bourses d'excellence sont attribuées en fonction des performances académiques. Souhaitez-vous des détails sur les critères d'éligibilité ?",
//       options: [
//         { label: "Oui, je veux en savoir plus", next: "request_email" },
//         { label: "Non, merci", next: "scholarships" },
//       ],
//       botResponse:
//         "C'est un excellent moyen de récompenser le travail acharné !",
//     },
//     foreign_students_details: {
//       question:
//         "Les bourses pour étudiants étrangers aident à couvrir les frais de scolarité pour les étudiants internationaux. Avez-vous besoin d'informations spécifiques sur le processus de demande ?",
//       options: [
//         { label: "Oui, je suis intéressé", next: "request_email" },
//         { label: "Non, merci", next: "scholarships" },
//       ],
//       botResponse:
//         "C'est une opportunité incroyable pour les étudiants internationaux !",
//     },
//     need_based_details: {
//       question:
//         "Les bourses basées sur les besoins financiers aident les étudiants dont les familles ont des difficultés économiques. Souhaitez-vous des conseils sur comment postuler ?",
//       options: [
//         { label: "Oui, donnez-moi des conseils", next: "request_email" },
//         { label: "Non, merci", next: "scholarships" },
//       ],
//       botResponse: "Cela peut vraiment aider à rendre l'éducation accessible !",
//     },
//     research_grant_details: {
//       question:
//         "Les bourses de recherche soutiennent les étudiants qui souhaitent mener des projets de recherche. Souhaitez-vous en savoir plus sur les domaines couverts ?",
//       options: [
//         { label: "Oui, j'aimerais en savoir plus", next: "request_email" },
//         { label: "Non, merci", next: "scholarships" },
//       ],
//       botResponse: "C'est une belle manière de contribuer à l'innovation !",
//     },
//     athletic_scholarship_details: {
//       question:
//         "Les bourses sportives récompensent les étudiants-athlètes pour leurs performances. Souhaitez-vous connaître les sports couverts ?",
//       options: [
//         { label: "Oui, je veux plus d'infos", next: "request_email" },
//         { label: "Non, merci", next: "scholarships" },
//       ],
//       botResponse:
//         "Le sport peut ouvrir des portes étonnantes pour les étudiants !",
//     },
//     professional_studies_details: {
//       question:
//         "Les bourses d'études professionnelles aident les étudiants dans des domaines spécifiques comme l'art, la musique ou le théâtre. Êtes-vous intéressé par ces programmes ?",
//       options: [
//         { label: "Oui, donnez-moi plus d'infos", next: "request_email" },
//         { label: "Non, merci", next: "scholarships" },
//       ],
//       botResponse: "C'est une excellente voie pour les étudiants passionnés !",
//     },
//     // request_email: {
//     //   question: "S'il te plaît, entre ton email ci-dessous.",
//     //   options: [{ next: "request_name" }],
//     //   botResponse: "Merci pour l'information 📧",
//     // },
//     // request_name: {
//     //   question: "S'il te plaît, entre ton nom ci-dessous.",
//     //   options: [{ next: "request_phone" }],
//     //   botResponse: "D'accord, continuons !",
//     // },
//     // request_phone: {
//     //   question: "S'il te plaît, entre ton numéro de téléphone ci-dessous.",
//     //   options: [{ next: "final_response" }],
//     //   botResponse: "Parfait, merci !",
//     // },

//     request_email: {
//       question: "S'il te plaît, entre ton email ci-dessous.",
//       botResponse: "Merci pour l'information 📧",
//       inputType: "text",
//       next: "request_name",
//     },
//     request_name: {
//       question: "S'il te plaît, entre ton nom ci-dessous.",
//       botResponse: "D'accord, continuons !",
//       inputType: "text",
//       next: "request_phone",
//     },
//     request_phone: {
//       question: "S'il te plaît, entre ton numéro de téléphone ci-dessous.",
//       botResponse: "Parfait, merci !",
//       inputType: "text",
//       next: "final_response",
//     },

//     final_response: {
//       question: "Merci pour l'information ! Nous vous contacterons bientôt.",
//       options: [],
//       botResponse:
//         "Merci d'avoir pris le temps de discuter avec moi, À bientôt ! 😊",
//     },
//   };

//   const handleInputSubmit = (field) => {
//     const userResponse = userInfo[field];
//     const botResponse = scenarios[currentScenario].botResponse;

//     // Add the user response and bot response to messages
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: userResponse, sender: "user" },
//       { text: botResponse, sender: "bot" },
//     ]);

//     // Get the next scenario
//     const nextScenario = scenarios[currentScenario].next;
//     displayMessageWithTypingIndicator(scenarios[nextScenario].question, "bot");

//     // Check if the next scenario exists
//     if (nextScenario) {
//       setCurrentScenario(nextScenario); // Move to the next scenario
//     } else {
//       // Handle the end of the conversation if there's no next scenario
//       console.log("End of the conversation or no next step defined.");
//     }

//     // Clear the user input for the current field
//     setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [field]: "" }));
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   useEffect(() => {
//     setMessages([{ text: scenarios.initial.question, sender: "bot" }]);
//   }, []);

//   const displayMessageWithTypingIndicator = (message, sender) => {
//     setIsTyping(true);

//     setTimeout(() => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { text: message, sender },
//       ]);
//       setIsTyping(false);
//     }, 3000);
//   };

//   const handleOptionClick = (selectedOptionLabel, nextScenario) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text: selectedOptionLabel, sender: "user" },
//     ]);

//     displayMessageWithTypingIndicator(
//       scenarios[currentScenario].botResponse,
//       "bot"
//     );
//     displayMessageWithTypingIndicator(scenarios[nextScenario].question, "bot");

//     setCurrentScenario(nextScenario);
//   };

//   const toggleChatVisibility = () => {
//     setChatVisible(!isChatVisible);
//   };

//   const closeChat = () => {
//     setChatVisible(false);
//   };

//   return (
//     <div>
//       <div className="fixed bottom-4 z-50 right-4 flex items-center cursor-pointer">
//         {isChatVisible ? (
//           <button
//             onClick={closeChat}
//             className="text-gray-500 hover:text-red-500"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-12 h-12"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         ) : (
//           <div className="flex items-center bg-white text-black shadow-lg rounded-lg p-4">
//             <img src={botImage} alt="Bot Logo" className="w-16 h-16 mr-3" />
//             <div>
//               <span className="text-lg font-semibold">
//                 Bonjour 👋, besoin d'aide ? 😃
//               </span>
//               <p
//                 onClick={toggleChatVisibility}
//                 className={`text-sm mt-1 cursor-pointer text-center rounded-lg w-48 py-4 ${
//                   isChatVisible
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-black"
//                 } hover:bg-blue-500 hover:text-white`}
//               >
//                 👉 Par ici la démo 😀
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {isChatVisible && (
//         <div className="fixed bottom-16 right-4  bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-300 z-50">
//           <div
//             className="h-[400px] w-full overflow-y-auto flex flex-col space-y-2"
//             ref={chatContainerRef}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 {msg.sender === "bot" && (
//                   <img
//                     src={botImage}
//                     alt="Bot"
//                     className="w-16 h-16  rounded-full"
//                   />
//                 )}
//                 <div
//                   className={`p-3 max-w-xs rounded-lg ${
//                     msg.sender === "user"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {isTyping && (
//               <div className="text-gray-500">Bot est en train d'écrire...</div>
//             )}
//             <div className="mt-4 text-left">
//               {!isTyping && scenarios[currentScenario].options && (
//                 <div className="flex flex-col items-end space-y-2">
//                   {scenarios[currentScenario].options.map((option, index) => (
//                     <button
//                       key={index}
//                       //   onClick={() => handleOptionClick(option.next)}
//                       onClick={() =>
//                         handleOptionClick(option.label, option.next)
//                       }
//                       className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//                     >
//                       {option.label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {scenarios[currentScenario].inputType && (
//               <div className="mt-4 flex items-center justify-center">
//                 <input
//                   type={scenarios[currentScenario].inputType}
//                   placeholder={`Entrez votre ${
//                     scenarios[currentScenario].inputType === "email"
//                       ? "email"
//                       : scenarios[currentScenario].inputType === "text"
//                       ? "nom"
//                       : "numéro de téléphone"
//                   }`}
//                   value={userInfo[scenarios[currentScenario].inputType] || ""} // Ensure you use an empty string if no value is set
//                   onChange={(e) =>
//                     setUserInfo({
//                       ...userInfo,
//                       [scenarios[currentScenario].inputType]: e.target.value,
//                     })
//                   }
//                   className="border p-2 rounded-lg w-full"
//                 />
//                 <button
//                   onClick={() =>
//                     handleInputSubmit(scenarios[currentScenario].inputType)
//                   }
//                   className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   Envoyer
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
