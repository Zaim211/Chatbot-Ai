// const { OpenAI } = require('openai'); // Import OpenAI SDK
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// // Set up OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in your .env file
// });

// class BotController {
//   static async Botgenai(req, res) {
//     const { input } = req.body; // Input comes from the body

//     if (!input) {
//       return res.status(400).json({ message: 'Input is required.' });
//     }

//     let response = {};

//     try {
//       // Check if the user is asking about "how the bot works"
//       if (input.toLowerCase().includes('comment ça fonctionne')) {
//         // Define the prompt to explain why BotAI is used for your project
//         // const prompt = `
//         //   You are an AI assistant designed to explain how BotAI works for a project. 
//         //   The user is asking how BotAI functions in their specific project, which is focused on improving business efficiency, 
//         //   answering client inquiries, and generating leads for growth. You need to explain that BotAI helps respond to client questions 
//         //   and generate leads by automatically identifying key information and sending it to the dashboard. Make it clear that this 
//         //   process helps save time and enhances productivity by handling routine tasks and helping to capture business opportunities.

//         //   Respond with this specific information, emphasizing the role of AI in automating customer interactions and lead generation.
//         // `;
   

// //       const prompt = `
// // You are an AI assistant tasked with explaining how BotGeneration.Ai functions for a project focused on improving business efficiency, answering client inquiries, and generating leads for growth. Follow these instructions strictly:

// // 1. Your response must be **organized**: Use the exact format provided, with each explanation clearly separated.
// // 2. Be **concise**: Use short, direct sentences without unnecessary details or extra elaboration.

// // Respond in this format:
// // - **Purpose**: [Explain the main purpose of BotGeneration.Ai in one line.]
// // - **Feature 1**: [Explain how it answers client questions in one line.]
// // - **Feature 2**: [Explain how it generates leads in one line.]
// // - **Feature 3**: [Explain how it provides insights to the dashboard in one line.]
// // - **Value**: [Summarize how it saves time, increases productivity, and supports business growth in one or two lines.]

// // Example Response:
// // - **Purpose**: BotGeneration.Ai improves business efficiency through AI-driven automation.
// // - **Feature 1**: It answers client inquiries quickly and accurately.
// // - **Feature 2**: It identifies and collects key information for lead generation.
// // - **Feature 3**: It sends organized data to the company dashboard for decision-making.
// // - **Value**: This automation saves time, boosts productivity, and captures growth opportunities.

// // Ensure your response matches this format exactly. Do not include additional information or deviate from the structure.
// // `;
// const prompt = `
// You are an AI assistant tasked with explaining how BotGeneration.Ai functions for a project. The project focuses on improving business efficiency, answering client inquiries, and generating leads for growth. Your response must strictly adhere to the following:

// 1. **Organization**: Ensure each section starts on a **new line** with no exceptions. Use double line breaks for clear separation.
// 2. **Conciseness**: Keep the sentences short and to the point.
// 3. Use the format below, strictly maintaining the structure and spacing:

// Example Format:
  
// - **Objectif**: [State the main purpose of BotGeneration.Ai.]
  
// - **Fonctionnalité 1**: [Explain how it answers client inquiries.]
  
// - **Fonctionnalité 2**: [Explain how it generates leads.]
  
// - **Fonctionnalité 3**: [Explain how it provides insights to the dashboard.]
  
// - **Valeur**: [Summarize how it adds value in terms of time savings, productivity, and business growth.]

// Ensure the response is formatted exactly like this with **new lines** separating each point. Any deviation will be considered incorrect.`;


      


//         // Send the prompt to GPT for response
//         const gptResponse = await openai.chat.completions.create({
//           model: 'gpt-4',
//           messages: [
//             { role: 'system', content: 'You are a helpful assistant for BotGeneration, focusing on explaining the project-specific use of the bot.' },
//             { role: 'user', content: input }, // Send the user input directly to GPT
//             { role: 'assistant', content: prompt }, // Include the project-specific prompt as guidance for GPT
//           ],
//         });

//         console.log("GPT response:", gptResponse.choices[0].message.content);

//         // Set the GPT response to the message
//         response.message = gptResponse.choices[0].message.content;
//       } else {
//         // If no predefined match, send the input to GPT to generate a general response
//         console.log(`No predefined match, sending query to GPT: ${input}`);
//         const gptResponse = await openai.chat.completions.create({
//           model: 'gpt-4',
//           messages: [
//             {
//               role: 'system',
//               content: 'You are a helpful assistant for BotGeneration.Ai. If the user’s question relates to predefined scenarios, provide the corresponding answer or options. Otherwise, generate a helpful, context-appropriate response.',
//             },
//             {
//               role: 'user',
//               content: `The user is asking: "${input}". Respond in a helpful and informative way.`,
//             },
//           ],
//         });

//         console.log("GPT response:", gptResponse.choices[0].message.content);

//         // Return the GPT-generated response to the frontend
//         response.message = gptResponse.choices[0].message.content;
//       }
//     } catch (error) {
//       console.error("Error with GPT:", error);
//       response.message = "I'm sorry, I couldn't generate a response at the moment.";
//     }

//     res.json(response); // Return the response to the frontend
//   }
// }

// module.exports = BotController;











































const { OpenAI } = require('openai'); // Import OpenAI SDK
const puppeteer = require('puppeteer'); // Import Puppeteer for scraping dynamic content
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Set up OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in your .env file
});

// URL to scrape
const TARGET_URL = "https://chatbot-ai-wine.vercel.app";

// Scrape the website for content using Puppeteer
// async function scrapeTargetWebsite() {
//   try {
//     console.log(`[INFO] Starting to scrape the target URL: ${TARGET_URL}`);

//     // Launch headless browser
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
    
//     // Visit the website
//     await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });  // Wait for network to be idle (fully loaded)

//     // Get the content after JavaScript has rendered
//     const content = await page.evaluate(() => {
//       // Extract sections by matching the title text
//       const sections = {
//         chatbot: Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes("Comment ça marche notre Chatbot ?"))?.nextElementSibling?.innerText || "Section not found.",
//         service: Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes("Optimisez votre service client avec BotGeneration.AI"))?.nextElementSibling?.innerText || "Section not found.",
//         contact: Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes("Contact"))?.nextElementSibling?.innerText || "Section not found."
//       };

//       return sections;
//     });

//     console.log(`[INFO] Extracted content: ${JSON.stringify(content)}`);
    
//     await browser.close();

//     return content;
//   } catch (error) {
//     console.error(`[ERROR] Failed to scrape the website: ${error.message}`);
//     return null;
//   }
// }
// Scrape the website for content using Puppeteer
async function scrapeTargetWebsite() {
  try {
    console.log(`[INFO] Starting to scrape the target URL: ${TARGET_URL}`);

    // Launch headless browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Visit the website
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });  // Wait for network to be idle (fully loaded)

    // Get the content after JavaScript has rendered
    const content = await page.evaluate(() => {
      // Extract sections by matching the title text
      const sections = {
        chatbot: Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes("Comment ça marche notre Chatbot ?"))?.nextElementSibling?.innerText || "Section not found.",
        service: Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes("Optimisez votre service client avec BotGeneration.Ai"))?.nextElementSibling?.innerText || "Section not found.",
        contact: Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes("Contact"))?.nextElementSibling?.innerText || "Section not found."
      };

      return sections;
    });

    console.log(`[INFO] Extracted content: ${JSON.stringify(content)}`);
    
    await browser.close();

    return content;
  } catch (error) {
    console.error(`[ERROR] Failed to scrape the website: ${error.message}`);
    return null;
  }
}


let generalQuestionCount = 0; // Global counter for general questions

class BotController {
  static async Botgenai(req, res) {
    const { input } = req.body; // Input comes from the body

    // Log the incoming input for debugging
    console.log(`[INFO] Received input: ${input}`);

    if (!input) {
      console.warn("[WARNING] No input provided in the request body.");
      return res.status(400).json({ message: 'Input is required.' });
    }

    let response = {};

    // Check if the input relates to the target URL (special scraping-related queries)
    if (input.toLowerCase().includes('chatbot') || input.toLowerCase().includes('service client') || input.toLowerCase().includes('contact')) {
      console.log("[INFO] Detected keywords for scraping. Starting to scrape the target URL...");

      const scrapedData = await scrapeTargetWebsite();

      if (scrapedData) {
        try {
          console.log("[INFO] Sending scraped data to GPT for response generation...");

        //   const gptPrompt = `
        //   Voici les sections extraites du site web :

        //   - Comment fonctionne le Chatbot : ${scrapedData.chatbot}
        //   - Optimisation du service avec BotGeneration.AI : ${scrapedData.service}
        //   - Informations de contact : ${scrapedData.contact}

        //   Veuillez générer un résumé concis pour chaque section sans HTML ni CSS :
        //   1. Comment fonctionne le chatbot
        //   2. Comment BotGeneration.AI optimise le service client
        //   3. Comment contacter l'équipe de service
        // `;
        const gptPrompt = `
        Voici les sections extraites du site web :
      
        - Comment fonctionne le Chatbot : ${scrapedData.chatbot}
        - Optimisation du service avec BotGeneration.AI : ${scrapedData.service}
        - Informations de contact : ${scrapedData.contact}
      
        Veuillez répondre directement à la question suivante basée sur la section demandée, sans mentionner le titre de la section ou la phrase "La section...":
        "${input}"
      `;
      


          const gptResponse = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
              { role: 'system', content: "You are a chatbot that summarizes and organizes website content" },
              { role: 'user', content: gptPrompt }
            ]
          });
          response.message = gptResponse.choices[0].message.content;
         
          console.log("[INFO] GPT response successfully generated.");
        } catch (error) {
          console.error("[ERROR] Failed to generate GPT response:", error.message);
          response.details = "Désolé, je n'ai pas pu générer une réponse pour le moment.";
        }
      } else {
        console.warn("[WARNING] No data scraped from the target URL.");
        response.details = "Désolé, je n'ai pas pu récupérer les détails du site Web.";
      }
    } else if (generalQuestionCount < 3) {
      // Handle general questions (limit to 4)
      console.log("[INFO] General question detected. Responding...");

      const gptPromptGeneral = `Answer this general question: "${input}" in a clear and concise manner.`;

      try {
        const gptResponseGeneral = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: "You are a helpful assistant that answers general questions." },
            { role: 'user', content: gptPromptGeneral }
          ]
        });

        response.message = gptResponseGeneral.choices[0].message.content;
        generalQuestionCount++; // Increment the general question counter
        console.log("[INFO] General question response generated.");
      } catch (error) {
        console.error("[ERROR] Failed to generate general question response:", error.message);
        response.message = "Désolé, je n'ai pas pu générer une réponse pour votre question générale.";
      }
    } else {
      console.log("[INFO] Limit reached for general questions. No response will be given.");
      response.message = "Désolé, vous avez atteint la limite de 4 questions générales. Veuillez poser des questions spécifiques.";
    }

    // Log the response being sent
    console.log("[INFO] Response sent to the frontend:", response);

    // Return the response to the frontend
    res.json(response);
  }
}

module.exports = BotController;
