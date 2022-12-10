//Клас Visit приймає базові атрибути для створення візиту і має метод рендерингу класу в HTML

import { visitDoctors, visitPriorities, visitStatuses } from "./visitOptions.js";

export default class Visit {
  constructor({
    id: visitID,
    doctor: visitDoctor,
    title: visitTitle,
    description: visitDesc,
    visitStatus = "Open",
    visitPriority = "Normal",
    visitPatient = "Patient"
  }) {
    this.visitID = visitID; //id візиту - код, отриманий з сервера при створенні
    this.visitDoctor = visitDoctor; //лікар - один з трьох **Кардіолог**, **Стоматолог**, **Терапевт**
    this.visitTitle = visitTitle; // мета візиту
    this.visitDesc = visitDesc; // короткий опис візиту
    this.visitStatus = visitStatus; // статус візиту, по замовчуванню Open
    this.visitPriority = visitPriority; // пріоритетність **звичайна**, **пріоритетна**, **невідкладна**
    this.visitPatient = visitPatient; // ПІБ пацієнта
  }
  render() {
    //де правильно робити перевірки? в конструкторі?

    // if (!visitDoctors.includes(this.visitDoctor)){
    //     console.log(this.visitDoctor, visitDoctors)
    //     throw new Error("No such doctor!")
    // }
    // if (!visitPriorities.includes(this.visitPriority)){
    //     throw new Error("No such priority for visit!")
    // }
    // if (!visitStatuses.includes(this.visitStatus)){
    //     console.log(this.visitStatus, visitStatuses)
    //     throw new Error("No such status!")
    // }

    const visitCardWrapperElem = document.createElement("div");

    const visitCardHTML = `
      <div class="card size border border-1 rounded-2 card-item" data-id="${this.visitID}" id="id-${this.visitID}">
        <div class="card-header d-flex justify-content-between">
          ${this.visitDoctor}<button class="btn-close" type="button" aria-label="Close"></button>
        </div>

        <div class="card-body">
          <h5>${this.visitTitle}</h5>
          <p class="card-text">${this.visitDesc}</p>

          <ul class="list-group list-group-flush">
            <li class="list-group-item card-patient"><strong>Patient</strong>: ${this.visitPatient}</li>
            <li class="list-group-item card-status"><strong>Status</strong>: ${this.visitStatus}</li>
            <li class="list-group-item card-priority"><strong>Priority</strong>: ${this.visitPriority}</li>
          </ul>
        </div>

        <div class="card-footer">
          <button class="btn btn-primary btn-sm" type="button" id="btn-details">Details</button
          ><button class="btn btn-primary btn-sm d-none" type="button" id="btn-less">Less</button
          ><button class="btn btn-secondary btn-sm ms-1" type="button" id="btn-edit">Edit</button>
        </div>
      </div>
    `;

    visitCardWrapperElem.insertAdjacentHTML("afterbegin", visitCardHTML);

    return visitCardWrapperElem.firstElementChild;
  }
}
