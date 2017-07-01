export const PORT = process.env.PORT || 3000;
export const INTERNAL_API_ROOT = `${process.env.BROWSER ? '' : `http://localhost:${PORT}`}/api`;