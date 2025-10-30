export async function GET() {
  const apiKey = process.env.OWM_API_key;

  return Response.json({
    apiKeyExists: !!apiKey,
    apiKeyLength: apiKey?.length || 0,
    apiKeyPreview: apiKey ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : 'NOT_FOUND',
    envVarsWithOWM: Object.keys(process.env).filter(key => key.includes('OWM')),
  });
}
