import Visit from "./index.js";
import Input from "../modal/input.js"
// add setters to class
export default class Cardiologist extends Visit {
  constructor({
    id:visitID,
    doctor:visitDoctor,
    title:visitTitle,
    description:visitDesc,
    visitStatus,
    visitPriority,
    visitPatient,
    visitBlood,
    visitWeight,
    visitDisease,
    visitAge
  }) {
    super({id:visitID, doctor:visitDoctor, title:visitTitle, description:visitDesc, visitStatus, visitPriority, visitPatient});
    this.visitBlood = visitBlood;
    this.visitWeight = visitWeight;
    this.visitDisease = visitDisease;
    this.visitAge = visitAge;
  }

  renderDetails() {
    
    const visitUlCardHTML = document.querySelector(`#id-${this.visitID} .list-group`);
    const btnDetail = document.querySelector(`#id-${this.visitID} #btn-details`);
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.add("d-none");
    btnLess.classList.remove("d-none");
    console.log(visitUlCardHTML)

    const visitDetailsHTML = 
    `   <li class="list-group-item card-blood"><strong>Blood Pressure</strong>: ${this.visitBlood}</li>
        <li class="list-group-item card-weight"><strong>Weight Index</strong>: ${this.visitWeight}</li>
        <li class="list-group-item card-disease"><strong>Heart Disease</strong>: ${this.visitDisease}</li>
        <li class="list-group-item card-age"><strong>Patient's age</strong>: ${this.visitAge}</li>`
   
            
     visitUlCardHTML.insertAdjacentHTML("beforeend", visitDetailsHTML) 
    return;
  }

  renderLess(){
    const visitUlCardHTML = document.querySelector(`#id-${this.visitID} .list-group`);
    const btnDetail = document.querySelector(`#id-${this.visitID} #btn-details`);
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.remove("d-none");
    btnLess.classList.add("d-none");
    console.log(visitUlCardHTML)

    document.querySelector(`#id-${this.visitID} .card-blood`).remove()
    document.querySelector(`#id-${this.visitID} .card-weight`).remove()
    document.querySelector(`#id-${this.visitID} .card-disease`).remove()
    document.querySelector(`#id-${this.visitID} .card-age`).remove()
    
    return;
  }

   renderNewForm(){
    const btnSubmit = document.querySelector("#btn-submit-newVisit");
    do {
        if(btnSubmit.previousSibling.id !== "visitPatient1"){
            btnSubmit.previousSibling.remove()
        }
    }
    while (btnSubmit.previousSibling.id !== "visitPatient1")
    const visitBlood = new Input({ type: "text", classes: "form-control", id: "visitBlood1", name: "Blood Presure" });
    const visitWeight = new Input({ type: "text", classes: "form-control", id: "visitWeight1", name: "Weight Index" });
    const visitDisease = new Input({ type: "text", classes: "form-control", id: "visitDisease1", name: "Heart Disease" });
    const visitAge = new Input({ type: "text", classes: "form-control", id: "visitAge1", name: "Patient's Age" });
  
    btnSubmit.before(visitBlood.render().label);
    btnSubmit.before(visitBlood.render().input);
    btnSubmit.before(visitWeight.render().label);
    btnSubmit.before(visitWeight.render().input);
    btnSubmit.before(visitDisease.render().label);
    btnSubmit.before(visitDisease.render().input);
    btnSubmit.before(visitAge.render().label);
    btnSubmit.before(visitAge.render().input);
  
    return;
   }

}
