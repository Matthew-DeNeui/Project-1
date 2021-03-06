const electron = require('electron')
const $ = require('jquery')

// ipc renderer
const ipc = electron.ipcRenderer

// form
let form = $('#dzsform');
let rules = {
    rules : {
        antipaladinLevel: {
            required: true,
            range: [1, 20]
        },
        numberOfDiseases: {
            required: true,
            range: [1, 20]
        }
    },
    messages : {
        antipaladinLevel: {
            required: "Please enter a level for your antipaladin."
        },
        numberOfDiseases: {
            required: "Please enter a number of diseases."
        }
    }
}

// card-body element
const diseaseListingEl = document.getElementById('diseaseCocktail')

// function definitions
function diseaseListRemoveChildren() {
    while (diseaseListingEl.firstChild) {
        diseaseListingEl.removeChild(diseaseListingEl.firstChild);
    }
}

function formatDiseaseDiv(doc, disease, id) {
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
    <button class="btn btn-unique btn-sm waves-effect waves-light descr-toggle" type="button" data-toggle="collapse" data-target="#${id}description" aria-expanded="false" aria-controls="${id}description">
        Description
    </button>
    <p class="card-text text-white mt-1 collapse" id="${id}description">
        ${disease.description}
    </p>`

    diseaseEntry.appendChild(diseaseHeader)
    diseaseEntry.appendChild(diseaseBody)

    return diseaseEntry
}

// click event for infect button
document.getElementById('generateDiseases').addEventListener('click', _ => {
    form.validate(rules)
    if (form.valid()) {
        let level = document.getElementById('antipaladinLevel').value
        let diseaseCount = document.getElementById('numberOfDiseases').value
        console.log(form.valid(), level, diseaseCount)
        ipc.send('infect-antipaladin', level, diseaseCount)
    }
    else {
        console.log("form was invalid")
    }
})

// populate card-body with diseases
ipc.on('antipaladin-infected', (evt, selectedDiseases) => {
    // clear out diseaseListingEl -- seperate function??
    diseaseListRemoveChildren()

    let countID = 0;
    // add divs for each disease
    selectedDiseases.forEach(disease => {
        diseaseListingEl.appendChild(formatDiseaseDiv(document, disease, countID))
        countID++
    });
})

