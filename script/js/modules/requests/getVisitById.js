import { sendRequest } from "./sendRequest.js";

export const getVisitById = (visitId, token) => sendRequest(visitId,"GET",token);