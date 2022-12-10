import Visit from "./index.js";
import Input from "../modal/input.js"

export default class Dentist extends Visit {
  constructor({
    id:visitID,
    doctor:visitDoctor,
    title:visitTitle,
    description:visitDesc,
    visitStatus,
    visitPriority,
    visitPatient,
    visitLastVisitDate
  }) {
    super({id:visitID, doctor:visitDoctor, title:visitTitle, description:visitDesc, visitStatus, visitPriority, visitPatient});
    this.visitLastVisitDate = visitLastVisitDate;
   
  }

  renderDetails() {
    
    const visitUlCardHTML = document.querySelector(`#id-${this.visitID} .list-group`);
    const btnDetail = document.querySelector(`#id-${this.visitID} #btn-details`);
    const btnLess = document.querySelector(`#id-${this.visitID} #btn-less`);

    btnDetail.classList.add("d-none");
    btnLess.classList.remove("d-none");
    console.log(visitUlCardHTML)

    const visitDetailsHTML = 
    `   <li class="list-group-item card-lastdate"><strong>Last Visit Date</strong>: ${this.visitLastVisitDate}</li>
     `
   
            
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

    document.querySelector(`#id-${this.visitID} .card-lastdate`).remove()

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
    const visitLastVisitDate = new Input({ type: "text", classes: "form-control", id: "visitLastVisitDate1", name: "Last Visit Date" });

   
    btnSubmit.before(visitLastVisitDate.render().label);
    btnSubmit.before(visitLastVisitDate.render().input);
    return;
   }
}
