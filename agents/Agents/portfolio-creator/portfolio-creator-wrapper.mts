import { portfolioCreatorAgentHybrid } from "./portfolio-creator-hybrid.mts";

// Wrapper pour adapter l'agent hybride à l'interface LangGraph
class PortfolioCreatorWrapper {
  async invoke(input: any, config: any) {
    try {
      console.log('🔄 Wrapper: adaptation de l\'appel pour l\'agent basic');
      
      // Extraire le message de l'input LangGraph
      const messages = input.messages || [];
      const lastMessage = messages[messages.length - 1];
      const messageContent = lastMessage?.content || '';
      
      // Extraire le thread_id de la config
      const threadId = config?.configurable?.thread_id;
      
      // Appeler l'agent hybride avec la nouvelle interface
      const result = await portfolioCreatorAgentHybrid.invoke({
        message: messageContent,
        thread_id: threadId
      });
      
      // Adapter la réponse au format LangGraph
      return {
        messages: [
          ...messages,
          {
            type: 'ai',
            content: result.content,
            timestamp: new Date().toISOString()
          }
        ]
      };
      
    } catch (error) {
      console.error('❌ Erreur dans le wrapper:', error);
      
      // Retourner une erreur dans le format attendu
      return {
        messages: [
          ...input.messages,
          {
            type: 'ai',
            content: `❌ Erreur: ${error.message}`,
            timestamp: new Date().toISOString()
          }
        ]
      };
    }
  }

  // Méthode stream pour compatibilité (optionnelle)
  async *stream(input: any, config: any) {
    try {
      const result = await this.invoke(input, config);
      yield result;
    } catch (error) {
      yield {
        messages: [
          ...input.messages,
          {
            type: 'ai',
            content: `❌ Erreur de streaming: ${error.message}`,
            timestamp: new Date().toISOString()
          }
        ]
      };
    }
  }
}

export const portfolioCreatorAgentWrapper = new PortfolioCreatorWrapper(); 