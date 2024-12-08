import React, { useState, useEffect, useRef } from "react";
import botImage from "../assets/bot.png";
import imgbot from "../assets/imgbot.png";
import { scenarios, routes } from "../constants/scénario";
import axios from "axios";


import { sendChatData } from "../api/sendChatData";

const Chatbot = () => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [currentScenario, setCurrentScenario] = useState("initial");
  const [userInfo, setUserInfo] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hasShownInitialMessage, setHasShownInitialMessage] = useState(false);
  const [groupedData, setGroupedData] = useState({});

  const [courses] = useState([
    {
      title: "Digital Marketing Course",
      image: imgbot,
      link: "https://www.coursera.org/learn/foundations-of-digital-marketing-and-e-commerce",
      details:
        "Learn the fundamentals of digital marketing and e-commerce to grow your business or career.",
    },
  ]);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidFrenchPhone = (phone) => {
    const sanitizedPhone = phone.replace(/\s|\.|-/g, "");
    const regex = /^06\d{8}$/;
    return regex.test(sanitizedPhone);
  };

  const sendData = (userChoice, inputValue) => {
    setGroupedData((prevData) => ({
      ...prevData,
      [userChoice]: inputValue,
    }));

    // Send grouped data when finished
    if (isFinalScenario(currentScenario)) {
      sendChatData(groupedData);
      // Reset grouped data after sending
      setGroupedData({});
    }
  };
  const isFinalScenario = (scenario) => {
    // Define your final scenarios, where you want to send data
    return ["new_question", "Goodbye"].includes(scenario);
  };

  const handleInputSubmit = () => {
    const userResponse = userInfo[scenarios[currentScenario].inputType];

    if (!userResponse) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userResponse, sender: "user" },
    ]);

    if (currentScenario === "request_email") {
      if (!isValidEmail(userResponse)) {
        scenarios[currentScenario].invalidResponse.forEach((message) => {
          displayMessageWithTypingIndicator(message, "bot");
        });

        displayMessageWithTypingIndicator(
          scenarios[currentScenario].question(userInfo.name || ""),
          "bot"
        );

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [scenarios[currentScenario].inputType]: "",
        }));
        return;
      }
    } else if (currentScenario === "request_phone") {
      if (!isValidFrenchPhone(userResponse)) {
        scenarios[currentScenario].invalidResponse.forEach((message) => {
          displayMessageWithTypingIndicator(message, "bot");
        });
        displayMessageWithTypingIndicator(
          scenarios[currentScenario].question,
          "bot"
        );

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [scenarios[currentScenario].inputType]: "",
        }));
        return;
      }
    } else if (currentScenario === "request_add_email") {
      if (!isValidEmail(userResponse)) {
        scenarios[currentScenario].invalidResponse.forEach((message) => {
          displayMessageWithTypingIndicator(message, "bot");
        });

        displayMessageWithTypingIndicator(
          scenarios[currentScenario].question,
          "bot"
        );

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          [scenarios[currentScenario].inputType]: "",
        }));
        return;
      }
    }

    const nextScenario = scenarios[currentScenario].next;

    if (currentScenario === "request_name") {
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse(userResponse),
        "bot"
      );
      displayMessageWithTypingIndicator(
        scenarios[nextScenario].question(userResponse),
        "bot"
      );
    } else if (currentScenario === "request_email") {
      // displayMessageWithTypingIndicator(
      //   scenarios[currentScenario].botResponse,
      //   "bot"
      // );

      displayMessageWithTypingIndicator(
        scenarios[nextScenario].question,
        "bot"
      );
      // setCurrentScenario(nextScenario)
    } else if (currentScenario === "request_add_email") {
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse,
        "bot"
      );

      // displayMessageWithTypingIndicator(
      //   scenarios[nextScenario].question,
      //   "bot"
      // );
      setTimeout(() => {
        displayMessageWithTypingIndicator(
          scenarios[nextScenario].question,
          "bot"
        );
        setCurrentScenario(nextScenario);
      }, 3000);
    } else if (currentScenario === "request_phone") {
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
      }, 3000);
    } else if (currentScenario === "entreprise") {
      setTimeout(() => {
        displayMessageLineByLine(scenarios[currentScenario].botResponse, "bot");
      }, 3000);
    } else if (currentScenario === "contact") {
      setTimeout(() => {
        displayMessageLineByLine(scenarios[currentScenario].botResponse, "bot");
      }, 3000);
    }
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [scenarios[currentScenario].inputType]: "",
    }));

    setCurrentScenario(nextScenario);

    sendData(currentScenario, userInfo[scenarios[currentScenario].inputType]);
  };

  // const handleAISubmit = async () => { 
  //   if (!inputValue.trim()) return; // Prevent empty submissions
  
  //   // Add user's message to the chat
  //   setMessages((prevMessages) => [...prevMessages, { sender: "user", text: inputValue }]);
  //   setInputValue(""); // Clear the input
  //   setIsTyping(true); // Show typing indicator
  
  //   // Prepare the routes for GPT
  //   const formattedRoutes = JSON.stringify(routes, null, 2);
  
  //   // Send the input and routes to GPT
  //   try {
  //     const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer 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`, // Ensure to replace it with your actual API key
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-4",
  //         messages: [
  //           {
  //             role: "system",
  //             content: `
  // You are a chatbot integrated into an application. You are provided with a list of routes and their associated keywords. 
  // If a user's query matches any of the keywords, you must respond with a message suggesting the associated route in the following format:
  
  // "Pour plus d'informations concernant '<user query>', veuillez visiter le lien suivant : <route>."
  
  // If the user asks for more details about a specific route, you must read précisely the spécified routes by the user. Based on the keyword or query, provide a richer and more detailed answer, similar to a content of the route, without needing predefined details. For example, if the user asks about 'les métiers', you could explain that 'les métiers' covers various professional sectors, job descriptions, or opportunities.
  
  // If no route matches, respond naturally using your conversational abilities.
  
  // Here is the list of routes and keywords:
  // ${formattedRoutes}
  //             `,
  //           },
  //           { role: "user", content: inputValue },
  //         ],
  //       }),
  //     });
  
  //     const data = await response.json();
  //     const chatGPTResponse = data.choices[0].message.content;
  
  //     // Add GPT's response to the chat
  //     setTimeout(() => {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { sender: "bot", text: chatGPTResponse },
  //       ]);
  //       setIsTyping(false); // Hide typing indicator
  //     }, 2000); // Simulate typing delay
  //   } catch (error) {
  //     console.error("Error communicating with ChatGPT:", error);
  //     setTimeout(() => {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         {
  //           sender: "bot",
  //           text: "Désolé, une erreur s'est produite. Veuillez réessayer plus tard.",
  //         },
  //       ]);
  //       setIsTyping(false); // Hide typing indicator
  //     }, 2000); // Simulate typing delay
  //   }
  // };




const handleAISubmit = async () => {
  if (!inputValue.trim()) return; // Prevent empty submissions

  // Show user message
  setMessages((prevMessages) => [...prevMessages, { sender: "user", text: inputValue }]);
  setInputValue(""); // Clear the input

  // Show typing indicator
  setIsTyping(true);

  try {
    // Send the user input to the backend
    const response = await axios.post("http://localhost:5000/bot", {
      input: inputValue, // Send the input value directly
    });

    const data = response.data; // Use response.data instead of response.json()

    // Simulate typing delay for GPT's response
    setTimeout(() => {
      if (data.route) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Here is the URL you requested: ", htmlContent: data.route },
        ]);
      } else if (data.details) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Voici les détails: ", htmlContent: data.details},
        ]);
      } else if (data.message) { // Handle general GPT responses
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.message },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "I'm sorry, I couldn't find any relevant information." },
        ]);
      }

      setIsTyping(false); // Hide typing indicator
    }, 2000); // Simulate typing delay

  } catch (error) {
    console.error("Error communicating with the server:", error);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: "Sorry, an error occurred. Please try again later." },
    ]);
    setIsTyping(false); // Hide typing indicator on error
  }
};

  
  
  

  

  const displayMessageWithTypingIndicator = (message, sender) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender },
      ]);
      setIsTyping(false);
    }, 3000);
  };

  const handleOptionClick = (selectedOptionLabel, nextScenario) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: selectedOptionLabel, sender: "user" },
    ]);

    // selectedOptionLabel === "COMMERCE & MARKETING" ||
    // selectedOptionLabel === "INFORMATIQUE" ||
    // selectedOptionLabel === "COMMUNICATION"
    if (
      selectedOptionLabel === "Étudiant 📚" ||
      selectedOptionLabel === "Salarié en activité 💼" ||
      selectedOptionLabel === "Demandeur d'emploi 🔎" ||
      selectedOptionLabel === "Une entreprise 🏢" ||
      selectedOptionLabel === "Un parent 👨‍👩‍👧‍👦"
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
      }, 3000);
    } else if (nextScenario === "not_talk") {
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botRes,
        "bot"
      );
      setTimeout(() => {
        displayResourcesCard();
      }, 3000);
      setTimeout(() => {
        displayMessageLineByLine(scenarios.not_talk.question, "bot");
        setCurrentScenario(nextScenario);
      }, 3000);
    } else if (nextScenario === "talk_before") {
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
      }, 3000);
    } else if (nextScenario === "verification_phone") {
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
      }, 3000);
    } else if (nextScenario === "pose_question") {
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse,
        "bot"
      );
      setTimeout(() => {
        displayMessageLineByLine(scenarios.pose_question.question, "bot");
        setCurrentScenario(nextScenario);
      }, 3000);
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
      }, 3000);
    }
    sendData(
      currentScenario,
      selectedOptionLabel,
      userInfo[scenarios[currentScenario].inputType]
    );
  };

  const displayMessageLineByLine = (message, sender) => {
    const text = React.Children.toArray(message.props.children)
      .map((child) =>
        typeof child === "string" ? child : child.props.children
      )
      .flat()
      .join("\n");

    const lines = text.split("\n").filter((line) => line.trim() !== "");

    setIsTyping(true); // Start typing indicator

    const displayNextLine = async (index) => {
      if (index < lines.length) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: lines[index], sender },
        ]);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        displayNextLine(index + 1);
        setIsTyping(false);
      } else {
        setIsTyping(false);
      }
    };

    displayNextLine(0);
  };

  const displayResourcesCard = () => {
    const whatsAppCard = (
      <div
        className="bg-green-100 rounded-lg shadow-md p-4 border border-green-300 mb-4 cursor-pointer hover:bg-green-200 transition"
        onClick={() => {
          window.open("https://wa.me/0673967062", "_blank");
        }}
      >
        <div className="flex items-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-md font-semibold text-black">
              Salut 👋, Bienvenue sur le chatbot de Botgeneration.AI
            </h1>
            <h2 className="text-sm font-bold text-gray-800">
              Contactez-nous directement
            </h2>

            <p className="text-gray-600">
              Cliquez ici pour discuter avec nous sur WhatsApp.
            </p>
          </div>
        </div>
      </div>
    );
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: whatsAppCard, sender: "bot" },
    ]);
  };

  const displaycardcourse = () => {
    const courseCard = (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-4">
        <h2 className="text-xl font-bold mb-4">Cours</h2>
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
              <p className="text-sm text-gray-600 mt-2">{course.details}</p>
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Plus Details
              </a>
              {/* Additional Lines Below the Button */}
              <p className="text-xs text-gray-500 mt-2">
                Commencez aujourd'hui pour transformer votre carrière.
              </p>
              <p className="text-xs text-gray-500">
                Obtenez un certificat après l'achèvement.
              </p>
            </div>
          ))}
        </div>
      </div>
    );

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: courseCard, sender: "bot" },
    ]);
  };
  // const displayCardAds = () => {
  //   const courseCards = (
  //     <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-4">
  //       <h2 className="text-xl font-bold mb-4">Ads</h2>
  //       <div className="flex overflow-x-auto space-x-4 mb-4">
  //         {ads.map((course, index) => (
  //           <div key={index} className="course-card flex-shrink-0 w-64">
  //             <img
  //               src={course.image}
  //               alt={course.title}
  //               className="w-full h-40 object-cover rounded-lg"
  //             />
  //             <div className="text-gray-800 mt-2 font-semibold">
  //               {course.title}
  //             </div>
  //             <a
  //               href={course.link}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
  //             >
  //               More Details
  //             </a>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { text: courseCards, sender: "bot" },
  //   ]);
  // }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isChatVisible && !isTyping) {
      if (!hasShownInitialMessage) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setHasShownInitialMessage(true);
          setHasInteracted(true);
        }, 1000);
      }
    }
  }, [isChatVisible, isTyping]);

  const toggleChatVisibility = () => {
    setChatVisible(!isChatVisible);
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsTyping(true);
      displaycardcourse();
      setTimeout(() => {
        displayMessageLineByLine(scenarios.initial.question, "bot");

        setCurrentScenario("initial");
        setIsTyping(false);
      }, 3000);
    } else if (!isChatVisible) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  const handleInitialMessage = () => {
    if (isFirstVisit) {
      displayMessageWithTypingIndicator(
        "Bonjour 👋, besoin d'aide ? 😃",
        "bot"
      );
      setIsFirstVisit(false); // Prevent it from showing again
    }
  };

  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");
    if (!visited) {
      setIsFirstVisit(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    if (isChatVisible) {
      handleInitialMessage();
    }
  }, [isChatVisible]);

  return (
    <div>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 z-50 right-4 flex items-center cursor-pointer">
        {isChatVisible ? (
          <button
            onClick={closeChat}
            className="bg-black text-white hover:bg-gray-800 rounded-full"
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
          <div className="flex items-center  text-black shadow-lg rounded-lg p-3">
            {hasInteracted ? (
              <img
                src={botImage}
                onClick={toggleChatVisibility}
                alt="Bot Logo"
                className="w-20 h-20"
              />
            ) : (
              <div className="bg-[#97d197] shadow-lg rounded-lg p-3">
                <span className="text-sm font-semibold">
                  Bonjour 👋, besoin d'aide ? 😃
                </span>
                <p
                  onClick={toggleChatVisibility}
                  className="text-sm mt-1 cursor-pointer text-center rounded-lg w-48 py-4 bg-gray-200 text-black hover:bg-black hover:text-white"
                >
                  👉 Par ici la démo 😀
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {isChatVisible && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeChat}
          ></div>

          {/* Chat Window */}
          <div className="fixed bottom-16 right-4 bg-gray-200 border border-gray-600 rounded-lg mb-2 pb-2 w-[95%] sm:w-[90%] md:w-[80%] lg:max-w-md max-w-sm z-50">
            {/* Header */}
            <div className="flex items-center bg-[#97d197] text-white p-2 rounded-t-lg">
              <img src={botImage} alt="Bot Logo" className="w-12 h-12 mr-3" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">BotGenerationAI</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-100">
                  {isTyping ? "En train d'écrire..." : "En ligne"}
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              className="h-[336px] w-full overflow-y-auto flex flex-col px-2"
              ref={chatContainerRef}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end text-xs"
                      : "justify-start text-sm items-center"
                  } mb-2`}
                >
                  {msg.sender === "bot" && (
                    <img
                      src={botImage}
                      alt="Bot"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}

                   {msg.htmlContent ? (
        <div
        className={`p-2 max-w-xs text-xs rounded-lg ${
          msg.sender === "user"
            ? "bg-blue-500 text-white text-sm"
            : "bg-gray-200 text-gray-800"
        }`}
          dangerouslySetInnerHTML={{ __html: msg.htmlContent }} // Render HTML safely
        />
      ) : (
        <span  className={`p-2 max-w-xs text-xs rounded-lg ${
          msg.sender === "user"
            ? "bg-blue-500 text-white text-sm"
            : "bg-gray-200 text-gray-800"
        }`}>{msg.text}</span> // Otherwise, render the plain text
      )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center">
                  <img
                    src={botImage}
                    alt="Typing..."
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="text-gray-500 text-xs font-bold">
                    Bot est en train d'écrire...
                  </div>
                </div>
              )}
            </div>

            {/* Options or Input */}
            <div className="mt-4 px-4">
              <div className="border-b border-gray-500 mb-2"></div>
              {scenarios[currentScenario].options && (
                <div className="flex flex-row items-end space-x-1 mb-4">
                  {scenarios[currentScenario].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleOptionClick(option.label, option.next)
                      }
                      className="text-blue-500 border text-xs border-blue-500 py-1 px-1 rounded-lg hover:bg-blue-500 hover:text-white"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-4">
                {/* Specific Scenario Input */}
                {scenarios[currentScenario]?.inputType ? (
                  <div className="flex items-center gap-2 mb-2 justify-between">
                    <input
                      type={scenarios[currentScenario].inputType}
                      placeholder={`Entrez votre ${
                        scenarios[currentScenario].inputType === "email"
                          ? "email"
                          : scenarios[currentScenario].inputType === "name"
                          ? "nom"
                          : scenarios[currentScenario].inputType ===
                            "phone (+33 xxxxxxxxx)"
                          ? "numéro de téléphone"
                          : scenarios[currentScenario].inputType === "contact"
                          ? "contact"
                          : scenarios[currentScenario].inputType ===
                            "entreprise"
                          ? "entreprise"
                          : ""
                      }`}
                      value={
                        userInfo[scenarios[currentScenario].inputType] || ""
                      }
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          [scenarios[currentScenario].inputType]:
                            e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleInputSubmit(); // Trigger submission on Enter
                        }
                      }}
                      className="bg-white border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      onClick={handleInputSubmit}
                      className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400"
                    >
                      Envoyer
                    </button>
                  </div>
                ) : (
                  // General Chat Input
                  <div className="flex items-center gap-2 justify-between">
                    <input
                      type="text"
                      placeholder="Comment puis-je vous aider ?"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAISubmit(); // Call the submit function
                        }
                      }}
                      className="bg-white border text-sm rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-200"
                    />
                    <button
                      onClick={handleAISubmit}
                      className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-400"
                    >
                      Envoyer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
