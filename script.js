const candidates = [
	{ id :1 , name :"John Doe", skillset :"Java", feedback :"Strong technical skills.", panelName :"Panel A", hrPartner :"Alice Smith", status :"Pending", fleetName :"Fleet A", rating :4 },
	{ id :2 , name :"Jane Smith", skillset :"UI/UX", feedback :"Great design sense.", panelName :"Panel B", hrPartner :"Bob Johnson", status :"Interviewed", fleetName :"Fleet B", rating :5 },
	{ id :3 , name :"Michael Brown", skillset :"QA", feedback :"Met all expectations.", panelName :"Panel C", hrPartner:"Charlie Davis", status:"Hired", fleetName:"Fleet C", rating:"5"},
	{ id :4 , name :"Emily White", skillset :"React", feedback :"Needs improvement in coding.", panelName :"Panel D", hrPartner:"Diana Green", status :"Rejected", fleetName :"Fleet D", rating :3 },
	{ id :5 , name :"Chris Black", skillset :"Python", feedback :"Excellent problem-solving skills.", panelName:"Panel E", hrPartner:"Eva Blue", status:"Pending", fleetName:"Fleet E", rating :4 }
];

function loadCandidates() {
	const tableBody = document.querySelector(".candidate-table tbody");
	tableBody.innerHTML = '';
	candidates.forEach(candidate => {
		const row = `
			<tr data-id="${candidate.id}">
				<td>${candidate.name}</td>
				<td>${candidate.skillset}</td>
				<td>${candidate.feedback}</td>
				<td>${candidate.panelName}</td>
				<td>${candidate.hrPartner}</td>
				<td>${candidate.fleetName}</td>
				<td>${candidate.rating}</td>
				<td>${candidate.status}</td>	
				<td><button onclick='editCandidate(${candidate.id})'>Edit</button> | 
					<button onclick='deleteCandidate(${candidate.id})'>Delete</button></td><!-- Button to delete candidate-->
			<tr>`;
		tableBody.innerHTML += row;
	});
}

function addCandidate(event) {
	event.preventDefault();
	const candidate = {
		id : candidates.length +1,
		name : document.getElementById('name').value,
		skillset : document.getElementById('skillset').value,
		feedback : document.getElementById('feedback').value,
		panelName : document.getElementById('panelName').value,
		hRPartner : document.getElementById('hrPartner').value,
		status : document.getElementById('status').value,
		fleetName : document.getElementById('fleetName').value,
        rating : document.getElementById('rating').value
	};

	candidates.push(candidate);
	loadCandidates();
	document.getElementById('candidateForm').reset();
}

function deleteCandidate(id) {
	const index = candidates.findIndex(candidate => candidate.id === id);
	if (index !== -1) {
		candidates.splice(index, 1);
		loadCandidates();
	}
}

function editCandidate(id) {
	const candidate = candidates.find(candidate => candidate.id === id);
	if (candidate) {
        document.getElementById('name').value = candidate.name;
        document.getElementById('skillset').value = candidate.skillset;
        document.getElementById('feedback').value = candidate.feedback;
        document.getElementById('panelName').value = candidate.panelName;
        document.getElementById('hrPartner').value = candidate.hrPartner;
        document.getElementById('status').value = candidate.status;
        document.getElementById('fleetName').value = candidate.fleetName; 
        document.getElementById('rating').value = candidate.rating;

        const submitButton = document.querySelector('.btn-primary');
        submitButton.textContent = 'Update Candidate';
        
        submitButton.onclick = function() {
            updateCandidate(id);
        };
        
        openTab(event, 'CandidateForm'); // Switch to Candidate Form tab
      }
}

function updateCandidate(id) {
	const index = candidates.findIndex(candidate => candidate.id === id);
	if (index !== -1) {
	    candidates[index] = {
	        id,
	        name : document.getElementById('name').value,
	        skillset : document.getElementById('skillset').value,
	        feedback : document.getElementById('feedback').value,
	        panelName : document.getElementById('panelName').value,
	        hrPartner : document.getElementById('hrPartner').value,
	        status : document.getElementById('status').value,
	        fleetName : document.getElementById('fleetName').value,
	        rating : document.getElementById('rating').value
	    };
	    loadCandidates();
	    resetForm();
	  }
}

function resetForm() {
	document.getElementById('candidateForm').reset();
	const submitButton = document.querySelector('.btn-primary');
	submitButton.textContent = 'Add Candidate';
	submitButton.onclick = addCandidate;

	const clearButton = document.querySelector(".btn-secondary");
	if (clearButton) clearButton.remove();
}

function openTab(evt, tabName) {
	const tabcontents = document.querySelectorAll('.tabcontent');
	tabcontents.forEach(content => content.classList.remove('active'));
	const tablinks = document.querySelectorAll('.tablinks');
	tablinks.forEach(link => link.classList.remove('active'));
	document.getElementById(tabName).classList.add('active');
	evt.currentTarget.classList.add('active');
}

// Filter candidates based on search input
function filterCandidates() {
	const searchInput = document.getElementById("searchInput").value.toLowerCase();
	const filteredCandidates = candidates.filter(candidate =>
	    candidate.name.toLowerCase().includes(searchInput) || 
	    candidate.skillset.toLowerCase().includes(searchInput) ||
	    candidate.status.toLowerCase().includes(searchInput)
	  );
	loadFilteredCandidates(filteredCandidates);
}

function loadFilteredCandidates(filteredCandidates) {
	const tableBody = document.querySelector(".candidate-table tbody");
	tableBody.innerHTML = '';
	filteredCandidates.forEach(candidate => {
	    const row = `
			<tr data-id="${candidate.id}">
				<td>${candidate.name}</td>
				<td>${candidate.skillset}</td>
				<td>${candidate.feedback}</td>
				<td>${candidate.panelName}</td>
				<td>${candidate.hrPartner}</td>
				<td>${candidate.fleetName}</td>
				<td>${candidate.rating}</td>	
				<td>${candidate.status}</td>	
				<td><button onclick='editCandidate(${candidate.id})'>Edit</button> | 
					<button onclick='deleteCandidate(${candidate.id})'>Delete</button></td><!-- Button to delete candidate-->
			<tr>`;
	    tableBody.innerHTML += row;	
});
}

// Toggle Show All Applications functionality
let showAllApplications = false;

function toggleShowAll() {
	const tableBody = document.querySelector(".candidate-table tbody");
	if (showAllApplications) {
	    tableBody.innerHTML = '';
	    loadFilteredCandidates([]);
	    showAllApplications = false;
	    $('#showAllButton').text("Show All Applications");
	  } else {
	    loadCandidates();
	    showAllApplications = true;
	    $('#showAllButton').text("Hide All Applications");
	  }
}


// Event listeners
document.getElementById('candidateForm').addEventListener('submit', addCandidate);
document.getElementById("searchInput").addEventListener("keyup", filterCandidates);
loadCandidates();
