
const fetch = require('node-fetch'); // actually recent node has global fetch

async function seed() {
    try {
        console.log("Triggering seed...");
        const res = await fetch('http://localhost:3000/api/mock-interview/seed', { method: 'POST' });
        const data = await res.json();
        console.log("Seed result:", data);
    } catch (e) {
        console.error("Seed failed:", e);
    }
}
seed();
