import Visit from "./js/modules/visit/index.js";
import { doctors } from "./js/modules/visit/allDoctors.js";
import { getAllVisits, getVisitById, createNewVisit, editVisitById, deleteVisit } from "./js/modules/requests/index.js";

// Sergiy
import filter from "./js/modules/filter.js";

filter();

// Anton
import Modal from "./js/modules/modal/modal.js";
import Form from "./js/modules/modal/form.js";

// import Valid from "../modules/validValue";

const h1 = document.querySelector(".body__section-tittle");
const loginBtn = document.querySelector("#btn-login");
const btnVisit = document.querySelector("#btn-visit");

const authorizeForm = new Form({ id: "form_login", classes: "form-login", action: "" });
const authorizeModal = new Modal({
  headerModal: "Authorization",
  closeBtn: true,
  form: authorizeForm.renderAuthorization(),
});


const token = await authorizeModal.getToken(loginBtn, h1, btnVisit);

//Main code after authorization is here ===========================================================
console.log(token);

//get all Visits===================================================================================

const cardGroup = document.querySelector(".card-group");

getAllVisits(token).then((response) => {
   response.forEach((visitObject) => {
   const visit = new Visit(visitObject);
   cardGroup.append(visit.render());
  });
});

//create new Visit =================================================================================
btnVisit.addEventListener("click", () => {
  // generation of form
  const formNewVisit = new Form({ id: "form_newVisit", classes: "form-newVisit", action: "" });
  const loginModal = new Modal({
    headerModal: "New Visit",
    closeBtn: true,
    form: formNewVisit.renderNewVisit(),
  });
  document.body.append(loginModal.render());
  // doctor selection

  document.querySelector("#doctorList1").addEventListener('change', (event)=>{
    const visitDoctor = document.querySelector("#doctorList1").value;
    const tempVisit = new doctors[visitDoctor.toLowerCase()]({});    
    tempVisit.renderNewForm();
  })

  //inputed data submitions
  document.querySelector("#btn-submit-newVisit").addEventListener("click", (event) => {
    
    event.preventDefault();

    
    let visitDoctor = document.querySelector("#doctorList1").value;
    let visitTitle = document.querySelector("#visitTitle1").value;
    let visitDesc = document.querySelector("#visitDesc1").value;
    let visitStatus = document.querySelector("#visitStatus1").value;
    let visitPriority = document.querySelector("#visitPriority1").value;
    let visitPatient = document.querySelector("#visitPatient1").value;
    let visitBlood = "";
    if (document.querySelector("#visitBlood1")){
      visitBlood = document.querySelector("#visitBlood1").value;
    }
    let visitWeight = "";
    if (document.querySelector("#visitWeight1")){
      visitWeight = document.querySelector("#visitWeight1").value;
    }
    let visitDisease="";
    if (document.querySelector("#visitDisease1")){
      visitDisease = document.querySelector("#visitDisease1").value;
    }  
    let visitAge="";
    if (document.querySelector("#visitAge1")){
      visitAge = document.querySelector("#visitAge1").value;
    } 
    let visitLastVisitDate="";
    if (document.querySelector("#visitLastVisitDate1")){
      visitLastVisitDate = document.querySelector("#visitLastVisitDate1").value;
    }  
    let requestBody = {
      doctor: visitDoctor,
      title: visitTitle,
      description: visitDesc,
      visitStatus: visitStatus,
      visitPriority: visitPriority,
      visitPatient: visitPatient,
      visitBlood: visitBlood,
      visitWeight: visitWeight,
      visitDisease: visitDisease,
      visitAge: visitAge,
      visitLastVisitDate: visitLastVisitDate
    };
    
      createNewVisit(token, requestBody).then(
       (response) => {
        const visit = new Visit(response);
        cardGroup.append(visit.render());
      }
    );
    loginModal.close();
  });
});

// delete cards ==============================================================================
cardGroup.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-close")) {
    const visitCard = event.target.closest(".card");
    const visitID = visitCard.dataset.id;
    visitCard.classList.add("d-none");
    //console.log(visitCard);
    deleteVisit(visitID, token).then((response) => console.log(response));
  }
});

// details cards ================================================================================
cardGroup.addEventListener("click", (event) => {
  if (event.target.getAttribute("id") === "btn-details") {
    const visitCard = event.target.closest(".card"); // looking for card
    const visitID = visitCard.dataset.id; // getting it id
    getVisitById(visitID, token).then((response) => {     
        const visit = new doctors[response.doctor.toLowerCase()](response); // creating new class
        // console.log(`Visit # ${visitID}`, visit);
        visit.renderDetails();//rendering details
     });
  }
});

// less cards ===================================================================================
cardGroup.addEventListener("click", (event) => {
  if (event.target.getAttribute("id") === "btn-less") {
    const visitCard = event.target.closest(".card"); // looking for card
    const visitID = visitCard.dataset.id; // getting it id
    getVisitById(visitID, token).then((response) => {     
        const visit = new doctors[response.doctor.toLowerCase()](response); // creating new class
        visit.renderLess();//deleting details
     });
  }
});



//edit Visit ===================================================================================
cardGroup.addEventListener("click", (event) => {
  if (event.target.getAttribute("id") === "btn-edit"){
    const visitCard = event.target.closest(".card"); // looking for card
    const visitID = visitCard.dataset.id; // getting it id
    const visitDoctor = visitCard.querySelector(".card-header").innerText.toLowerCase();
    
     // generation of form
    const formEditVisit = new Form({ id: "form_editVisit", classes: "form-editVisit", action: "" });
    const loginModal = new Modal({
        headerModal: "Edit Visit",
        closeBtn: true,
        form: formEditVisit.renderNewVisit(),
     });
    document.body.append(loginModal.render());
    const tempVisit = new doctors[visitDoctor.toLowerCase()]({});
    tempVisit.renderNewForm();

    //filling data into the form
    getVisitById(visitID, token).then((response) => {     
      const doctor = visitCard.querySelector(".card-header").innerText.toLowerCase();
      const visit = new doctors[doctor.toLowerCase()](response); // creating new class
      
      document.querySelector("#doctorList1").value = visit.visitDoctor;
      document.querySelector("#doctorList1").setAttribute("disabled", "disabled");
      document.querySelector("#visitTitle1").value = visit.visitTitle;
      document.querySelector("#visitDesc1").value = visit.visitDesc;
      document.querySelector("#visitStatus1").value= visit.visitStatus;
      document.querySelector("#visitPriority1").value = visit.visitPriority;
      document.querySelector("#visitPatient1").value = visit.visitPatient;
      if (document.querySelector("#visitBlood1")) {
        document.querySelector("#visitBlood1").value = visit.visitBlood;
      };
      if (document.querySelector("#visitWeight1")) {
        document.querySelector("#visitWeight1").value = visit.visitWeight;
      };
      if (document.querySelector("#visitDisease1")) {
        document.querySelector("#visitDisease1").value = visit.visitDisease;
      };
      if (document.querySelector("#visitAge1")) {
        document.querySelector("#visitAge1").value = visit.visitAge;
      };
      if (document.querySelector("#visitLastVisitDate1")) {
        document.querySelector("#visitLastVisitDate1").value = visit.visitLastVisitDate;
      };      
   });
    
    //editbyID
    document.querySelector("#btn-submit-newVisit").addEventListener("click", (event) => {
    
      event.preventDefault();
        
      let visitDoctor = document.querySelector("#doctorList1").value;
      let visitTitle = document.querySelector("#visitTitle1").value;
      let visitDesc = document.querySelector("#visitDesc1").value;
      let visitStatus = document.querySelector("#visitStatus1").value;
      let visitPriority = document.querySelector("#visitPriority1").value;
      let visitPatient = document.querySelector("#visitPatient1").value;
      let visitBlood = "";
      if (document.querySelector("#visitBlood1")){
        visitBlood = document.querySelector("#visitBlood1").value;
      }
      let visitWeight = "";
      if (document.querySelector("#visitWeight1")){
        visitWeight = document.querySelector("#visitWeight1").value;
      }
      let visitDisease="";
      if (document.querySelector("#visitDisease1")){
        visitDisease = document.querySelector("#visitDisease1").value;
      }  
      let visitAge="";
      if (document.querySelector("#visitAge1")){
        visitAge = document.querySelector("#visitAge1").value;
      } 
      let visitLastVisitDate="";
      if (document.querySelector("#visitLastVisitDate1")){
        visitLastVisitDate = document.querySelector("#visitLastVisitDate1").value;
      }  
  
      let requestBody = {
        id: visitID,
        doctor: visitDoctor,
        title: visitTitle,
        description: visitDesc,
        visitStatus: visitStatus,
        visitPriority: visitPriority,
        visitPatient: visitPatient,
        visitBlood: visitBlood,
        visitWeight: visitWeight,
        visitDisease: visitDisease,
        visitAge: visitAge,
        visitLastVisitDate: visitLastVisitDate
      };
  
      editVisitById(visitID, token, requestBody).then(
         (response) => {
          const visit = new Visit(response);
          const visitCard = document.querySelector(`#id-${visitID}`); // looking for card
          visitCard.querySelector(".card-body h5").innerText = response.title;
          visitCard.querySelector(".card-text").innerText = response.description;
          visitCard.querySelector(".card-patient").innerHTML = `<strong>Patient</strong>: ${response.visitPatient}`;
          visitCard.querySelector(".card-status").innerHTML =  `<strong>Status</strong>: ${response.visitStatus}`;
          visitCard.querySelector(".card-priority").innerHTML =  `<strong>Priority</strong>: ${response.visitPriority}`
        }
      );
      loginModal.close();
    });
  }
});
