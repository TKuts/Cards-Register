export default function () {
    /** @type {HTMLFormElement} */
    const filter = document.querySelector(".filter");

    /** @param {string} title @returns {} */
    const showFilteredCards = (title, status, priority) => {
        /** @type {NodeListOf<HTMLDivElement>} */
        const cards = document.querySelectorAll(".card-item");

        for (/** @type {HTMLDivElement} */ const card of cards) {
            const cardTitle = card.querySelector("h5").innerText.toLowerCase();
            const cardStatus = card
                .querySelector(".card-status")
                .innerText.toLowerCase();
            const cardPriority = card
                .querySelector(".card-priority")
                .innerText.toLowerCase();
            console.log(cardStatus, status)
            if (
                (!title || cardTitle.includes(title)) &&
                (!status || cardStatus.includes(status)) &&
                (!priority || cardPriority.includes(priority))
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        }
    };

    filter.addEventListener("change", (e) => {
        const form = e.currentTarget;

        /** @type {HTMLInputElement} */
        const inputElem = form.querySelector("#title-search");
        const title = inputElem.value;

        /** @type {HTMLSelectElement} */
        const statusElem = form.querySelector("#status-search");
        const status = statusElem.value.toLowerCase();
       

        /** @type {HTMLSelectElement} */
        const priorityElem = form.querySelector("#priority-search");
        const priority = priorityElem.value.toLowerCase();

        console.log(title, status, priority);
        showFilteredCards(title, status, priority);
    });

    filter.addEventListener("submit", (e) => {
        e.preventDefault();
    });
}
