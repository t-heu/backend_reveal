export const ACCESS_TOKEN_SECRET = 'c889daa800eff042a3cbf28678a9b9b4';
export const ACCESS_TOKEN_EXPIRES_IN = process.env.NODE_ENV === "development" ? 99999 : 300; // 300s = 5min // '1h';
