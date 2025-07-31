"use client";
import { useState } from "react";
import { sendMessage } from "@/app/actions/sendMessage";

export default function ChatForm() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await sendMessage(input);
    setResponse(result.reply || "No response received");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border p-2 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
}


