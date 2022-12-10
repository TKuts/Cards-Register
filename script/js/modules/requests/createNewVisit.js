import { sendRequest } from "./sendRequest.js";

export const createNewVisit = (token, requestBody) => sendRequest("","POST",token, {
    body: JSON.stringify(requestBody)
});