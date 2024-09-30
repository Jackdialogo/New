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
        mating: form.mating.value,
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
    document.querySelector(`input[name="mating"][value="${data.mating || 'no'}"]`).checked = true;
    document.getElementById('note').value = data.note || '';
}

function togglePregnancy(show) {
    document.getElementById('pregnancyOption').style.display = show ? 'block' : 'none';
    document.getElementById('pregnancyDetails').style.display = 'none';
}

function togglePregnancyDetails(show) {
    document.getElementById('pregnancyDetails').style.display = show ? 'block' : 'none';
Here's the merged and corrected code for the rabbit cage form:

### Updated `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rabbit Cage</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <button onclick="goHome()">&#x1F3E0;</button>
        <span id="headerTitle">Rabbit Cage</span>
        <button onclick="goToRabbitProfile()">&#x1F407;</button>
    </header>

    <!-- Cage List (Home Page) -->
    <div id="homePage" class="cage-list">
        <button onclick="showCageDetails(1)">CAGE 1</button>
        <button onclick="showCageDetails(2)">CAGE 2</button>
        <button onclick="showCageDetails(3)">CAGE 3</button>
        <button onclick="showCageDetails(4)">CAGE 4</button>
        <button onclick="showCageDetails(5)">CAGE 5</button>
        <button onclick="showCageDetails(6)">CAGE 6</button>
    </div>

    <!-- Cage Details (Form) -->
    <div id="cageDetails" style="display: none;">
        <h2 id="formTitle">CAGE NO. <span id="cageNumber"></span></h2>
        <form id="rabbitForm" onsubmit="saveData(event)">
            <!-- Serial Number -->
            <div>
                <label for="serialNumber">Serial Number:</label>
                <input type="text" id="serialNumber" name="serialNumber" required>
            </div>

            <!-- Breed -->
            <div>
                <label for="breed">Breed:</label>
                <input type="text" id="breed" name="breed" placeholder="e.g., Lionhead, Angora" required>
            </div>

            <!-- Family -->
            <div>
                <label for="family">Family:</label>
                <input type="text" id="family" name="family">
            </div>

            <!-- Date of Birth -->
            <div>
                <label for="birthDate">Date of Birth:</label>
                <input type="date" id="birthDate" name="birthDate" required>
            </div>

            <!-- Weight -->
            <div>
                <label for="weight">Weight (kg):</label>
                <input type="number" step="0.1" id="weight" name="weight" min="0" required>
            </div>

            <!-- Gender -->
            <div>
                <label>Gender:</label>
                <label><input type="radio" name="gender" value="male" onclick="togglePregnancy(false)" required> Male</label>
                <label><input type="radio" name="gender" value="female" onclick="togglePregnancy(true)" required> Female</label>
            </div>

            <!-- Pregnant Option -->
            <div id="pregnancyOption" style="display: none;">
                <label>Pregnant:</label>
                <label><input type="radio" name="pregnant" value="yes" onclick="togglePregnancyDetails(true)" required> Yes</label>
                <label><input type="radio" name="pregnant" value="no" onclick="togglePregnancyDetails(false)" required> No</label>
            </div>

            <!-- Pregnancy Details -->
            <div id="pregnancyDetails" style="display: none;">
                <div>
                    <label for="matedRabbit">Mated Rabbit:</label>
                    <input type="text" id="matedRabbit" name="matedRabbit">
                </div>
                <div>
                    <label for="pregnancyStart">Start of Pregnancy:</label>
                    <input type="date" id="pregnancyStart" name="pregnancyStart">
                </div>
                <div>
                    <label for="dueDate">Due Date:</label>
                    <input type="date" id="dueDate" name="dueDate">
                </div>
            </div>

            <!-- Food Intake -->
            <div>
                <label>Food Intake:</label>
                <label><input type="radio" name="foodIntake" value="normal" required> Normal</label>
                <label><input type="radio" name="foodIntake" value="irregular" required> Irregular</label>
            </div>

            <!-- Eligible for Mating -->
            <div>
                <label>Eligible for Mating:</label>
                <label><input type="radio" name="mating" value="yes" required> Yes</label>
                <label><input type="radio" name="mating" value="no" required> No</label>
            </div>

            <!-- Notes -->
            <div>
                <label for="note">Notes:</label>
                <textarea id="note" name="note" placeholder="Any additional notes..."></textarea>
            </div>

            <!-- Submit and Cancel Buttons -->
            <div class="buttons">
                <button type="submit">Save</button>
                <button type="button" onclick="goHome()">Cancel</button>
            </div>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>
