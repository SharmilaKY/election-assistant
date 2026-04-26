function handleQuery() {
    let input = document.getElementById("userInput").value.toLowerCase();
    let response = "";

    if (input.includes("vote")) {
        response = "Steps to vote: 1. Register 2. Verify ID 3. Visit polling booth 4. Cast vote";
    }
    else if (input.includes("eligible")) {
        let age = prompt("Enter your age:");
        if (age >= 18) {
            response = "✅ You are eligible to vote!";
        } else {
            response = "❌ You are not eligible to vote.";
        }
    }
    else if (input.includes("date")) {
        response = "📅 Election Date: May 10 (Example)";
    }
    else {
        response = "Try asking about voting, eligibility, or election date.";
    }

    document.getElementById("response").innerText = response;
}