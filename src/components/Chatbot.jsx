import React, { useState, useEffect, useRef } from "react";
import botImage from "../assets/bot.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setChatVisible] = useState(false);
  const [currentScenario, setCurrentScenario] = useState("initial");
  const [userInfo, setUserInfo] = useState({ email: "", name: "", phone: "" });
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef(null);

  const scenarios = {
    initial: {
      question:
        "Salut 👋, Bienvenue sur le chatbot de Lead-ia Academy. Je m’appelle Lydia et je suis ici pour t'aider avec toutes tes questions concernant l'université 😌. Pour commencer, pourrais-tu me dire qui tu es ?",
      options: [
        { label: "Étudiant 📚", next: "student" },
        { label: "Salarié en activité 💼", next: "employee" },
        { label: "Demandeur d'emploi 🔎", next: "job_seeker" },
        { label: "Une entreprise 🏢", next: "company" },
        { label: "Un parent 👨‍👩‍👧‍👦", next: "parent" },
      ],
      botResponse: "Ok 🙂",
    },
    student: {
      question:
        "Super ! Nos nouveaux élèves peuvent étudier sur 3 campus. Dis-moi lequel t’intéresse en priorité ?",
      options: [
        { label: "Paris", next: "choose_course" },
        { label: "Lyon", next: "choose_course_lyon" },
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
      botResponse: "Merci pour l'information!",
    },
    choose_course_lyon: {
      question:
        "Clique sur le domaine de formation qui t’intéresse chez Lead-ia Academy à Lyon",
      options: [
        { label: "COMMERCE & MARKETING", next: "course_details" },
        { label: "COMMUNICATION", next: "course_details" },
        { label: "INFORMATIQUE", next: "course_details" },
      ],
      botResponse: "Merci pour l'information!",
    },
    course_details: {
      question: "Génial ! Quel type de diplôme souhaites-tu obtenir ?",
      options: [
        { label: "Licence", next: "duration" },
        { label: "Master", next: "duration" },
        { label: "Certificat", next: "duration" },
      ],
      botResponse: "C'est un bon choix !",
    },
    duration: {
      question: "Combien de temps es-tu prêt à consacrer à tes études ?",
      options: [
        { label: "Temps plein", next: "financial_aid" },
        { label: "Temps partiel", next: "financial_aid" },
      ],
      botResponse: "Compris !",
    },
    financial_aid: {
      question:
        "As-tu besoin d'informations sur les bourses ou l'aide financière ?",
      options: [
        { label: "Oui, je veux en savoir plus", next: "scholarships" },
        { label: "Non, merci", next: "student_life" },
      ],
      botResponse: "C'est important de le savoir.",
    },
    scholarships: {
      question: "Voici quelques options de bourses disponibles :",
      options: [
        { label: "Bourse d'excellence", next: "final" },
        { label: "Bourse pour étudiants étrangers", next: "final" },
        { label: "Bourse basée sur les besoins financiers", next: "final" },
      ],
      botResponse: "N'hésite pas à poser des questions sur ces bourses !",
    },
    student_life: {
      question:
        "Souhaites-tu en savoir plus sur la vie étudiante, comme les activités et les clubs disponibles ?",
      options: [
        { label: "Oui, je suis intéressé", next: "activities" },
        { label: "Non, je préfère parler des cours", next: "courses" },
      ],
      botResponse:
        "C'est une partie essentielle de l'expérience universitaire !",
    },
    activities: {
      question: "Voici quelques activités et clubs que tu peux rejoindre :",
      options: [
        { label: "Club de débat", next: "support_services" },
        { label: "Association sportive", next: "support_services" },
        { label: "Groupe de bénévolat", next: "support_services" },
      ],
      botResponse:
        "Ces activités sont une excellente façon de rencontrer de nouvelles personnes !",
    },
    support_services: {
      question:
        "As-tu besoin d'informations sur les services de soutien aux étudiants, comme le conseil ou l'orientation professionnelle ?",
      options: [
        { label: "Oui, je veux en savoir plus", next: "counseling" },
        { label: "Non, merci", next: "final" },
      ],
      botResponse: "Nous sommes là pour te soutenir !",
    },
    counseling: {
      question: "Voici quelques services de soutien disponibles :",
      options: [
        { label: "Conseil psychologique", next: "final" },
        { label: "Orientation professionnelle", next: "final" },
        { label: "Ateliers de gestion du stress", next: "final" },
      ],
      botResponse: "N'hésite pas à demander de l'aide si tu en as besoin !",
    },
    courses: {
      question: "Quels aspects des cours souhaites-tu connaître ?",
      options: [
        { label: "Les professeurs et leurs qualifications", next: "final" },
        { label: "Le contenu des cours", next: "final" },
        { label: "Les horaires des cours", next: "final" },
      ],
      botResponse: "Je suis là pour t'aider avec ça !",
    },
    final: {
      question:
        "Merci d'avoir utilisé le chatbot de Lead-ia Academy. Bonne chance dans vos études !",
      options: [{ label: "Visiter le campus de Lyon", next: "lyon_campus" }],
    },
    lyon_campus: {
      question:
        "Voici le lien pour plus d'informations sur le campus de Lyon :",
      options: [{ label: "Visiter le campus de Lyon", next: "request_email" }],
      botResponse:
        "🔗 [Campus Université de Lyon](https://www.universite-lyon.fr/vie-des-campus/developpement-des-campus/carte-des-campus/campus-universite-de-lyon-983.kjsp)",
    },
    request_email: {
      question: "S'il te plaît, entre ton name ci-dessous.",
      options: [
        {
          label: "S'il te plaît, entre ton email ci-dessous",
          next: "request_name",
        },
      ],
      botResponse: "Merci 🙂",
    },
    request_name: {
      question: "S'il te plaît, entre ton name ci-dessous.",
      options: [
        {
          label: "S'il te plaît, entre ton email ci-dessous",
          next: "request_phone",
        },
      ],
    },
    request_phone: {
      question: "S'il te plaît, entre ton name ci-dessous.",
      options: [
        {
          label: "S'il te plaît, entre ton email ci-dessous",
          next: "finalresponse",
        },
      ],
    },
    finalresponse: {
      question: "Merci pour l'information ! Nous vous contacterons bientôt.",
      options: [],
    },
  };
  const handleEmailChange = (e) => {
    setUserInfo({
      ...userInfo,
      email: e.target.value,
      name: e.target.value,
      phone: e.target.value,
    });
  };

  const handleEmailSubmit = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInfo.email, sender: "user" },
      {
        text: "Merci pour l'information ! .",
        sender: "bot",
      },
      { text: userInfo.name, sender: "user" },
      {
        text: "Merci pour l'information ! .",
        sender: "bot",
      },
      { text: userInfo.phone, sender: "user" },
      {
        text: "Merci pour l'information ! Nous vous contacterons bientôt.",
        sender: "bot",
      },
    ]);
    setUserInfo({ email: "", name: "", phone: "" }); // Clear the input
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


  const handleOptionClick = (nextScenario) => {
    const selectedOption = scenarios[currentScenario].options.find(
      (option) => option.next === nextScenario
    ).label;

  
    displayMessageWithTypingIndicator(scenarios[currentScenario].botResponse, "bot");
    displayMessageWithTypingIndicator(scenarios[nextScenario].question, "bot");
    setCurrentScenario(nextScenario);
    setMessages((prevMessages) => [
        ...prevMessages,
        { text: selectedOption, sender: "user" },
      ]);
 
   
  };

  const toggleChatVisibility = () => {
    setChatVisible(!isChatVisible);
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  return (
    <div>
      <div
        className="fixed bottom-4 z-50 right-4 flex items-center cursor-pointer"
      >
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
            <span className="text-lg font-semibold">Bonjour 👋, besoin d'aide ? 😃</span>
            <p onClick={toggleChatVisibility} 
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
                    className="w-16 h-16  rounded-full"
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
            {isTyping && <div className="text-gray-500">Bot est en train d'écrire...</div>}
            <div className="mt-4 text-left">
            {!isTyping && scenarios[currentScenario].options && (
            <div className="flex flex-col items-end space-y-2">
              {scenarios[currentScenario].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.next)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
          </div>
             {/* {isTyping && (
              <div className="flex justify-start">
                <img
                  src={botImage}
                  alt="Bot Typing"
                  className="w-16 h-16 rounded-full"
                />
                <div className="p-3 max-w-xs rounded-lg bg-gray-200 text-gray-800">
                  ...typing
                </div>
              </div>
            )} */}
            {currentScenario === "request_email" && (
              <div className="mt-4 flex items-center justify-center">
                <input
                  type="email"
                  placeholder="Entrez votre email"
                  value={userInfo.email}
                  onChange={handleEmailChange}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Envoyer
                </button>
              </div>
            )}
            {currentScenario === "request_name" && (
              <div className="mt-4 flex items-center justify-center">
                <input
                  type="name"
                  placeholder="Entrez votre prenom"
                  value={userInfo.name}
                  onChange={handleEmailChange}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
                >
                  Envoyer
                </button>
              </div>
            )}
            {currentScenario === "phone" && (
              <div className="mt-4 flex items-center justify-cente">
                <input
                  type="phone"
                  placeholder="Entrez votre phone"
                  value={userInfo.phone}
                  onChange={handleEmailChange}
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={handleEmailSubmit}
                  className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
                >
                  Envoyer
                </button>
              </div>
            )}
            {/* <div className="mt-4 text-left">
              {scenarios[currentScenario].options.length > 0 && (
                <div className="flex flex-col items-end space-y-2">
                  {scenarios[currentScenario].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionClick(option.next)}
                      className="bg-blue-600 justify-start flex text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
