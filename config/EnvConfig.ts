const apiKey = process.env.EXPO_PUBLIC_API_KEY ?? '';

if (!apiKey) {
  console.warn('Missing EXPO_PUBLIC_API_KEY in .env');
}

export const EnvConfig = {
  API_KEY: apiKey,
};