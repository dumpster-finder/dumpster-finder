export const packToken = (token: string) => ({ headers: { jwttoken: token } });
