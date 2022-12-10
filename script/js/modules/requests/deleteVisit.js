import { sendRequest } from "./sendRequest.js";

export const deleteVisit = (visitId, token) => sendRequest(visitId,"DELETE",token);