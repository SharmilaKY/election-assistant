// 🔥 Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🧠 Context
let context = {
    age: null,
    step: "start"
};

// 🌐 Language
const langData = {
    en: {
        welcome: "Welcome! Type 'start' to begin.",
        askAge: "What is your age?",
        eligible: "You are eligible ✔️. Next: Find booth?",
        notEligible: "You are not eligible ❌",
        booth: "Showing nearby polling booths..."
    },
    ta: {
        welcome: "வரவேற்கிறோம்! 'start' என টাইப் செய்யவும்",
        askAge: "உங்கள் வயது என்ன?",
        eligible: "நீங்கள் தகுதி உள்ளவர் ✔️",
        notEligible: "தகுதி இல்லை ❌",
        booth: "அருகிலுள்ள வாக்குச்சாவடி..."
    }
};

// 🧠 Main Handler
async function handleQuery() {
    const input = getInput();
    const lang = getLang();

    addMessage(input, "user");

    let response = process(input, lang);

    addMessage(response, "bot");

    await db.collection("queries").add({
        text: input,
        time: new Date()
    });

    document.getElementById("userInput").value = "";
}

// 🧠 Logic Engine
function process(input, lang) {

    if (input === "start") {
        context.step = "age";
        return langData[lang].askAge;
    }

    if (context.step === "age") {
        let age = parseInt(input);
        context.age = age;

        if (age >= 18) {
            context.step = "booth";
            return langData[lang].eligible;
        } else {
            return langData[lang].notEligible;
        }
    }

    if (input.includes("booth")) {
        loadMap();
        return langData[lang].booth;
    }

    return "Type 'start' to begin.";
}

// 🧩 UI
function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type;
    div.innerText = text;
    document.getElementById("chatBox").appendChild(div);
}

// 🌍 Map
function loadMap() {
    document.getElementById("map").innerHTML =
        `<iframe width="100%" height="300"
        src="https://www.google.com/maps?q=polling+booth+near+me&output=embed"></iframe>`;
}

// 🎤 Voice
function startVoice() {
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = function (event) {
        document.getElementById("userInput").value =
            event.results[0][0].transcript;
    };
    recognition.start();
}

// Helpers
function getInput() {
    return document.getElementById("userInput").value.toLowerCase();
}

function getLang() {
    return document.getElementById("language").value;
}