const electron = require('electron')

// ipc renderer
const ipc = electron.ipcRenderer

// card-body element
const diseaseListingEl = document.getElementById('diseaseCocktail')

// function definitions
function diseaseListRemoveChildren() {
    while (diseaseListingEl.firstChild) {
        diseaseListingEl.removeChild(diseaseListingEl.firstChild);
    }
}

function formatDiseaseDiv(doc, disease) {
    const diseaseEntry = doc.createElement('div')
    diseaseEntry.classList.add("card", "text-white", "mb-3")

    //format disease header
    const diseaseHeader = doc.createElement('div')
    diseaseHeader.classList.add("card-header", "pb-0", "bg-unique")
    diseaseHeader.innerHTML =
        `<div class="d-flex"> 
        <label class="mr-auto text-nowrap">${disease.name}</label>
        <span id="diseaseLevel text-nowrap">Level: ${disease.level}</span>
    </div>`
    /* const headerFlex = doc.createElement('div')
    headerFlex.classList.add("d-flex")

    const diseaseLabel = doc.createElement('label')
    diseaseLabel.classList.add("mr-auto", "text-nowrap") */

    //format disease body
    const diseaseBody = doc.createElement('div')
    diseaseBody.classList.add("card-body", "pt-2", "bg-unique-light")

    diseaseBody.innerHTML =
    `<div class="row">
        <div class="col-12 col-md-4">
            <label class="text-nowrap mr-1">Save</label>
            <span id="saveDC" class="badge badge-pill badge-unique">${disease.save}</span>
        </div>
        <div class="col-12 col-md-4">
            <label class="text-nowrap mr-1">Onset</label>
            <span id="onset" class="badge badge-pill badge-unique">${disease.onset}</span>
        </div>
        <div class="col-12 col-md-4">
            <label class="text-nowrap mr-1">Frequency</label>
            <span id="frequency" class="badge badge-pill badge-unique">${disease.frequency}</span>
        </div>
    </div>
    <button class="btn btn-unique btn-sm waves-effect waves-light descr-toggle" type="button" data-toggle="collapse" data-target="#${disease.id}description" aria-expanded="false" aria-controls="${disease.id}description">
        Description
    </button>
    <p class="card-text text-white mt-1 collapse" id="${disease.id}description">
        ${disease.description}
    </p>`

    diseaseEntry.appendChild(diseaseHeader)
    diseaseEntry.appendChild(diseaseBody)

    return diseaseEntry
}

// click event for infect button
document.getElementById('generateDiseases').addEventListener('click', _ => {
    let level = document.getElementById('antipaladinLevel').value
    let diseaseCount = document.getElementById('numberOfDiseases').value
    /* TODO: VALIDATION!!! */
    ipc.send('infect-antipaladin', level, diseaseCount)
})

// populate card-body with diseases
ipc.on('antipaladin-infected', (evt, selectedDiseases) => {
    // clear out diseaseListingEl -- seperate function??
    diseaseListRemoveChildren()

    // add divs for each disease
    selectedDiseases.forEach(disease => {
        diseaseListingEl.appendChild(formatDiseaseDiv(document, disease))
    });
})

