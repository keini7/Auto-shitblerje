// Auto-detect local network IP for development
import Constants from "expo-constants";

const LOCALHOST = Constants.manifest?.debuggerHost?.split(":")[0];

export const API_URL = `http://${LOCALHOST}:8000/api`;
export const AUTH_URL = `http://${LOCALHOST}:8000/api/auth`;
export const UPLOAD_URL = `http://${LOCALHOST}:8000/api/upload`;
