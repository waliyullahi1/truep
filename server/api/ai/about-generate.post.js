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
Generate a professional first-person About Me section.

USER DATA:
${JSON.stringify(user)}

RULES:
- Write in FIRST PERSON
- Use words like: "I am", "I have", "I specialize", "I enjoy"
- Maximum 100 words
- Professional and friendly
- Human sounding and natural
- Mention skills naturally
- No markdown
- Return ONLY plain text
`,

      config: {
        systemInstruction: `
You are a professional bio writer.

Write modern first-person About Me sections.

The bio MUST sound like the user is describing themselves directly.

Good example:
"I am a frontend developer with experience building modern web applications..."

Bad example:
"He is a frontend developer..."

Keep it concise, natural, and professional.
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