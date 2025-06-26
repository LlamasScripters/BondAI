import 'dotenv/config';

import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { loadAgentPrompt } from "./generate_prompt.mts";

// Import seulement les tools ultra-simples (pour éviter toute erreur)
import { structureUserData } from "./tools/data-structurer.mts";
import { projectFileGeneratorUltraSimple } from "./tools/project-file-generator-ultra-simple.mts";

const portfolioCreatorPrompt = loadAgentPrompt('portfolio-creator');

const agentModel = new ChatGoogleGenerativeAI({
  temperature: 0.7,
  model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
});

const agentCheckpointer = new MemorySaver();

// Export de l'ancien agent LangGraph (désactivé car il cause des erreurs)
// export const portfolioCreatorAgent = createReactAgent({
//   prompt: portfolioCreatorPrompt,
//   llm: agentModel,
//   tools: [
//     structureUserData,
//     projectFileGeneratorUltraSimple
//   ],
//   checkpointSaver: agentCheckpointer,
// });

// Export du nouvel agent basic via wrapper
import { portfolioCreatorAgentWrapper } from "./portfolio-creator-wrapper.mts";
export const portfolioCreatorAgent = portfolioCreatorAgentWrapper; 