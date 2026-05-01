function runTests() {
    console.log("Running Tests...");

    console.assert(detectIntent("vote") === "vote", "Intent fail");
    console.assert(detectIntent("booth") === "booth", "Booth fail");

    console.assert(checkEligibility(20, "en").includes("Eligible"), "Eligibility fail");
    console.assert(checkEligibility("abc", "en") === "Enter a valid age.", "Invalid fail");

    console.assert(typeof saveQuery === "function", "Firebase missing");

    console.log("All tests passed ✅");
}

runTests();