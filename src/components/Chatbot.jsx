import React, { useState, useEffect, useRef } from "react";
import botImage from "../assets/bot.png";
import imgbot from "../assets/imgbot.png";
import instagram from "../assets/istg.jfif";

const Chatbot = () => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setChatVisible] = useState(false);
  const [currentScenario, setCurrentScenario] = useState("initial");
  const [userInfo, setUserInfo] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  const [courses] = useState([
    {
      title: "Digital Marketing Course",
      image: imgbot,
      link: "https://demo.lead-ia.com/bachelor-marketing-digital.html",
    },
  ]);

  const [ads] = useState([
    {
      title: "Digital Marketing Course",
      image: instagram,
      link: "https://demo.lead-ia.com/bachelor-marketing-digital.html",
    },
  ]);

  const scenarios = {
    initial: {
    //   question:
    //     "Salut 👋, Bienvenue sur le chatbot de Lead-ia Academy. Je m’appelle Lydia et je suis ici pour t'aider avec toutes tes questions concernant l'université 😌. Pour commencer, pourrais-tu me dire qui tu es ?",
    question: (
        <div>
          <h1>Bonjour 👋</h1>
          <p>Bienvenue sur le chatbot de Brain-ia Academy</p>
          <p>Je suis ici pour t'aider avec toutes tes questions concernant l'université 😌.</p>
          <p>Pour commencer, pourrais-tu me dire qui tu es ?</p>
        </div>
      ),
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
      question:
        "Génial ! OK, on va sur ça 😀 ! Quel type de diplôme souhaites-tu obtenir ?",
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
        { label: "Non, merci", next: "request_name" },
      ],
      botResponse: "Je comprends. Parlons des options disponibles 🎓",
    },
    scholarships: {
      question: "Voici quelques options de bourses disponibles :",
      options: [
        { label: "Bourse d'excellence", next: "request_name" },
        { label: "Bourse pour étudiants étrangers", next: "request_name" },
        {
          label: "Bourse basée sur les besoins financiers",
          next: "request_name",
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
          next: "request_namel",
        },
        { label: "Non, merci", next: "rrequest_name" },
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
        { label: "Développement de produits", next: "request_name" },
        { label: "Analyse de données", next: "request_name" },
        { label: "Recherche appliquée", next: "request_name" },
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
        { label: "Non, merci", next: "request_name" },
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
        { label: "Oui, je veux en savoir plus", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "C'est un excellent moyen de récompenser le travail acharné !",
    },
    foreign_students_details: {
      question:
        "Les bourses pour étudiants étrangers aident à couvrir les frais de scolarité pour les étudiants internationaux. Avez-vous besoin d'informations spécifiques sur le processus de demande ?",
      options: [
        { label: "Oui, je suis intéressé", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "C'est une opportunité incroyable pour les étudiants internationaux !",
    },
    need_based_details: {
      question:
        "Les bourses basées sur les besoins financiers aident les étudiants dont les familles ont des difficultés économiques. Souhaitez-vous des conseils sur comment postuler ?",
      options: [
        { label: "Oui, donnez-moi des conseils", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "Cela peut vraiment aider à rendre l'éducation accessible !",
    },
    research_grant_details: {
      question:
        "Les bourses de recherche soutiennent les étudiants qui souhaitent mener des projets de recherche. Souhaitez-vous en savoir plus sur les domaines couverts ?",
      options: [
        { label: "Oui, j'aimerais en savoir plus", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "C'est une belle manière de contribuer à l'innovation !",
    },
    athletic_scholarship_details: {
      question:
        "Les bourses sportives récompensent les étudiants-athlètes pour leurs performances. Souhaitez-vous connaître les sports couverts ?",
      options: [
        { label: "Oui, je veux plus d'infos", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "Le sport peut ouvrir des portes étonnantes pour les étudiants !",
    },
    professional_studies_details: {
      question:
        "Les bourses d'études professionnelles aident les étudiants dans des domaines spécifiques comme l'art, la musique ou le théâtre. Êtes-vous intéressé par ces programmes ?",
      options: [
        { label: "Oui, donnez-moi plus d'infos", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "C'est une excellente voie pour les étudiants passionnés !",
    },
    request_name: {
      question: "Peux-tu me donner ton prénom, s’il te plaît ?",
      botResponse: (name) => `Merci, ${name} ! D'accord, continuons !`,
      inputType: "name",
      next: "request_email",
    },
    request_email: {
      question: (name) => `S'il te plaît ${name}, entre ton email ci-dessous.`,
      botResponse: "Merci pour l'information 📧",
      inputType: "email",
      next: "request_phone",
      invalidResponse: ["Ton email n'est pas valide."],
    },
    request_phone: {
      question: (name) =>
        `S'il te plaît, ${name} entre ton numéro de téléphone ci-dessous.`,
      botResponse:
        "Parfait ! 😊",
      inputType: "phone",
      next: "final_response",
    },

    final_response: {
    //   question: "Merci pour l'information ! Nous vous contacterons bientôt.",
      options: [],
      botResponse:
        "Merci d'avoir pris le temps de discuter avec moi, À bientôt ! 😊",
    },
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputSubmit = () => {
    const userResponse = userInfo[scenarios[currentScenario].inputType];

    if (!userResponse) return; // Prevent submission if the input is empty

    // Save user response
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userResponse, sender: "user" },
    ]);

    // Handle email validation
    if (currentScenario === "request_email") {
      if (!isValidEmail(userResponse)) {
        // If email is invalid, display the invalid response
        scenarios[currentScenario].invalidResponse.forEach((message) => {
          displayMessageWithTypingIndicator(message, "bot");
        });
        // Repeat the question for the email
        displayMessageWithTypingIndicator(
          scenarios[currentScenario].question(userInfo.name || ""),
          "bot"
        );
        // Clear input for re-entry
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [scenarios[currentScenario].inputType]: "",
        }));
        return; // Exit the function to prevent moving to the next scenario
      }
    }

    // Get the next scenario
    const nextScenario = scenarios[currentScenario].next;

    // Display bot response based on current scenario
    if (currentScenario === "request_name") {
      // Use the name to generate the bot response
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse(userResponse),
        "bot"
      );
      displayMessageWithTypingIndicator(
        scenarios[nextScenario].question(userResponse),
        "bot"
      );
    } else if (currentScenario === "request_email") {
      // Bot response for email
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse,
        "bot"
      );
      displayMessageWithTypingIndicator(
        scenarios[nextScenario].question(userInfo.name || ""),
        "bot"
      );
    } else if (currentScenario === "request_phone") {
      // Bot response for phone
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse,
        "bot"
      );
      setCurrentScenario(nextScenario);
    }

    // Clear the input field after the bot's acknowledgment
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [scenarios[currentScenario].inputType]: "",
    }));

    // Move to the next scenario after a delay
    setCurrentScenario(nextScenario); // Move to the next scenario
  };

  const displayMessageWithTypingIndicator = (message, sender) => {
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  const handleOptionClick = (selectedOptionLabel, nextScenario) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: selectedOptionLabel, sender: "user" },
    ]);

    if (
      selectedOptionLabel === "COMMERCE & MARKETING" ||
      selectedOptionLabel === "INFORMATIQUE" ||
      selectedOptionLabel === "COMMUNICATION"
    ) {
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse,
        "bot"
      );
      setTimeout(() => {
        displayResourcesCard();
        displayMessageWithTypingIndicator(
          scenarios[nextScenario].question,
          "bot"
        );
        setCurrentScenario(nextScenario);
      }, 2000);
    } else {
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse,
        "bot"
      );
      setTimeout(() => {
        displayMessageWithTypingIndicator(
          scenarios[nextScenario].question,
          "bot"
        );
        setCurrentScenario(nextScenario);
      }, 2000);
    }
  };

  // const displayResourcesCard = () => {
  //     const courseCard = (
  //       <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
  //         <div className="flex overflow-x-auto space-x-4">
  //           {courses.map((course, index) => (
  //             <div key={index} className="course-card flex-shrink-0 w-64">
  //               <img
  //                 src={course.image}
  //                 alt={course.title}
  //                 className="w-full h-40 object-cover rounded-lg"
  //               />
  //               <div className="text-gray-800 mt-2 font-semibold">{course.title}</div>
  //               <a
  //                 href={course.link}
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
  //               >
  //                 More Details
  //               </a>
  //               <div className="flex items-center justify-between mt-4">

  //         </div>
  //             </div>

  //           ))}
  //            {ads.map((course, index) => (
  //             <div key={index} className="course-card flex-shrink-0 w-64">
  //               <img
  //                 src={course.image}
  //                 alt={course.title}
  //                 className="w-full h-40 object-cover rounded-lg"
  //               />
  //               <div className="text-gray-800 mt-2 font-semibold">{course.title}</div>
  //               <a
  //                 href={course.link}
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
  //               >
  //                 More Details
  //               </a>
  //               <div className="flex items-center justify-between mt-4">

  //         </div>
  //             </div>

  //           ))}
  //         </div>

  //       </div>
  //     );

  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: courseCard, sender: "bot" },
  //     ]);
  //   };

  const displayResourcesCard = () => {
    const courseCard = (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-4">
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        <div className="flex overflow-x-auto space-x-4 mb-4">
          {courses.map((course, index) => (
            <div key={index} className="course-card flex-shrink-0 w-64">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="text-gray-800 mt-2 font-semibold">
                {course.title}
              </div>
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                More Details
              </a>
            </div>
          ))}
        </div>
      </div>
    );
    const courseCards = (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-4">
        <h2 className="text-xl font-bold mb-4">Ads</h2>
        <div className="flex overflow-x-auto space-x-4 mb-4">
          {ads.map((course, index) => (
            <div key={index} className="course-card flex-shrink-0 w-64">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="text-gray-800 mt-2 font-semibold">
                {course.title}
              </div>
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                More Details
              </a>
            </div>
          ))}
        </div>
      </div>
    );

    // Instead of setting text to JSX, consider setting a React component
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: courseCard, sender: "bot" },

      { text: courseCards, sender: "bot" },
    ]);
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
        <div className="fixed bottom-16 right-4 bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-300 z-50">
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
            {isTyping && (
              <div className="flex items-center">
                <img
                  src={botImage}
                  alt="Bot Typing"
                  className="w-12 h-12 rounded-full mr-2"
                />
                <div className="text-gray-500 font-bold">
                  Bot est en train d'écrire...
                </div>
              </div>
            )}
            <div className="mt-4 text-left">
              {!isTyping && scenarios[currentScenario].options && (
                <div className="flex flex-col items-end space-y-2">
                  {scenarios[currentScenario].options.map((option, index) => (
                    <button
                      key={index}
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

              {/* {!isTyping && scenarios[currentScenario].inputType && (
                <div className="mt-4 flex w-full items-center justify-center">
                     <div className="border-b border-gray-300 mb-2"></div>
                  <input
                    type={scenarios[currentScenario].inputType}
                    placeholder={`Entrez votre ${
                        scenarios[currentScenario].inputType === "email"
                          ? "email"
                          : scenarios[currentScenario].inputType === "name"
                          ? "nom"
                          : "numéro de téléphone"
                      }`}
                    value={userInfo[scenarios[currentScenario].inputType] || ""}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        [scenarios[currentScenario].inputType]: e.target.value,
                      })
                    }
                    className="bg-white border border-gray-300 p-2 w-full"
                  />
                  <button
                    onClick={handleInputSubmit}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Envoyer
                  </button>
                </div>
              )} */}
              {!isTyping && scenarios[currentScenario].inputType && (
  <div className="mt-4 w-full">
    {/* Divider line */}
    <div className="border-b border-gray-300 mb-2"></div>

    {/* Input and button container */}
    <div className="flex items-center justify-between">
      <input
        type={scenarios[currentScenario].inputType}
        placeholder={`Entrez votre ${
          scenarios[currentScenario].inputType === "email"
            ? "email"
            : scenarios[currentScenario].inputType === "name"
            ? "nom"
            : "numéro de téléphone"
        }`}
        value={userInfo[scenarios[currentScenario].inputType] || ""}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            [scenarios[currentScenario].inputType]: e.target.value,
          })
        }
        className="bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-white p-2 text-gray-600  w-full"
      />
      <button
        onClick={handleInputSubmit}
        className="ml-2  text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400"
      >
        Envoyer
      </button>
    </div>
  </div>
)}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
