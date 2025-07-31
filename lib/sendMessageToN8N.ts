export async function sendMessageToN8N(userInput: string): Promise<string | null> {
  try {
    const res = await fetch("https://mikki-khan.app.n8n.cloud/webhook/0fab3db0-796d-402a-9e19-3c30f03a1186/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userInput }),
    });

    if (!res.ok) {
      console.error("Failed to fetch AI recommendation");
      return null;
    }

    const data = await res.json();
    console.log("AI agent response:", data);

    // Return data.message or entire data depending on your n8n response format
    return data.message || data.text || null;
  } catch (error) {
    console.error("Error in sendMessageToN8N:", error);
    return null;
  }
}
