import { GoogleGenAI } from "@google/genai"

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

    // ✅ CLEAN FORM (recommended for better AI output)
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
- MAX 30 words per sentence
- MUST return ONLY HTML
- No markdown, no explanations

PROPERTY DATA:
${JSON.stringify(cleanForm)}

IMPORTANT:
- Convert "features" array into HTML <ul><li>
- Only include valid features (ignore null/false/empty)
- Use emoji if available (feature.icon)
- Max 6 features only
`,

      config: {
        systemInstruction: `
You are a professional real estate copywriter.

CRITICAL RULES:
- Output ONLY HTML
- No markdown, no JSON, no explanation text
- Keep it short (60–120 words max)
- Add full address to one of paragraphy  with sweet words

STRUCTURE:

1. <p> Opening (1–2 sentences max)

2. <p> Property details (1–2 sentences max)

3. FEATURES SECTION:
<ul>
  <li>Feature Name</li>
</ul>

FEATURE RULES:
- Use ONLY features array from input
- Ignore null, false, empty values
- Convert true → "Available"
- Include emoji if present (icon field)
- Max 6 features

4. <p> Closing sentence (very short)

STYLE:
- Clean, modern real estate listing style
- Like PropertyPro / Airbnb listing
        `
      }
    })

    const responseText = response.text

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