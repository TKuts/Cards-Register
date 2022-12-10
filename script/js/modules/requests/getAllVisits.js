import { sendRequest } from "./sendRequest.js";

export const getAllVisits = (token) => sendRequest("","GET",token);

