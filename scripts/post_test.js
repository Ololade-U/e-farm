(async () => {
  try {
    const res = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "copilot+live@example.com",
        username: "copilot_live",
        password: "Password123!",
      }),
    });
    const text = await res.text();
    console.log("STATUS", res.status);
    console.log("BODY", text);
  } catch (e) {
    console.error("ERR", e && e.message ? e.message : e);
    process.exit(1);
  }
})();
