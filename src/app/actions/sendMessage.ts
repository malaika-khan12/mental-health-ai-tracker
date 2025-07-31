// app/actions/sendMessage.ts
"use server";

export async function sendMessageToN8N(message: string) {
  try {
    const response = await fetch("https://mikki-khan.app.n8n.cloud/webhook/0fab3db0-796d-402a-9e19-3c30f03a1186/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });

    const data = await response.json();
    return data; // this should be the summary or reply from your workflow
  } catch (error) {
    console.error("Failed to send message:", error);
    return { error: "Something went wrong." };
  }
}