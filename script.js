function handleQuery() {
    const input = getInput();
    const response = generateResponse(input);
    showResponse(response);
}

// Get user input
function getInput() {
    return document.getElementById("userInput").value.toLowerCase();
}

// Route logic
function generateResponse(input) {
    if (input.includes("vote")) return votingSteps();
    if (input.includes("eligible")) return checkEligibility();
    if (input.includes("date")) return electionDate();

    return "Try asking: vote / eligible / date";
}

// Output
function showResponse(response) {
    document.getElementById("response").innerText = response;
}

// Features
function votingSteps() {
    return "Steps: 1. Register 2. ID Check 3. Go to booth 4. Vote using EVM";
}

function checkEligibility() {
    let age = prompt("Enter your age:");
    return age >= 18 ? "✅ You are eligible to vote" : "❌ You are not eligible";
}

function electionDate() {
    return "📅 Election Date: 10 May (Demo Data)";
}