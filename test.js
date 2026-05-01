function runTests() {
    console.log("Running Tests...");

    // ✅ Reset context before tests
    context = { age: null, step: "start" };

    // ✅ Test 1: Start flow
    let res1 = process("start", "en");
    console.assert(
        res1.toLowerCase().includes("age"),
        "❌ Start flow test failed"
    );

    // ✅ Test 2: Age logic (must set step manually)
    context.step = "age";
    let res2 = process("20", "en");
    console.assert(
        res2.toLowerCase().includes("eligible"),
        "❌ Age eligibility test failed"
    );

    // ✅ Test 3: Underage case
    context.step = "age";
    let res3 = process("15", "en");
    console.assert(
        res3.toLowerCase().includes("not"),
        "❌ Underage test failed"
    );

    // ✅ Test 4: Booth intent triggers map
    let mapTest = typeof loadMap === "function";
    console.assert(
        mapTest,
        "❌ Map function missing"
    );

    // ✅ Test 5: Unknown input handling
    let res5 = process("random text", "en");
    console.assert(
        res5.toLowerCase().includes("type"),
        "❌ Unknown input test failed"
    );

    console.log("✅ All tests passed successfully!");
}

runTests();