import Cardiologist from "./subClassCardiolog.js";
import Dentist from "./subClassDentist.js";
import Therapist from "./subClassTherapist.js"; 

export const doctors = {
    dentist: Dentist,
    cardiologist: Cardiologist,
    therapist: Therapist
}

