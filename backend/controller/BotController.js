const { OpenAI } = require('openai'); // Import OpenAI SDK
const puppeteer = require('puppeteer'); // Import Puppeteer for scraping dynamic content
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

// Set up OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in your .env file
});

// URL to scrape
const TARGET_URL = "https://chatbot-ai-wine.vercel.app";

// Scrape the website for content using Puppeteer
async function scrapeTargetWebsite() {
  try {
    console.log(`[INFO] Starting to scrape the target URL: ${TARGET_URL}`);

    // Launch headless browser
    const browser = await puppeteer.launch({ 
      headless: "new", // Run in headless mode
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process'
      ]
    });
    const page = await browser.newPage();
    
    // Visit the website
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });  // Wait for network to be idle (fully loaded)

    // Get the content after JavaScript has rendered
    const content = await page.evaluate(() => {
      // Extract sections by matching the title text
      const sections = {
        chatbot: Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes("Comment ça marche notre Chatbot ?"))?.nextElementSibling?.innerText || "Section not found.",
        service: Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes("Optimisez votre service client avec BotGeneration.AI"))?.nextElementSibling?.innerText || "Section not found.",
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


let generalQuestionCount = 0;

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
    if (input.toLowerCase().includes('chatbot') || input.toLowerCase().includes('services') 
      || input.toLowerCase().includes('contact') || input.toLowerCase().includes('comment ça marche')
    || input.toLowerCase().includes('optimisez votre service client') || input.toLowerCase().includes('CGU') ||
  input.toLowerCase().includes('ai') || input.toLowerCase().includes('Politique de confidentialité'))
    {
    
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
        
            Instructions:
            1. Use the website content ${scrapedData} to provide accurate, relevant answers
            2. Write in a clear and concise manner without HTML or CSS
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

