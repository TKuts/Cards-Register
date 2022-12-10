export default class Modal {
  constructor({ headerModal, closeBtn = false, form }) {
    this.headerModal = headerModal;
    this.closeBtn = closeBtn;
    this.form = form;
  }

  attachListener() {
    document.body.addEventListener("click", (e) => {
    //   console.log(e.target);
      let modal = e.target.classList.contains("modal");
      let close = e.target.classList.contains("btn-close");
    //   console.log(close);
      if ((modal && this.closeBtn) || close) {
        this.close();
      }
    });
  }

  close() {
    this.background.remove();
    document.body.classList.remove("modal-open");
    document.body.classList.remove("overflow");
    this.modal.remove();
    // bodyTitle.style.display = "block";
  }

  renderBackground() {
    this.background = document.createElement("div");
    this.background.classList.add("modal-backdrop");
    document.body.append(this.background);
  }

  render() {
    document.body.classList.add("modal-open");
    document.body.classList.add("overflow");

    this.modal = document.createElement("div");
    this.modal.classList.add("modal");

    let modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    this.modal.append(modalDialog);

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalDialog.append(modalContent);

    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalContent.append(modalHeader);

    let modalTitle = document.createElement("h5");
    modalTitle.classList.add("modal-title");
    modalTitle.innerText = this.headerModal;
    modalHeader.append(modalTitle);

    let closeButton = document.createElement("button");
    closeButton.classList.add("btn-close");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("aria-label", "Close");
    modalHeader.append(closeButton);

    let modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.append(modalBody);

    modalBody.innerHTML = this.form;

    this.modal.style.display = "block";

    this.renderBackground();
    this.attachListener();
    return this.modal;
  }

  getToken(initBtn, initialEmptyContentTitle, btnToActivate) {
    return new Promise((resolve, reject) => {
      initBtn.addEventListener("click", (e) => {
        const authorizeModalElem = this.render();

        // just for testing purposes
        // console.log("bbbbbbbbbb", authorizeModalElem);
        authorizeModalElem.querySelector("#exampleInputEmail1").value = "osa@gmail.com";
        authorizeModalElem.querySelector("#exampleInputPassword1").value = "GoDuKu";

        document.body.append(authorizeModalElem);
        initialEmptyContentTitle.style.display = "none"; // h1 - external element!!!!!!!!
        const btnSubmit = authorizeModalElem.querySelector("#btn-submit");

        btnSubmit.addEventListener("click", async (e) => {
          e.preventDefault();
          const email = document.querySelector("#exampleInputEmail1").value;
          const pass = document.querySelector("#exampleInputPassword1").value;

          const response = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: `${email}`, password: `${pass}` }),
          });

          const token = response.ok ? await response.text() : false;

          if (token) {
            this.close();
            initBtn.style.display = "none";
            btnToActivate.style.display = "block"; // btnVisit - extarnal element!!!!!
            resolve(token);
          } else {
            alert("Incorrect email or password!");
          }
        });
      });
    });
  }

  // delete() {
  //     this.background.remove();
  //     document.body.classList.remove("modal-open");
  //     this.modal.remove();
  //     // bodyTitle.style.display = "none";
  //   }
}
