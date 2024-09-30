// Initialize cages data
let cages = JSON.parse(localStorage.getItem('cages')) || {};

// Function to navigate to the home page
function goHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('cageDetails').style.display = 'none';
    document.getElementById('pregnancyOption').style.display = 'none';
    document.getElementById('pregnancyDetails').style.display = 'none';
    document.getElementById('headerTitle').innerHTML = 'Rabbit Cage';
    updateCageList(); // Update the list of cages
}

// Function to navigate to rabbit profile page
function goToRabbitProfile() {
    const cageNumber = document.getElementById('rabbitForm').dataset.cageNumber || 1;
    window.location.href = `rabbitinfo.html?cage=${cageNumber}`;
}

// Function to update the cage list
function updateCageList() {
    const cageButtonsDiv = document.getElementById('cageButtons');
    cageButtonsDiv.innerHTML = ''; // Clear existing buttons
    Object.keys(cages).forEach(cageNumber => {
        const button = document.createElement('button');
        button.innerHTML = `CAGE ${cageNumber}`;
        button.onclick = () => showCageDetails(cageNumber);
        cageButtonsDiv.appendChild(button);
    });
}

// Function to add a new cage
function addNewCage() {
    let newCageId = 1;
    while (cages[newCageId] !== undefined) {
        newCageId++;
    }
    cages[newCageId] = {};
    localStorage.setItem('cages', JSON.stringify(cages));
    updateCageList();
    document.getElementById('headerTitle').innerHTML = `CAGE ${newCageId}`;
    showCageDetails(newCageId); // Show new cage details
}

// Function to show cage details
function showCageDetails(cageNumber) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('cageDetails').style.display = 'block';
    loadData(cageNumber);
    document.getElementById('rabbitForm').dataset.cageNumber = cageNumber;
    document.getElementById('headerTitle').innerHTML = `CAGE ${cageNumber}`;
}

// Load the data for a particular cage
function loadData(cageNumber) {
    let data = JSON.parse(localStorage.getItem(`rabbitData${cageNumber}`)) || {};
    document.getElementById('serialNumber').value = data.serialNumber || '';
    // Load other form fields as necessary
}

// Save the form data
function saveData(event) {
    event.preventDefault();
    const form = document.getElementById('rabbitForm');
    const cageNumber = form.dataset.cageNumber;
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => {
        obj[key] = value;
    });
    localStorage.setItem(`rabbitData${cageNumber}`, JSON.stringify(obj));
    alert('Data saved successfully!');
    goToRabbitProfile();
}

// Function to delete a cage
function deleteCage() {
    const cageNumber = document.getElementById('rabbitForm').dataset.cageNumber;
    if (confirm(`Are you sure you want to delete Cage ${cageNumber}?`)) {
        delete cages[cageNumber];
        localStorage.setItem('cages', JSON.stringify(cages));
        alert(`Cage ${cageNumber} deleted successfully!`);
        goHome();
    }
}

// Function to clear the form
function clearForm() {
    document.getElementById('rabbitForm').reset();
}
