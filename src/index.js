// document.addEventListener('DOMContentLoaded', () => {

// })

const tableBody = document.querySelector("#table-body")
const dogForm = document.querySelector("#dog-form")

function initialize(){
    fetch(`http://localhost:3000/dogs`)
    .then(resp => resp.json())
    .then(data =>{
        data.forEach(dog =>{
            renderDog(dog)
        })
    })
}

function renderDog(dogObj){
    const tr = document.createElement("tr")
    tr.dataset.id = dogObj.id
    tr.innerHTML = `
        <td class="padding center">${dogObj.name}</td>
        <td class="padding center">${dogObj.breed}</td>
        <td class="padding center">${dogObj.sex}</td>
        <td class="padding center"><button value="edit">Edit</button></td>
    `
    tableBody.append(tr)
}


tableBody.addEventListener("click",(e)=>{
    e.preventDefault()
    
    if(e.target.matches("button")){
        const dogId = e.target.closest("tr").dataset.id
        
        fetch(`http://localhost:3000/dogs/${dogId}`)
        .then(resp => resp.json())
        .then(data => renderDogInfo(data))
}
})

function renderDogInfo(dogObj){
    
    dogForm.name.value = dogObj.name
    dogForm.breed.value = dogObj.breed
    dogForm.sex.value = dogObj.sex
    dogForm.dataset.id = dogObj.id
}

dogForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const dogId = e.target.closest("form").dataset.id
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        }),
    })
    
    .then(resp => resp.json())
    .then(data => {
        tableBody.innerHTML = ""
        initialize()})
        

        
})

initialize()