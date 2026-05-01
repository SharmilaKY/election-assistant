// 🔥 Firebase Config (REPLACE THIS)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🌐 Language Content
const content = {
    en: {
        vote: "Steps: Register → Verify ID → Visit booth → Cast vote",
        eligible: (age) => age >= 18 ? "Eligible ✔️" : "Not eligible ❌",
        date: "Election Date: 10 May (Demo)",
        booth: "Showing nearby polling booths...",
        invalid: "Enter a valid age.",
        unknown: "Try: vote / eligible / date / booth",
        suggest: "Next: Find your polling booth?"
    },
    ta: {
        vote: "படிகள்: பதிவு → அடையாளம் → வாக்களி",
        eligible: (age) => age >= 18 ? "தகுதி உள்ளது ✔️" : "தகுதி இல்லை ❌",
        date: "தேர்தல் தேதி: மே 10",
        booth: "அருகிலுள்ள வாக்குச்சாவடிகள்...",
        invalid: "சரியான வயது உள்ளிடவும்",
        unknown: "முயற்சி: vote / eligible / date / booth",
        suggest: "அடுத்து: வாக்குச்சாவடி பார்க்கவா?"
    }
};

// Main
async function handleQuery() {
    const lang = getLang();
    const input = getInput();
    const intent = detectIntent(input);

    let response = "";

    if (intent === "eligibility") {
        let age = prompt("Enter age:");
        response = checkEligibility(age, lang);
    } else {
        response = generateResponse(intent, lang);
    }

    showResponse(response);
    showSuggestion(lang);

    await saveQuery(input, intent);

    if (intent === "booth") loadMap();
    loadHistory();
}

// Helpers
function getLang() {
    return document.getElementById("language").value;
}

function getInput() {
    return document.getElementById("userInput").value.toLowerCase();
}

function detectIntent(input) {
    if (input.includes("vote")) return "vote";
    if (input.includes("eligible") || input.includes("age")) return "eligibility";
    if (input.includes("date")) return "date";
    if (input.includes("booth")) return "booth";
    return "unknown";
}

function generateResponse(intent, lang) {
    return content[lang][intent] || content[lang].unknown;
}

function checkEligibility(age, lang) {
    if (!age || isNaN(age)) return content[lang].invalid;
    return content[lang].eligible(age);
}

// UI Updates
function showResponse(res) {
    document.getElementById("response").innerText = res;
}

function showSuggestion(lang) {
    document.getElementById("suggestion").innerText = content[lang].suggest;
}

// 🌍 Map
function loadMap() {
    document.getElementById("mapContainer").innerHTML = `
        <iframe width="100%" height="300"
        src="https://www.google.com/maps?q=polling+booth+near+me&output=embed"></iframe>
    `;
}

// 🔥 Firebase
async function saveQuery(query, intent) {
    await db.collection("queries").add({
        query, intent, time: new Date()
    });
}

// History
async function loadHistory() {
    const snapshot = await db.collection("queries")
        .orderBy("time", "desc")
        .limit(3)
        .get();

    let html = "<h3>Recent</h3>";
    snapshot.forEach(doc => {
        html += `<p>${doc.data().query}</p>`;
    });

    document.getElementById("history").innerHTML = html;
}