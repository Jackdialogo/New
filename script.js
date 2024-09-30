function goHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('cageDetails').style.display = 'none';
}

function goToRabbitProfile() {
    const params = new URLSearchParams(window.location.search);
    const cageNumber = params.get('cage') || 1;
    window.location.href = `rabbitinfo.html?cage=${cageNumber}`;
}

function showCageDetails(cageNumber) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('cageDetails').style.display = 'block';
    document.getElementById('cageNumber').innerText = cageNumber;
}

function checkMatingEligibility() {
    const birthDate = document.getElementById('birthDate').value;
    const notesTextarea = document.getElementById('note');
    if (!birthDate) {
        notesTextarea.value = ''; // Clear the notes if no birth date is provided
        return;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());

    // If the rabbit is 6 months or older, it is eligible for mating.
    const eligibility = ageInMonths >= 6;

    if (eligibility) {
        notesTextarea.value = 'The rabbit is eligible for mating.'; // Set the eligibility note
    } else {
        notesTextarea.value = ''; // Clear the note if not eligible
    }
}

function saveData(event) {
    event.preventDefault();
    const form = document.getElementById('rabbitForm');
    const data = {
        serialNumber: form.serialNumber.value,
        breed: form.breed.value,
        family: form.family.value,
        birthDate: form.birthDate.value,
        weight: form.weight.value,
        gender: form.gender.value,
        pregnant: form.pregnant ? form.pregnant.value : 'no',
        matedRabbit: form.matedRabbit.value,
        pregnancyStart: form.pregnancyStart.value,
        dueDate: form.dueDate.value,
        foodIntake: form.foodIntake.value,
        mating: form.mating.value,
        note: form.note.value
    };

    const cageNumber = new URLSearchParams(window.location.search).get('cage') || 1;
    localStorage.setItem(`rabbitData${cageNumber}`, JSON.stringify(data));
    goHome();
}

function clearForm() {
    document.getElementById('rabbitForm').reset(); // Reset all form fields
    document.getElementById('note').value = ''; // Clear the notes textarea
}

function deleteCage() {
    const cageNumber = document.getElementById('cageNumber').innerText; // Get current cage number
    const confirmDelete = confirm(`Are you sure you want to delete Cage No. ${cageNumber}?`);
    if (confirmDelete) {
        localStorage.removeItem(`rabbitData${cageNumber}`); // Remove data from local storage
        alert(`Cage No. ${cageNumber} has been deleted.`);
        goHome(); // Return to home page
    }
}

function togglePregnancy(isFemale) {
    document.getElementById('pregnancyOption').style.display = isFemale ? 'block' : 'none';
    document.getElementById('pregnancyDetails').style.display = 'none'; // Hide pregnancy details when gender is toggled
}

function togglePregnancyDetails(show) {
    document.getElementById('pregnancyDetails').style.display = show ? 'block' : 'none';
}

window.onscroll = function() {stickyHeader()};

var header = document.querySelector("header");
var sticky = header.offsetTop;

function stickyHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
