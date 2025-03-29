import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface SuggestionsResponse {
  content: string;
  skills: string[];
  improvements: string[];
}

export async function getContentSuggestions(
  section: string,
  currentContent: string,
  jobTitle?: string
): Promise<SuggestionsResponse> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en rédaction de CV. Tu aides à améliorer le contenu des CV en français de manière professionnelle et percutante."
        },
        {
          role: "user",
          content: `Améliore cette section "${section}" de CV${jobTitle ? ` pour un poste de ${jobTitle}` : ''} : "${currentContent}". 
          Fournis : 
          1. Une version améliorée du contenu
          2. Une liste de compétences pertinentes
          3. Des suggestions d'amélioration`
        }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No suggestion generated');

    // Parse the response
    const sections = result.split('\n\n');
    return {
      content: sections[0]?.replace('1. Version améliorée:', '').trim() ?? '',
      skills: sections[1]?.replace('2. Compétences pertinentes:', '')
        .split('-')
        .map(s => s.trim())
        .filter(Boolean) ?? [],
      improvements: sections[2]?.replace('3. Suggestions d\'amélioration:', '')
        .split('-')
        .map(s => s.trim())
        .filter(Boolean) ?? [],
    };
  } catch (error) {
    console.error('Error getting content suggestions:', error);
    throw error;
  }
}

interface ColorSuggestions {
  primary: string;
  secondary: string;
  accent: string;
}

export async function getSuggestedColors(
  industry: string,
  style: 'professional' | 'creative' | 'academic'
): Promise<ColorSuggestions> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en design de CV. Tu suggères des combinaisons de couleurs harmonieuses et appropriées."
        },
        {
          role: "user",
          content: `Suggère une palette de 3 couleurs (primary, secondary, accent) en format hexadécimal pour un CV ${style} dans le domaine ${industry}.`
        }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No colors suggested');

    // Extract hex colors from the response
    const hexColors = result.match(/#[0-9a-fA-F]{6}/g);
    if (!hexColors || hexColors.length < 3) throw new Error('Invalid color format');

    return {
      primary: hexColors[0],
      secondary: hexColors[1],
      accent: hexColors[2],
    };
  } catch (error) {
    console.error('Error getting color suggestions:', error);
    throw error;
  }
}
