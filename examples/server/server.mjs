import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8787;
const model = process.env.MODEL || "gpt-4o-mini";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/agent  { messages: [{role, content}?] }
app.post("/api/agent", async (req, res) => {
  try {
    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const chat = messages.slice(-20); // last 20 messages

    const system = { role: "system", content: "You are eloquent agent. Answer with what/how questions only" };

    const completion = await openai.chat.completions.create({
      model,
      messages: [system, ...chat],
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "agent_failed" });
  }
});

app.listen(port, () => {
  console.log(`Agent server listening on http://localhost:${port}`);
});
