import 'dotenv/config';

import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { loadAgentPrompt } from "./generate_prompt.mts";
import { generatePortfolioSection } from "./tools/generate-section.mts";
import { optimizeForIndustry } from "./tools/optimize-industry.mts";
import { generateProjectDescription } from "./tools/generate-project.mts";
import { createPortfolioHTML } from "./tools/create-html.mts";
import { suggestSkills } from "./tools/suggest-skills.mts";

const portfolioCreatorPrompt = loadAgentPrompt('portfolio-creator');

const agentModel = new ChatGoogleGenerativeAI({ 
  temperature: 0.7,
  model: process.env.GEMINI_MODEL,
});

const agentCheckpointer = new MemorySaver();

export const portfolioCreatorAgent = createReactAgent({
  prompt: portfolioCreatorPrompt,
  llm: agentModel,
  tools: [
    generatePortfolioSection,
    optimizeForIndustry,
    generateProjectDescription,
    createPortfolioHTML,
    suggestSkills
  ],
  checkpointSaver: agentCheckpointer,
}); 