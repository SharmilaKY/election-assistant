function runTests() {
    console.log("Running Tests...");

    console.assert(
        votingSteps().includes("Register"),
        "Voting Steps Test Failed"
    );

    console.assert(
        checkEligibility() !== "",
        "Eligibility Test Failed"
    );

    console.assert(
        electionDate().includes("Election"),
        "Date Test Failed"
    );

    console.log("All tests completed");
}

runTests();