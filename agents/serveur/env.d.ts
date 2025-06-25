declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    REQUIRE_AUTH: string;
    GOOGLE_API_KEY: string;
    GEMINI_MODEL: string;
  }
}