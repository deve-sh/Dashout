export const FETCH_MERCHANT_BY_CREDENTIALS = `
    SELECT * FROM merchants WHERE client_id = ? AND client_secret = ? LIMIT 1;
`;

export const GET_USER_MERCHANTS = `
    SELECT * FROM merchants WHERE user = ? LIMIT 15;
`;

export const CREATE_MERCHANT = `
    INSERT INTO merchants (
        id,
        email,
        name,
        phone_number,
        description,
        photo_url,
        client_id,
        client_secret,
        n_transactions
    ) VALUES(
        ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
`;
