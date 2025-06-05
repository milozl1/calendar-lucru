// Extrage numele utilizatorului din URL
const params = new URLSearchParams(window.location.search);
const user = params.get("user") || "default";
const calendarGrid = document.getElementById("calendarGrid");
const summaryElement = document.getElementById("summary");
const monthTitle = document.getElementById("monthTitle");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const maxHomeDays = 12;


const months = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
];

const holidaysRO = {
  // 2025
  "2025-01-01": "Anul Nou",
  "2025-01-02": "A doua zi după Anul Nou",
  "2025-01-06": "Bobotează",
  "2025-01-07": "Sfântul Ion",
  "2025-01-24": "Unirea Principatelor",
  "2025-04-18": "Vinerea Mare",
  "2025-04-20": "Paște",
  "2025-04-21": "A doua zi de Paște",
  "2025-05-01": "Ziua Muncii",
  "2025-06-01": "Ziua Copilului",
  "2025-06-08": "Rusalii",
  "2025-06-09": "A doua zi de Rusalii",
  "2025-08-15": "Adormirea Maicii Domnului",
  "2025-11-30": "Sfântul Andrei",
  "2025-12-01": "Ziua Națională",
  "2025-12-25": "Crăciun",
  "2025-12-26": "A doua zi de Crăciun",
  // 2026
  "2026-01-01": "Anul Nou",
  "2026-01-02": "A doua zi după Anul Nou",
  "2026-01-06": "Bobotează",
  "2026-01-07": "Sfântul Ion",
  "2026-01-24": "Unirea Principatelor",
  "2026-04-10": "Vinerea Mare",
  "2026-04-12": "Paște",
  "2026-04-13": "A doua zi de Paște",
  "2026-05-01": "Ziua Muncii",
  "2026-05-31": "Rusalii",
  "2026-06-01": "A doua zi de Rusalii",
  "2026-08-15": "Adormirea Maicii Domnului",
  "2026-11-30": "Sfântul Andrei",
  "2026-12-01": "Ziua Națională",
  "2026-12-25": "Crăciun",
  "2026-12-26": "A doua zi de Crăciun",
  // 2027
  "2027-01-01": "Anul Nou",
  "2027-01-02": "A doua zi după Anul Nou",
  "2027-01-06": "Bobotează",
  "2027-01-07": "Sfântul Ion",
  "2027-01-24": "Unirea Principatelor",
  "2027-04-30": "Vinerea Mare",
  "2027-05-02": "Paște",
  "2027-05-03": "A doua zi de Paște",
  "2027-05-01": "Ziua Muncii",
  "2027-06-20": "Rusalii",
  "2027-06-21": "A doua zi de Rusalii",
  "2027-06-01": "Ziua Copilului",
  "2027-08-15": "Adormirea Maicii Domnului",
  "2027-11-30": "Sfântul Andrei",
  "2027-12-01": "Ziua Națională",
  "2027-12-25": "Crăciun",
  "2027-12-26": "A doua zi de Crăciun",
  // 2028
  "2028-01-01": "Anul Nou",
  "2028-01-02": "A doua zi după Anul Nou",
  "2028-01-06": "Bobotează",
  "2028-01-07": "Sfântul Ion",
  "2028-01-24": "Unirea Principatelor",
  "2028-04-14": "Vinerea Mare",
  "2028-04-16": "Paște",
  "2028-04-17": "A doua zi de Paște",
  "2028-05-01": "Ziua Muncii",
  "2028-06-04": "Rusalii",
  "2028-06-05": "A doua zi de Rusalii",
  "2028-06-01": "Ziua Copilului",
  "2028-08-15": "Adormirea Maicii Domnului",
  "2028-11-30": "Sfântul Andrei",
  "2028-12-01": "Ziua Națională",
  "2028-12-25": "Crăciun",
  "2028-12-26": "A doua zi de Crăciun",
  // 2029
  "2029-01-01": "Anul Nou",
  "2029-01-02": "A doua zi după Anul Nou",
  "2029-01-06": "Bobotează",
  "2029-01-07": "Sfântul Ion",
  "2029-01-24": "Unirea Principatelor",
  "2029-04-06": "Vinerea Mare",
  "2029-04-08": "Paște",
  "2029-04-09": "A doua zi de Paște",
  "2029-05-01": "Ziua Muncii",
  "2029-05-27": "Rusalii",
  "2029-05-28": "A doua zi de Rusalii",
  "2029-06-01": "Ziua Copilului",
  "2029-08-15": "Adormirea Maicii Domnului",
  "2029-11-30": "Sfântul Andrei",
  "2029-12-01": "Ziua Națională",
  "2029-12-25": "Crăciun",
  "2029-12-26": "A doua zi de Crăciun",
};

const sarbatoriLegale = [
  // 2025
  "2025-01-01",
  "2025-01-02",
  "2025-01-06",
  "2025-01-07",
  "2025-01-24",
  "2025-04-18",
  "2025-04-20",
  "2025-04-21",
  "2025-05-01",
  "2025-06-01",
  "2025-06-08",
  "2025-06-09",
  "2025-08-15",
  "2025-11-30",
  "2025-12-01",
  "2025-12-25",
  "2025-12-26",

  // 2026
  "2026-01-01",
  "2026-01-02",
  "2026-01-06",
  "2026-01-07",
  "2026-01-24",
  "2026-04-10",
  "2026-04-12",
  "2026-04-13",
  "2026-05-01",
  "2026-05-31",
  "2026-06-01",
  "2026-08-15",
  "2026-11-30",
  "2026-12-01",
  "2026-12-25",
  "2026-12-26",

  // 2027
  "2027-01-01",
  "2027-01-02",
  "2027-01-06",
  "2027-01-07",
  "2027-01-24",
  "2027-04-30",
  "2027-05-01",
  "2027-05-02",
  "2027-05-03",
  "2027-06-01",
  "2027-06-20",
  "2027-06-21",
  "2027-08-15",
  "2027-11-30",
  "2027-12-01",
  "2027-12-25",
  "2027-12-26",

  // 2028
  "2028-01-01",
  "2028-01-02",
  "2028-01-06",
  "2028-01-07",
  "2028-01-24",
  "2028-04-14",
  "2028-04-16",
  "2028-04-17",
  "2028-05-01",
  "2028-06-01",
  "2028-06-04",
  "2028-06-05",
  "2028-08-15",
  "2028-11-30",
  "2028-12-01",
  "2028-12-25",
  "2028-12-26",

  // 2029
  "2029-01-01",
  "2029-01-02",
  "2029-01-06",
  "2029-01-07",
  "2029-01-24",
  "2029-04-06",
  "2029-04-08",
  "2029-04-09",
  "2029-05-01",
  "2029-05-27",
  "2029-05-28",
  "2029-06-01",
  "2029-08-15",
  "2029-11-30",
  "2029-12-01",
  "2029-12-25",
  "2029-12-26",
];

document.getElementById("userInfo").textContent = `Utilizator: ${user}`;

// Funcție pentru a verifica dacă o dată este sărbătoare legală
function esteSarbatoare(dateStr) {
  return sarbatoriLegale.includes(dateStr);
}

function numaraZileLucratoare(an, luna) {
  // luna = 1-based
  const zileLuna = new Date(an, luna, 0).getDate(); // luna următoare, zi 0 → ultima zi din luna "luna"

  let zileLucratoare = 0;

  for (let zi = 1; zi <= zileLuna; zi++) {
    const data = new Date(an, luna - 1, zi); // luna - 1 pentru Date
    const ziSaptamana = data.getDay(); // 0 = Duminică, 6 = Sâmbătă
    const dateStr = data.toISOString().split("T")[0]; // 'YYYY-MM-DD'

    if (ziSaptamana !== 0 && ziSaptamana !== 6 && !esteSarbatoare(dateStr)) {
      zileLucratoare++;
    }
  }

  return zileLucratoare;
}

let currentDate = new Date();

const storageKey = (year, month) => `calendar-${user}-${year}-${month}`;


function saveSelections(year, month) {
  const selections = [];
  document.querySelectorAll("#calendarGrid .day select").forEach((select) => {
    selections.push(select.value);
  });
  localStorage.setItem(storageKey(year, month), JSON.stringify(selections));
}

function loadSelections(year, month) {
  const saved = localStorage.getItem(storageKey(year, month));
  return saved ? JSON.parse(saved) : [];
}

function updateSummary(an, luna) {
  const counts = { office: 0, home: 0, vacation: 0 };

  document.querySelectorAll("#calendarGrid .day select").forEach((select) => {
    const value = select.value;
    if (value && counts[value] !== undefined) {
      counts[value]++;
    }
  });

  // Număr total zile lucrătoare (fără weekend și sărbători)
  const zileObligatorii = numaraZileLucratoare(an, luna);

  summaryElement.innerHTML = `
    <strong>Rezumat:</strong><br/>
    - Zile Office: ${counts.office}<br/>
    - Zile Home: ${counts.home} ${
    counts.home > 12 ? "(⚠ !DEPASIT! ⚠)" : ""
  }<br/>
    - Zile Vacanță: ${counts.vacation}<br/>
    - Total zile alese: ${counts.office + counts.home + counts.vacation}
  `;
}

function generateCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const savedSelections = loadSelections(year, month);

  monthTitle.textContent = `${months[month]} ${year}`;
  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarGrid.innerHTML = "";

  ["Lun", "Mar", "Mie", "Joi", "Vin", "Sam", "Dum"].forEach((day) => {
    const dayName = document.createElement("div");
    dayName.textContent = day;
    dayName.style.fontWeight = "bold";
    calendarGrid.appendChild(dayName);
  });

  for (let i = 0; i < startDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("day", "disabled");
    calendarGrid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.classList.add("day");

    const dateObj = new Date(year, month, d);
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      d
    ).padStart(2, "0")}`;

    const label = document.createElement("div");
    label.textContent = d;
    cell.appendChild(label);

    const select = document.createElement("select");
    ["", "office", "home", "vacation"].forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt
        ? opt.charAt(0).toUpperCase() + opt.slice(1)
        : "";
      select.appendChild(option);
    });

    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
    const isHoliday = holidaysRO[dateString];

    if (isWeekend) {
      select.disabled = true;
      cell.classList.add("weekend");
      cell.title = "Weekend";
    }

    if (isHoliday) {
      cell.title = isHoliday;
      if (!isWeekend) {
        select.disabled = true;
        select.value = "office";
        cell.classList.add("worked-office");
      } else {
        select.disabled = true;
        select.value = "";
        cell.classList.add("holiday-weekend");
      }
    }

    if (savedSelections[d - 1]) {
      select.value = savedSelections[d - 1];

      if (select.value === "office") {
        cell.classList.add("worked-office");
      } else if (select.value === "home") {
        cell.classList.add("free");
      } else if (select.value === "vacation") {
        cell.classList.add("remote-work");
      }
    }

    select.addEventListener("change", function () {
      cell.classList.remove("worked-office", "free", "remote-work");

      if (select.value === "office") {
        cell.classList.add("worked-office");
      } else if (select.value === "home") {
        cell.classList.add("free");
      } else if (select.value === "vacation") {
        cell.classList.add("remote-work");
      }

      saveSelections(year, month);
      updateSummary();
    });

    cell.appendChild(select);
    calendarGrid.appendChild(cell);
  }

  updateSummary();
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  generateCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  generateCalendar(currentDate);
});

generateCalendar(currentDate);
