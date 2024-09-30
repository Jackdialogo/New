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
    loadCageData(cageNumber); // Load the data from localStorage for this cage
}

function saveData(event) {
    event.preventDefault();
    const form = document.getElementById('rabbitForm');
    
    // Calculate rabbit age based on birthdate
    const birthDate = new Date(form.birthDate.value);
    const today = new Date();
    const ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());

    const eligibleForMating = ageInMonths >= 6 ? 'yes' : 'no';

    const data = {
        serialNumber: form.serialNumber.value,
        breed: form.breed.value,
        family: form.family.value,
        birthDate: form.birthDate.value,
        weight: form.weight.value,
        gender: form.gender.value,
        pregnant: form.pregnant ? form.pregnant.value : 'no',
        matedRabbit: form.matedRabbit ? form.matedRabbit.value : '',
        pregnancyStart: form.pregnancyStart ? form.pregnancyStart.value : '',
        dueDate: form.dueDate ? form.dueDate.value : '',
        foodIntake: form.foodIntake.value,
        mating: eligibleForMating,  // Automatically set based on age
        note: form.note.value
    };

    const cageNumber = new URLSearchParams(window.location.search).get('cage') || 1;
    localStorage.setItem(`rabbitData${cageNumber}`, JSON.stringify(data));
    goHome();
}

function loadCageData(cageNumber) {
    const data = JSON.parse(localStorage.getItem(`rabbitData${cageNumber}`)) || {};
    document.getElementById('serialNumber').value = data.serialNumber || '';
    document.getElementById('breed').value = data.breed || '';
    document.getElementById('family').value = data.family || '';
    document.getElementById('birthDate').value = data.birthDate || '';
    document.getElementById('weight').value = data.weight || '';

    if (data.gender === "female") {
        document.querySelector('input[name="gender"][value="female"]').checked = true;
        togglePregnancy(true);
    } else {
        document.querySelector('input[name="gender"][value="male"]').checked = true;
        togglePregnancy(false);
    }

    if (data.pregnant === "yes") {
        document.querySelector('input[name="pregnant"][value="yes"]').checked = true;
        togglePregnancyDetails(true);
    } else {
        document.querySelector('input[name="pregnant"][value="no"]').checked = true;
        togglePregnancyDetails(false);
    }

    document.getElementById('matedRabbit').value = data.matedRabbit || '';
    document.getElementById('pregnancyStart').value = data.pregnancyStart || '';
    document.getElementById('dueDate').value = data.dueDate || '';
    document.querySelector(`input[name="foodIntake"][value="${data.foodIntake || 'normal'}"]`).checked = true;

    // No need to load the 'eligible for mating' field, as it's now calculated automatically.
}

function togglePregnancy(show) {
    document.getElementById('pregnancyOption').style.display = show ? 'block' : 'none';
    document.getElementById('pregnancyDetails').style.display = 'none';
}

function togglePregnancyDetails(show) {
    document.getElementById('pregnancyDetails').style.display = show ? 'block' : 'none';
}
