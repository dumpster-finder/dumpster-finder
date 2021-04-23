export const packToken = (token: string) => ({ headers: { ['x-access-token']: token } });
