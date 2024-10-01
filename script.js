function goHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('cageDetails').style.display = 'none';
}

function goToRabbitProfile() {
    const params = new URLSearchParams(window.location.search);
    const cageNumber = params.get('cage') || 1;
    if (!cageNumber) {
        alert("Please select a cage first.");
        return;
    }
    window.location.href = `rabbitinfo.html?cage=${cageNumber}`;
}

function showCageDetails(cageNumber) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('cageDetails').style.display = 'block';
    document.getElementById('cageNumber').innerText = cageNumber;
}

function populateCageDetails(cageNumber) {
    const savedData = localStorage.getItem(`rabbitData${cageNumber}`);
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = document.getElementById('rabbitForm');
        form.serialNumber.value = data.serialNumber;
        form.breed.value = data.breed;
        form.family.value = data.family;
        form.birthDate.value = data.birthDate;
        form.weight.value = data.weight;
        form.gender.value = data.gender;
        if (data.gender === 'female') {
            togglePregnancy(true);
            form.pregnant.value = data.pregnant;
            form.matedRabbit.value = data.matedRabbit;
            form.pregnancyStart.value = data.pregnancyStart;
            form.dueDate.value = data.dueDate;
        }
        form.foodIntake.value = data.foodIntake;
        form.note.value = data.note;
    }
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
    const gender = form.gender.value;
    const data = {
        serialNumber: form.serialNumber.value,
        breed: form.breed.value,
        family: form.family.value,
        birthDate: form.birthDate.value,
        weight: form.weight.value,
        gender: gender,
        pregnant: gender === 'female' ? form.pregnant.value : null,
        matedRabbit: gender === 'female' ? form.matedRabbit.value : null,
        pregnancyStart: gender === 'female' ? form.pregnancyStart.value : null,
        dueDate: gender === 'female' ? form.dueDate.value : null,
        foodIntake: form.foodIntake.value,
        mating: form.mating.value,
        note: form.note.value
    };

    const cageNumber = new URLSearchParams(window.location.search).get('cage') || 1;
    localStorage.setItem(`rabbitData${cageNumber}`, JSON.stringify(data));
    goHome();
}

function clearForm() {
    const form = document.getElementById('rabbitForm');
    form.reset(); // Reset all form fields
    document.getElementById('note').value = ''; // Clear the notes textarea
    togglePregnancy(false); // Hide pregnancy details
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
