import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    return res.status(200).json({
      ok: true,
      hasKey: !!process.env.OPENAI_API_KEY,
      node: process.version
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
