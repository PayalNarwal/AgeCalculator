// Elements
const dayIn = document.getElementById('dayIn');
const monthIn = document.getElementById('monthIn');
const yearIn = document.getElementById('yearIn');
const dayOut = document.getElementById('dayOut');
const monthOut = document.getElementById('monthOut');
const yearOut = document.getElementById('yearOut');
const calculateBtn = document.getElementById('calculateBtn');
const errorStyle = '0.5px solid var(--Light-red)';

// Calculate Button
calculateBtn.addEventListener('click', () => {
  const D = parseInt(dayIn.value);
  const M = parseInt(monthIn.value);
  const Y = parseInt(yearIn.value);

  if (!(validateDay() && validateMonth() && validateYear())) return;

  // SAFE DATE CREATION
  const birthDate = new Date(Y, M - 1, D);
  const currentDate = new Date();

  const timeDiff = currentDate - birthDate;

  // Years, months, days
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  // Adjust month & day
  if (days < 0) {
    months--;
    days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Hours & minutes
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  // Display values
  yearOut.innerText = years;
  monthOut.innerText = months;
  dayOut.innerText = days;
  document.getElementById('hourOut').innerText = hours;
  document.getElementById('minuteOut').innerText = minutes;
});


// Trigger calculation when pressing Enter
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    calculateBtn.click(); // simulates button click
  }
});

// Get Number of Days in a particular months
function getNoOfDays(y, m) {
  return new Date(y, m, 0).getDate();
}

/*================ on Blur Validation =========================*/

// On Blur day validation
dayIn.addEventListener('blur', () => {
  validateDay();
});

// Validate Day function
const validateDay = () => {
  const D = dayIn.value;
  const M = monthIn.value;
  const Y = yearIn.value;
  if (D == '') {
    showMessage(dayIn, 'This field is required', errorStyle);
    return false;
  } else if (!validDay(Y, M, D)) {
    showMessage(dayIn, 'Must be a valid day', errorStyle);
    return false;
  } else {
    showMessage(dayIn, '', '');
    return true;
  }
};

// On Blur month validation
monthIn.addEventListener('blur', () => {
  validateMonth();
});

const validateMonth = () => {
  const M = monthIn.value;
  if (M == '') {
    showMessage(monthIn, 'This field is required', errorStyle);
    return false;
  } else if (!validMonth(M)) {
    showMessage(monthIn, 'Must be a valid month', errorStyle);
    return false;
  } else {
    showMessage(monthIn, '', '');
    return true;
  }
};

// on Blur Year validate
yearIn.addEventListener('blur', () => {
  validateYear();
});

const validateYear = () => {
  const Y = yearIn.value;
  const M = monthIn.value;
  const D = dayIn.value;
  if (Y == '') {
    showMessage(yearIn, 'This field is required', errorStyle);
    return false;
  } else if (!validYear(Y, M, D)) {
    showMessage(yearIn, 'Must be in past', errorStyle);
    return false;
  } else {
    showMessage(yearIn, '', '');
    return true;
  }
};

// Validate Day
function validDay(y, m, d) {
  if (d > getNoOfDays(y, m) || d < 1) return false;
  return true;
}

// validate Month
function validMonth(m) {
  if (m > 12 || m < 1) return false;
  return true;
}

// Validate Year
function validYear(y, m, d) {
  const secondDate = new Date();
  const firstDate = new Date(y, m - 1, d);
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
}

// Display Message
function showMessage(elem, msg, border) {
  elem.style.border = border;
  elem.nextElementSibling.innerText = msg;
}

/*================ Theme switching =========================*/

// Theme switching
const themeButtons = document.querySelectorAll(".theme-btn");
themeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
});

// Load saved theme
const saved = localStorage.getItem("theme");
if (saved) {
  document.documentElement.setAttribute("data-theme", saved);
}

