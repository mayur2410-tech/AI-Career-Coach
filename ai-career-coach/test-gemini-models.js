const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("Using API Key:", process.env.GEMINI_API_KEY ? "Set with length " + process.env.GEMINI_API_KEY.length : "NOT SET");

    try {
        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-2.0-flash-exp"];

        for (const modelName of models) {
            process.stdout.write(`Testing ${modelName}... `);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`✅ Success!`);
            } catch (error) {
                console.log(`❌ Failed:`);
                console.error(JSON.stringify(error, null, 2));
                if (error.response) console.error("Response:", error.response);
            }
        }
    } catch (error) {
        console.error("Script error:", error);
    }
}

listModels();
