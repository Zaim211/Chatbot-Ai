import React, { useState, useEffect, useRef } from "react";
import botImage from "../assets/bot.png";
import imgbot from "../assets/imgbot.png";
import instagram from "../assets/istg.jfif";
import { scenarios } from "../constants/scénario";
import { sendChatData } from '../api/sendChatData';

const Chatbot = () => {
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [currentScenario, setCurrentScenario] = useState("initial");
  const [userInfo, setUserInfo] = useState({});
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

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const isValidFrenchPhone = (phone) => {
    // Removing spaces, dots, and hyphens before checking the regex
    const sanitizedPhone = phone.replace(/\s|\.|-/g, '');
  
    // Regex to check valid French phone number format (e.g., +33 624423423 or +33 6 24 42 34 23)
    const regex = /^\+33[1-9]\d{8}$/;
  
    return regex.test(sanitizedPhone);
  };
  
  const sendData = (userChoice, inputValue) => {
    // Grouping data
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
        // scenarios[currentScenario].invalidResponse.forEach((message) => {
        //   displayMessageWithTypingIndicator(message, "bot");
        // });
 
        // displayMessageWithTypingIndicator(
        //   scenarios[currentScenario].question,
        //   "bot"
        // );
        
        // setUserInfo((prevUserInfo) => ({
        //   ...prevUserInfo,
        //   [scenarios[currentScenario].inputType]: "",
        // }));
        // return; 
  
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
    } 
    else if (currentScenario === "request_email") {
  
      
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
    } 
    else if (currentScenario === "request_phone") {
      displayMessageWithTypingIndicator(
        scenarios[currentScenario].botResponse,
        "bot"
      );
      setTimeout(() => {
        displayMessageWithTypingIndicator(
          scenarios[nextScenario].question,
          "bot"
        );
        setCurrentScenario(nextScenario)
      }, 3000);
    } 
    else if (currentScenario === "entreprise") {
      setTimeout(() => {
        displayMessageLineByLine(
            scenarios[currentScenario].botResponse,
            "bot"
        );
    }, 3000)
       
    } 
    else if (currentScenario === "contact") {
       setTimeout(() => {
        displayMessageLineByLine(
            scenarios[currentScenario].botResponse,
            "bot"
        );
    }, 3000);
    } 
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [scenarios[currentScenario].inputType]: "",
    }));

    setCurrentScenario(nextScenario);
  
    sendData(currentScenario, userInfo[scenarios[currentScenario].inputType]);

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
    } 
    else if (nextScenario === "verification_phone"){
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
    else if (nextScenario === "pose_question"){
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
    sendData(currentScenario, selectedOptionLabel, userInfo[scenarios[currentScenario].inputType]);
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

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before showing next line
        displayNextLine(index + 1);
        setIsTyping(false);
      } else {
        setIsTyping(false);
        // if (callback) callback();
      }
    };

    displayNextLine(0);
  };

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
   

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: courseCard, sender: "bot" },
    ]);
  };

  const displayCardAds = () => {
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
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: courseCards, sender: "bot" },
    ]);
  } 

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
          //   displayMessageLineByLine(scenarios.initial.question, "bot");
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
    // <div>
    //   <div className="fixed bottom-4 z-50 right-4 flex items-center cursor-pointer">
    //     {isChatVisible ? (
    //       <button
    //         onClick={closeChat}
    //         className="text-gray-500 hover:text-red-500"
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth="1.5"
    //           stroke="currentColor"
    //           className="w-12 h-12"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M6 18L18 6M6 6l12 12"
    //           />
    //         </svg>
    //       </button>
    //     ) : (
    //       <div className="flex items-center  text-black shadow-lg rounded-lg">
    //         {hasInteracted ? (
    //           <img
    //             src={botImage}
    //             onClick={toggleChatVisibility}
    //             alt="Bot Logo"
    //             className="w-32 h-32"
    //           />
    //         ) : (
    //           <div className="flex items-center bg-white text-black shadow-lg rounded-lg p-3">
    //             <img src={botImage} alt="Bot Logo" className="w-16 h-16" />
    //             <div>
    //               <span className="text-text-sm  font-semibold">
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
    //     )}
    //   </div>

    //   {isChatVisible && (
    //     <div className="fixed bottom-16 right-4  bg-white rounded-lg shadow-lg p-2 w-full max-w-md border border-gray-300 z-50">
    //       <div
    //         className="h-[400px] w-full overflow-y-auto flex flex-col"
    //         ref={chatContainerRef}
    //       >
    //         {messages.map((msg, index) => (
    //           <div
    //             key={index}
    //             className={`flex ${
    //               msg.sender === "user"
    //                 ? "justify-end"
    //                 : "justify-start items-center"
    //             }`}
    //           >
    //             {msg.sender === "bot" && (
    //               <img
    //                 src={botImage}
    //                 alt="Bot"
    //                 className="w-16 h-16 rounded-full"
    //               />
    //             )}
    //             <div
    //               className={`p-2 max-w-xs rounded-lg ${
    //                 msg.sender === "user"
    //                   ? "bg-blue-500 text-sm mr-3 text-white"
    //                   : " text-sm  text-gray-800"
    //               }`}
    //             >
    //               {msg.text}
    //             </div>
    //           </div>
    //         ))}
    //         {isTyping && (
    //           <div className="flex items-center">
    //             <img
    //               src={botImage}
    //               alt="Bot Typing"
    //               className="w-12 h-12 rounded-full mr-2"
    //             />
    //             <div className="text-gray-500 text-sm font-bold">
    //               Bot est en train d'écrire...
    //             </div>
    //           </div>
    //         )}
    //         <div className="mt-4 text-left">
    //           {!isTyping && scenarios[currentScenario].options && (
    //             <div className="flex flex-col items-end space-y-2">
    //               {scenarios[currentScenario].options.map((option, index) => (
    //                 <button
    //                   key={index}
    //                   onClick={() =>
    //                     handleOptionClick(option.label, option.next)
    //                   }
    //                   className="text-blue-500 border mr-3 border-blue-500 text-sm py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white"
    //                 >
    //                   {option.label}
    //                 </button>
    //               ))}
    //             </div>
    //           )}

    //           {!isTyping && scenarios[currentScenario].inputType && (
    //             <div className="mt-4 w-full">
    //               {/* Divider line */}
    //               <div className="border-b border-gray-300 mb-2"></div>

    //               {/* Input and button container */}
    //               <div className="flex items-center justify-between">
    //                 <input
    //                   type={scenarios[currentScenario].inputType}
    //                 placeholder={`Entrez votre ${
    //                     scenarios[currentScenario].inputType === "email"
    //                       ? "email"
    //                       : scenarios[currentScenario].inputType === "name"
    //                       ? "nom"
    //                       : scenarios[currentScenario].inputType === "phone"
    //                       ? "numéro de téléphone"
    //                       : scenarios[currentScenario].inputType === "contact"
    //                       ? "contact"
    //                       : scenarios[currentScenario].inputType === "entreprise"
    //                       ? "entreprise" : ""
    //                   }`}
    //                   value={
    //                     userInfo[scenarios[currentScenario].inputType] || ""
    //                   }
    //                   onChange={(e) =>
    //                     setUserInfo({
    //                       ...userInfo,
    //                       [scenarios[currentScenario].inputType]:
    //                         e.target.value,
    //                     })
    //                   }
    //                   className="bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-white p-2 text-gray-600  w-full"
    //                 />
    //                 <button
    //                   onClick={handleInputSubmit}
    //                   className="mr-2 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400"
    //                 >
    //                   Envoyer
    //                 </button>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div>
  {/* Header section above the chat, visible only when isChatVisible is true */}
 

  {/* Chat component */}
  <div className="fixed bottom-4 z-50 right-4 flex items-center cursor-pointer">
    {isChatVisible ? (
      <button onClick={closeChat}  className="bg-black text-white hover:bg-gray-800  rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    ) : (
      <div className="flex items-center text-black shadow-lg rounded-lg">
        {hasInteracted ? (
          <img
            src={botImage}
            onClick={toggleChatVisibility}
            alt="Bot Logo"
            className="w-32 h-32"
          />
        ) : (
          <div className="flex items-center bg-white text-black shadow-lg rounded-lg p-3">
            <img src={botImage} alt="Bot Logo" className="w-16 h-16" />
            <div>
              <span className="text-sm font-semibold">
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
    )}
  </div>

  {isChatVisible && (
    <div className="fixed bottom-16 right-4 bg-white rounded-lg mb-2 pb-2 w-[95%] sm:w-[90%] md:w-[80%] lg:max-w-md  max-w-sm  z-50">  
      <div className="flex items-center relative bg-black text-white p-2  top-0 left-0 rounded-t-lg w-full">
      <img src={botImage} alt="Bot Logo" className="w-16 h-16 mr-3" />
      
      <div>
        <div className="flex gap-2 items-center">
        <span className="text-md font-semibold">COVERBOTAI</span>
        <div className=" w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <p className="text-sm text-gray-100">
        {isTyping ? "En train d'écrire..." : "En ligne"}
        
        </p>
      </div>
    </div>
      <div
        className="h-[400px] w-full overflow-y-auto flex flex-col"
        ref={chatContainerRef}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start items-center"
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
              className={`p-2 max-w-xs rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-sm mr-3 text-white"
                  : " text-sm  text-gray-800"
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
            <div className="text-gray-500 text-sm font-bold">
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
                  className="text-blue-500 border mr-3 border-blue-500 text-sm py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
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
                      : scenarios[currentScenario].inputType === "phone (+33 xxxxxxxxx)"
                      ? "numéro de téléphone"
                      : scenarios[currentScenario].inputType === "contact"
                      ? "contact"
                      : scenarios[currentScenario].inputType === "entreprise"
                      ? "entreprise"
                      : ""
                  }`}
                  value={userInfo[scenarios[currentScenario].inputType] || ""}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      [scenarios[currentScenario].inputType]: e.target.value,
                    })
                  }
                  className="bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-white p-2 text-gray-600 w-full"
                />
                <button
                  onClick={handleInputSubmit}
                  className="mr-2 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-400"
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