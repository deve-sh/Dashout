export const FETCH_MERCHANT_BY_CREDENTIALS = `
    SELECT * FROM merchants WHERE client_id = ? AND client_secret = ? LIMIT 1;
`;
