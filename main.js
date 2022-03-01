// Get Element
const heading = document.getElementById('heading');
let text = "Select Your Fevorite mobile";
const massage = document.getElementsByClassName('massage')[0];
const inputValue = document.getElementById('input-value');
const mobileContainer = document.getElementById('mobile-container');
const mobileModal = document.getElementById('mobileModal');



// Get Data
const getData = () => {
    // Validation part
    if (!isNaN(inputValue.value) || inputValue.value == "") {
        massage.textContent = "Please enter the valid text....";
        massage.style.display = "block";
        inputValue.value = "";
        setTimeout(() => {
            massage.style.display = "none";
        }, 2000)
    } else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue.value}`)
            .then((res => res.json()))
            .then(data => console.log(data.mobiles)
    }
}

const displayItem = (items) => {
    // Remove Previous element
    mobileContainer.textContent = "";
    //Create All element
    items.forEach(mobile => {
        let div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div onclick = "signleItem('${mobile.idmobile}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card" style="cursor: pointer;">
        <img  src="${mobile.strmobileThumb}" class="card-img-top img-fluid" alt="${mobile.strmobile}">
        <div class="card-body">
            <h5 class="card-title">${mobile.strmobile}</h5>
            <p class="card-text">${mobile.strInstructions.slice(0, 100)}</p>
        </div>
    </div>
    `
        mobileContainer.appendChild(div);
    });
    inputValue.value = "";
}