import { sendRequest } from "./sendRequest.js";

export const editVisitById = (visitId, token, requestBody) => sendRequest(visitId,"PUT",token, {
    body: JSON.stringify(requestBody)
});