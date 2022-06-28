import axios from "axios"
import { api } from "../others/firebase-auth-api"

const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${api}`;
    const response = await axios.post(url, { email, password, returnSecureToken: true });
    const token = response.data.idToken;
    return token;
}

export const createUser = (email, password) => {
    return authenticate('signUp', email, password);
}

export const login = (email, password) => {
    return authenticate('signInWithPassword', email, password);
}