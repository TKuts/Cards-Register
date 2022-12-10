import Visit from "./index.js";
import Input from "../modal/input.js"

export default class Therapist extends Visit {
  constructor({
    id:visitID,
    doctor:visitDoctor,
    title:visitTitle,
    description:visitDesc,
    visitStatus,
    visitPriority,
    visitPatient,    
    visitAge
  }) {
    super({id:visitID, doctor:visitDoctor, title:visitTitle, description:visitDesc, visitStatus, visitPriority, visitPatient});
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
    `<li class="list-group-item card-age"><strong>Patient's age</strong>: ${this.visitAge}</li>`
   
            
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
     const visitAge = new Input({ type: "text", classes: "form-control", id: "visitAge1", name: "Patient's Age" });
  
 
    btnSubmit.before(visitAge.render().label);
    btnSubmit.before(visitAge.render().input);
  
    return;
   }
 
}
