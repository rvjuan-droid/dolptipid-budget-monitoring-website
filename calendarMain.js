const monthYearElement = document.getElementById("monthYear");
const datesElement = document.getElementById("dates");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentDate = new Date();

function updateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    monthYearElement.textContent = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    let datesHTML = "";

    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = startDay; i > 0; i--) {
        datesHTML += `<div class="date inactive">${prevMonthLastDate - i + 1}</div>`;
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

        datesHTML += `<div class="date ${isToday ? "active" : ""}">${day}</div>`;
    }

    const totalCells = startDay + lastDayOfMonth.getDate();
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

    for (let i = 1; i <= remaining; i++) {
        datesHTML += `<div class="date inactive">${i}</div>`;
    }

    datesElement.innerHTML = datesHTML;
}

prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

updateCalendar();
