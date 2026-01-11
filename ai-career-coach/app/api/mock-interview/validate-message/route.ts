import { NextResponse } from 'next/server';

const BLOCKED_KEYWORDS = [
    // === JOKES & ENTERTAINMENT ===
    "tell me a joke",
    "joke",
    "funny",
    "meme",
    "laugh",
    "comedy",
    "riddle",
    "puzzle",
    
    // === OFF-TOPIC CONVERSATION ===
    "weather",
    "how are you",
    "what's your name",
    "who made you",
    "who created you",
    "where are you from",
    "do you have feelings",
    "are you real",
    "age",
    "favorite",
    "like or dislike",
    "opinion on",
    "what do you think about",
    
    // === PROMPT INJECTION / JAILBREAK ===
    "ignore previous instructions",
    "ignore all previous",
    "disregard",
    "forget everything",
    "new instructions",
    "system prompt",
    "you are now",
    "act as",
    "pretend to be",
    "roleplay",
    "simulate",
    "from now on",
    "restart",
    "reset",
    "override",
    "bypass",
    
    // === HELP/HOMEWORK REQUESTS ===
    "help me with",
    "solve this",
    "homework",
    "assignment",
    "do my",
    "complete this",
    "write code for",
    "debug this",
    "fix my code",
    "what's the answer",
    "give me the solution",
    
    // === SECURITY/HACKING ===
    "hack",
    "password",
    "credentials",
    "bypass security",
    "vulnerability",
    "exploit",
    "access",
    "admin",
    "root",
    
    // === ENTERTAINMENT REQUESTS ===
    "dance",
    "sing",
    "song",
    "rap",
    "poem",
    "story",
    "movie",
    "game",
    "play",
    "music",
    
    // === PERSONAL/INAPPROPRIATE ===
    "love",
    "date",
    "marry",
    "kiss",
    "sex",
    "girlfriend",
    "boyfriend",
    "relationship",
    
    // === FOOD/CASUAL CHAT ===
    "hungry",
    "food",
    "eat",
    "drink",
    "restaurant",
    "recipe",
    "cook",
    
    // === SPORTS/NEWS ===
    "sports",
    "football",
    "cricket",
    "match",
    "score",
    "news",
    "politics",
    "election",
    
    // === SHOPPING/RECOMMENDATIONS ===
    "buy",
    "shopping",
    "recommend",
    "suggest a product",
    "best phone",
    "best laptop",
    "price",
    
    // === TIME WASTING ===
    "wait",
    "hold on",
    "give me a minute",
    "let me think",
    "umm",
    "errr",
    "I don't know",
    "skip",
    "pass",
    "next question",
    
    // === TESTING THE SYSTEM ===
    "test",
    "testing",
    "can you",
    "are you able to",
    "what can you do",
    "what are your capabilities",
    "show me",
    "prove it",
    
    // === EMOTIONAL MANIPULATION ===
    "I'm sad",
    "I'm depressed",
    "help me feel better",
    "comfort me",
    "I need therapy",
    "mental health",
    
    // === COMPARISON/EVALUATION ===
    "who is better",
    "compare yourself",
    "are you better than",
    "chatgpt vs",
    "gemini vs",
    
    // === PHILOSOPHICAL/EXISTENTIAL ===
    "meaning of life",
    "purpose",
    "existence",
    "philosophy",
    "god",
    "religion",
    
    // === TRAVEL ===
    "travel",
    "vacation",
    "trip",
    "visit",
    "tourist",
    "hotel",
    
    // === CELEBRITY/GOSSIP ===
    "celebrity",
    "famous person",
    "actor",
    "actress",
    "singer",
    "gossip",
    
    // === TECHNICAL MANIPULATION ===
    "API key",
    "token",
    "configuration",
    "settings",
    "parameters",
    "backend",
    "database",
    "show me your code",
    
    // === INTERVIEW AVOIDANCE ===
    "can we talk about something else",
    "change topic",
    "boring",
    "don't want to answer",
    "refuse to answer",
    "not interested",
    "this is stupid",
    "waste of time",
    
    // === MULTI-LANGUAGE ATTEMPTS ===
    "hello in hindi",
    "speak hindi",
    "speak spanish",
    "translate",
    "другой язык", // other language in Russian
    "अन्य भाषा", // other language in Hindi
];

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ isValid: true });
        }

        const lowerCaseMessage = message.toLowerCase();

        // Check if message contains any blocked keywords
        const isSuspicious = BLOCKED_KEYWORDS.some(keyword =>
            lowerCaseMessage.includes(keyword)
        );

        if (isSuspicious) {
            return NextResponse.json({
                isValid: false,
                reason: "Off-topic or suspicious content detected."
            });
        }

        return NextResponse.json({ isValid: true });

    } catch (error) {
        return NextResponse.json({ error: "Validation failed" }, { status: 500 });
    }
}
