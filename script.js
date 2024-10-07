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

function goToEditForm() {
    const params = new URLSearchParams(window.location.search);
    const cageNumber = params.get('cage');
    if (!cageNumber) {
        alert("Cage number not found.");
        return;
    }
    window.location.href = `rabbitinfo.html?cage=${cageNumber}&edit=true`; 
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
            form.pregnancyStart.value = data.pregnancyStart || ""; // Leave blank
            form.dueDate.value = data.dueDate || ""; // Leave blank
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

    const matingEligibilityDiv = document.getElementById('matingEligibility');
    if (ageInMonths >= 6) { // Rabbits eligible for mating at 6 months or older
        matingEligibilityDiv.style.display = 'block';
    } else {
        matingEligibilityDiv.style.display = 'none';
    }
}
