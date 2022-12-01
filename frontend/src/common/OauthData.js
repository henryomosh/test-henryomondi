const oauthCommon = {
  client_id: "SApZALsMWSdvCtIK2lj9FcA2n9jjl4MmUTcoHS0e",
  client_secret: "PSILgYRzcguxp0Z0Ds9xsZZdQmcZVM89NfLHDoXNgxELkJwrLzXmM9MAX5HoWunelNikectWt9mICBoQARNtWBGeUJGNwUF6QfwRMwnCyHqmBD5axoaKWEXll56t6cJI",
};

const convertToken = {
  client_id: oauthCommon.client_id,
  client_secret: oauthCommon.client_secret,
  token: "",
  grant_type: "convert_token",
  backend: "google-oauth2"
};

const oauthToken = {
  client_id: oauthCommon.client_id,
  client_secret: oauthCommon.client_secret,
  grant_type: "password",
  username: "",
  password: ""
};

const refreshToken = {
  client_id: oauthCommon.client_id,
  client_secret: oauthCommon.client_secret,
  grant_type: "refresh_token",
  refresh_token: ""
};

export { convertToken, oauthToken, refreshToken };

