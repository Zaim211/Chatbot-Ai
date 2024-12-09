const { OpenAI } = require('openai'); // Import OpenAI SDK
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Set up OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is in your .env file
});

class BotController {
  static async Botgenai(req, res) {
    const { input } = req.body; // Input comes from the body

    if (!input) {
      return res.status(400).json({ message: 'Input is required.' });
    }

    let response = {};

    try {
      // Check if the user is asking about "how the bot works"
      if (input.toLowerCase().includes('comment ça fonctionne')) {
        // Define the prompt to explain why BotAI is used for your project
        // const prompt = `
        //   You are an AI assistant designed to explain how BotAI works for a project. 
        //   The user is asking how BotAI functions in their specific project, which is focused on improving business efficiency, 
        //   answering client inquiries, and generating leads for growth. You need to explain that BotAI helps respond to client questions 
        //   and generate leads by automatically identifying key information and sending it to the dashboard. Make it clear that this 
        //   process helps save time and enhances productivity by handling routine tasks and helping to capture business opportunities.

        //   Respond with this specific information, emphasizing the role of AI in automating customer interactions and lead generation.
        // `;
        const prompt = `
        You are an AI assistant designed to explain how BotAI works for a project. 
        The user is asking how BotGeneration.Ai functions in their specific project, which is focused on improving business efficiency, 
        answering client inquiries, and generating leads for growth. Your response must:
        1. Be **organized**: Provide a clear explanation with each point on a separate line.
        2. Be **concise**: Use short sentences to deliver information without unnecessary details.
      
        Explain in this format:
        - **Purpose**: Describe the main goal of BotGeneration.Ai in one line.
        - **Feature 1**: How it answers client questions (in one line).
        - **Feature 2**: How it generates leads (in one line).
        - **Feature 3**: How it provides insights to the dashboard (in one line).
        - **Value**: Summarize how it saves time, increases productivity, and supports business growth (in one or two lines).
      
        Example Response:
        - **Purpose**: BotGeneration.Ai improves business efficiency through AI-driven automation.
        - **Feature 1**: It answers client inquiries quickly and accurately.
        - **Feature 2**: It identifies and collects key information for lead generation.
        - **Feature 3**: It sends organized data to the company dashboard for decision-making.
        - **Value**: This automation saves time, boosts productivity, and captures growth opportunities.
      `;
      


        // Send the prompt to GPT for response
        const gptResponse = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful assistant for BotAI, focusing on explaining the project-specific use of the bot.' },
            { role: 'user', content: input }, // Send the user input directly to GPT
            { role: 'assistant', content: prompt }, // Include the project-specific prompt as guidance for GPT
          ],
        });

        console.log("GPT response:", gptResponse.choices[0].message.content);

        // Set the GPT response to the message
        response.message = gptResponse.choices[0].message.content;
      } else {
        // If no predefined match, send the input to GPT to generate a general response
        console.log(`No predefined match, sending query to GPT: ${input}`);
        const gptResponse = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant for BotGeneration.Ai. If the user’s question relates to predefined scenarios, provide the corresponding answer or options. Otherwise, generate a helpful, context-appropriate response.',
            },
            {
              role: 'user',
              content: `The user is asking: "${input}". Respond in a helpful and informative way.`,
            },
          ],
        });

        console.log("GPT response:", gptResponse.choices[0].message.content);

        // Return the GPT-generated response to the frontend
        response.message = gptResponse.choices[0].message.content;
      }
    } catch (error) {
      console.error("Error with GPT:", error);
      response.message = "I'm sorry, I couldn't generate a response at the moment.";
    }

    res.json(response); // Return the response to the frontend
  }
}

module.exports = BotController;
