const { OpenAI } = require('openai'); // Import OpenAI SDK
const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');
const { routes } = require('../constants/index'); // Import the routes list

// Load environment variables
dotenv.config();

// Set up OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in your .env file
});

// Scrape the website for route details
async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const content = $('main').text(); // Adjust this selector as per your structure
    return content;
  } catch (error) {
    console.error("Error scraping website:", error);
    return null;
  }
}



class BotController {
  static async Botgenai(req, res) {
    const { input } = req.body; // Input comes from the body

    if (!input) {
      return res.status(400).json({ message: 'Input is required.' });
    }

    let response = {};

    // Log the incoming input for debugging
    console.log(`Received input: ${input}`);

    // Check if the input mentions a route URL or contains keywords related to routes
    let routeMatch = false;
    for (let route of routes) {
      for (let keyword of route.keywords) {
        if (input.toLowerCase().includes(keyword.toLowerCase())) {
          routeMatch = true;
          console.log(`Found route match for keyword: ${keyword}`);

          // If the user asks for details about a route or mentions the route
          if (input.toLowerCase().includes('details' || 'information' || 'plus informations') || input.toLowerCase().includes(route.route)) {
            console.log(`Scraping details for route: ${route.route}`);

            const scrapedData = await scrapeWebsite(route.route);
            if (scrapedData) {
              // Send scraped data to GPT for a more natural response
              const gptResponse = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                  {
                    role: 'system',
                    content: `
                         Vous êtes un chatbot conçu pour extraire uniquement les informations les plus importantes et pertinentes à partir de divers contenus en ligne. 
                  Lorsque l'utilisateur demande des détails, vous devez fournir un résumé clair et concis, en excluant les informations superflues.

                  Instructions :
                  - Fournissez **uniquement les informations clés**.
                  - Organisez les informations de manière concise et structurée, en évitant les répétitions et les détails inutiles.
                  - Si la page contient des liens ou des sections spécifiques, extrayez les points pertinents pour le sujet demandé.
                  - Ignorez les informations secondaires, comme les détails non nécessaires.

                  Contenu : 
                  ${scrapedData}

                    `
                  },
                  {
                    role: 'user',
                    content: `Provide a detailed response based on the following scraped data:\n\n${scrapedData} but organize it in a user-friendly way using css and html`
                  }
                ]
              });

              response.details = gptResponse.choices[0].message.content;
            } else {
              response.details = "Désolé, je n'ai pas pu récupérer les détails pour le moment.";
            }
          } else {
            // Just give the route URL if no details are asked
            response.route = '<div>' +
                    '<span>Vous pouvez trouver plus d\'informations sur cet itinéraire en suivant ce lien :</span>' +
                    '<a href="' + route.route + '" target="_blank" style="color: blue; text-decoration: underline;">' + route.route + '</a>' +
                 '</div>';


          }

          break; // Stop checking after finding a match
        }
      }
      if (routeMatch) break; // Exit the outer loop once a match is found
    }

    if (!routeMatch) {
      // If no route match, send the query to GPT for normal response
      try {
        console.log(`No route match, sending query to GPT: ${input}`); // Log user input for debugging
        const gptResponse = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `
                You are a chatbot integrated into an application. Respond naturally to the user's input. If the input relates to a specific route, provide details or the route URL as appropriate.
                Otherwise, provide a helpful response to the query.
              `
            },
            {
              role: 'user',
              content: input // Send the user's input directly to GPT for processing
            }
          ]
        });

        // Log GPT's response for debugging
        console.log("GPT response:", gptResponse.choices[0].message.content);

        response.message = gptResponse.choices[0].message.content;
      } catch (error) {
        console.error("Error with GPT:", error);
        response.message = "I'm sorry, I couldn't generate a response at the moment.";
      }
    }

    // Return the response to the frontend
    res.json(response);
  }
}

module.exports = BotController;


