# Career Compass in Firebase Studio

This is a Next.js starter application for Career Compass in Firebase Studio.

## Getting Started

To run this application and its AI features, you'll need to set up your environment correctly.

### 1. Set up your Environment Variables

The application uses Google's Gemini model for its AI capabilities, which requires an API key.

1.  Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate a free API key.
2.  Open the `.env` file in the project root.
3.  Add your API key to the `.env` file like this:

    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```

### 2. Run the Application

This project requires **two separate processes** to run at the same time in two different terminals:

1.  **Terminal 1: Run the Next.js Frontend**
    This command starts the main web application.
    ```bash
    npm run dev
    ```

2.  **Terminal 2: Run the Genkit AI Server**
    This command starts the local server that your app communicates with for all AI tasks.
    ```bash
    npm run genkit:watch
    ```

Once both are running, you can open `http://localhost:9002` in your browser to use the app. All your answers will now be sent to the AI for a personalized response.
