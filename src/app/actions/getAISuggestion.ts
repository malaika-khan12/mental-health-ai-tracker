// app/actions/getAISuggestion.ts
"use server";

export async function getAISuggestion(mood: string, journal: string) {
  const response = await fetch("https://malaika-khan.app.n8n.cloud/webhook/f1bce2eb-deb8-44bc-984a-8ef963b57645/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `User is feeling ${mood}. Journal: ${journal}. Give a short helpful recommendation.`,
    }),
  });

  const data = await response.json();
  return data.reply; // assuming your AI agent returns { reply: "..." }
}
