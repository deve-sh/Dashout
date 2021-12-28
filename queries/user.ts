export const FETCH_USER_BY_UID = `SELECT * FROM users WHERE uid = ? LIMIT 1`;

export const CREATE_USER = `INSERT into users(
    uid, 
    email, 
    email_verified, 
    display_name, 
    phone_number, 
    provider_info,
    photo_url,
    disabled)
VALUES (?,?,?,?,?,?,?,?);`;

export const UPDATE_USER = `UPDATE users SET
uid = ?,
email = ?,
email_verified = ?,
phone_number = ?,
photo_url = ?,
disabled = ?,
display_name = ?,
provider_info = ?
WHERE uid = ?;`;
