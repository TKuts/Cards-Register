import Input from "./input.js";
import Select from "./select.js";
import { visitDoctors, visitPriorities, visitStatuses } from "../visit/visitOptions.js";


export default class Form {
  constructor({ id, classes, action }) {
    this.id = id;
    (this.classes = classes), (this.action = action);
  }

  renderAuthorization() {
    const inputEmail = new Input({ type: "email", classes: "form-control", id: "exampleInputEmail1", name: "E-mail" });
    const inputPassword = new Input({
      type: "password",
      classes: "form-control",
      id: "exampleInputPassword1",
      name: "Password",
    });

    let tagForm = document.createElement("form");
    tagForm.classList.add(this.classes);
    tagForm.setAttribute("id", this.id);
    //tagForm.setAttribute("action", this.action)

    let tagButton = document.createElement("button");
    tagButton.classList.add("btn", "btn-outline-secondary", "authorization-btn");
    tagButton.setAttribute("id", "btn-submit");
    tagButton.setAttribute("type", "submit");
    tagButton.innerText = "Submit";
    

    tagForm.append(inputEmail.render().label);
    tagForm.append(inputEmail.render().input);
    tagForm.append(inputPassword.render().label);
    tagForm.append(inputPassword.render().input);

    tagForm.append(tagButton);

    return tagForm.outerHTML;
  }

  renderNewVisit() {
    const inputDoctor = new Select({
      classes: "form-control",
      id: "doctorList1",
      name: "Doctor",
      options: visitDoctors,
    });
    const inputTitle = new Input({ type: "text", classes: "form-control", id: "visitTitle1", name: "Title" });
    const inputDesc = new Input({ type: "text", classes: "form-control", id: "visitDesc1", name: "Description" }); //?to change to textarea
    const inputStatus = new Select({
      classes: "form-control",
      id: "visitStatus1",
      name: "Status",
      options: visitStatuses,
    });
    const inputPriority = new Select({
      classes: "form-control",
      id: "visitPriority1",
      name: "Priority",
      options: visitPriorities,
    });
    const inputPatient = new Input({ type: "text", classes: "form-control", id: "visitPatient1", name: "Patient" });
    
    let tagForm = document.createElement("form");
    tagForm.classList.add(this.classes);
    tagForm.setAttribute("id", this.id);
    

    let tagButton = document.createElement("button");
    tagButton.classList.add("btn", "btn-outline-secondary");
    tagButton.setAttribute("id", "btn-submit-newVisit");
    tagButton.setAttribute("type", "submit");
    tagButton.innerText = "Submit";

    tagForm.append(inputDoctor.render().label);
    tagForm.append(inputDoctor.render().select);
    tagForm.append(inputTitle.render().label);
    tagForm.append(inputTitle.render().input);
    tagForm.append(inputDesc.render().label);
    tagForm.append(inputDesc.render().input);
    tagForm.append(inputStatus.render().label);
    tagForm.append(inputStatus.render().select);
    tagForm.append(inputPriority.render().label);
    tagForm.append(inputPriority.render().select);
    tagForm.append(inputPatient.render().label);
    tagForm.append(inputPatient.render().input);
   

    tagForm.append(tagButton);

    return tagForm.outerHTML;
  }

 
}
