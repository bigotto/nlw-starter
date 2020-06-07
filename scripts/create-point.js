function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(res => res.json() )
    .then(states => {
        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text

    const id = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>`"
    
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedtItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    //add or remove class
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id; 
    
    //Verificar se existem items selecionados, se sim, pegar os items selecionados
    const alreadySelected = selectedtItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    //Se já houver selecionado, retirar da seleção
    if(alreadySelected >= 0){
       const filteredItems = selectedtItems.filter(item => {
           const itemIsDifferent = item != itemId
           return itemIsDifferent
       })
       selectedtItems = filteredItems
    } else {
        //se não houver selecionado, adicionar
        selectedtItems.push(itemId)
    }
    //atualizar o input escondido com os item selecionados
    collectedItems.value = selectedtItems
}