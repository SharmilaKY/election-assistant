function handleQuery() {
    const input = getInput();
    const response = processInput(input);
    showResponse(response);
}

// Get input safely
function getInput() {
    return document.getElementById("userInput").value.toLowerCase().trim();
}

// Logic engine
function processInput(input) {

    if (input.includes("vote")) {
        return "Steps: Register → Verify ID → Go to booth → Cast vote";
    }

    if (input.includes("eligible")) {
        let age = prompt("Enter your age:");
        return age >= 18 ? "You are eligible to vote ✔️" : "Not eligible ❌";
    }

    if (input.includes("date")) {
        return "Election Date: 10 May (Demo)";
    }

    if (input.includes("booth")) {
        return "Open the Google Maps link below to find your booth.";
    }

    return "Try: vote / eligible / date / booth";
}

// Output
function showResponse(response) {
    document.getElementById("response").innerText = response;
}