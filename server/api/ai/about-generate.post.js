import { GoogleGenAI } from "@google/genai"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  if (!body?.user) {
    return {
      success: false,
      message: "User data is required"
    }
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: config.geminiApiKey
    })

    const user = body.user

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
Generate a professional short About Me section.

USER DATA:
${JSON.stringify(user)}

RULES:
- Maximum 100 words
- Professional and friendly
- Human sounding
- Mention skills naturally
- No markdown
- Return ONLY plain text
`,

      config: {
        systemInstruction: `
You are a professional bio writer.

Write modern About sections for professionals.
Keep it concise and natural.
Return only plain text.
`
      }
    })

    return {
      success: true,
      data: response.text.trim()
    }

  } catch (err) {
    console.log(err)

    return {
      success: false,
      message: err.message
    }
  }
})