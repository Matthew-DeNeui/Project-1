module.exports = function selectDiseases(level, count, diseases) {
    let workingDiseases = []
    let selectedDiseases = []
    for(let i=level; i>0; i--) {
        workingDiseases = workingDiseases.concat(diseases["level"+i])
    }

    let workingLength = workingDiseases.length
    if (count > workingLength) {
        count = workingLength
    }

    let diseaseIndex
    for(let di=count; di>0; di--) {
        diseaseIndex = Math.floor(Math.random() * (workingLength))
        selectedDiseases.push(workingDiseases[diseaseIndex])
        workingDiseases.splice(diseaseIndex,1)
        workingLength--
    }

    return selectedDiseases;
}