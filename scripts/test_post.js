(async () => {
  try {
    const url = process.argv[2] || "http://localhost:3001/api/users";
    const body = {
      name: "Test Bot",
      username: `testuser_bot_${Date.now()}`,
      email: `testbot+${Date.now()}@example.com`,
      password: "Secret123!",
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // timeout not available on global fetch; keep it simple
    });

    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("HEADERS:", Object.fromEntries(res.headers.entries()));
    console.log("BODY:", text);
  } catch (err) {
    console.error("ERROR:", err);
    process.exitCode = 2;
  }
})();
