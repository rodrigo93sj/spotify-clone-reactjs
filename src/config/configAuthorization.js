export const authEndpoint = process.env.REACT_APP_AUTH_ENDPOINT || "https://accounts.spotify.com/authorize";

export const clientId = "14ad9611605f43918167e0cd7d9495e7";
export const redirectUri = process.env.REACT_APP_REDIRECT_URI || "http://localhost:3000/";
export const scopes = ["user-top-read"];
