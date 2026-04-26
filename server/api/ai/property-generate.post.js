import { GoogleGenAI } from "@google/genai"

function inlineHtml(html) {
  return html
    .replace(/\n/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/>\s+</g, '><')
    .trim()
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  if (!body?.form) {
    return {
      success: false,
      message: "Form data is required"
    }
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: config.geminiApiKey
    })

    const cleanForm = {
      type: body.form.type,
      purpose: body.form.purpose,
      category: body.form.category,
      location: body.form.location,
      pricing: body.form.pricing,
      landDetails: body.form.landDetails,
      houseDetails: body.form.houseDetails,
      features: body.form.features
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",

      contents: `
Generate a VERY SHORT real estate description in HTML.

RULES:
- MAX 120 words total
- MUST return ONLY HTML
- No markdown, no explanations

PROPERTY DATA:
${JSON.stringify(cleanForm)}

IMPORTANT:
- Convert "features" into <ul><li>
- Max 6 features
- Each <li> MUST start with a relevant emoji
`,

      config: {
        systemInstruction: `
You are a professional real estate HTML generator.

CRITICAL OUTPUT RULES (MUST FOLLOW):
- Output ONLY clean HTML
- MUST be Quill-compatible HTML
- Emojis are ALLOWED but ONLY as the FIRST character inside <li>
- Format strictly: <li>🛏️ 4 Bedrooms</li>
- NEVER place emoji in <p>
- NEVER wrap <ul> or <ol> inside <p>
- No nested block elements
- Always end with <p><br></p>

HTML STRUCTURE RULES:
1. <p> for intro
2. <ul> for features with emoji at start of each <li>
3. <p> for closing
4. End with <p><br></p>

CORRECT EXAMPLE (FOLLOW THIS EXACTLY):

<p>Beautiful modern home in a peaceful location.</p>
<ul>
<li>🛏️ 4 Bedrooms</li>
<li>🛁 3 Bathrooms</li>
<li>🚗 Parking Space</li>
<li>🔒 24/7 Security</li>
</ul>
<p>Contact us today for inspection.</p>
<p><br></p>
`
      }
    })

    const responseText = inlineHtml(response.text)

    console.log("AI OUTPUT:", responseText)

    return {
      success: true,
      data: responseText
    }

  } catch (err) {
    console.log("AI ERROR:", err)

    return {
      success: false,
      message: err.message
    }
  }
})