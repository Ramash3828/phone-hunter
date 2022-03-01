// Get Element
const heading = document.getElementById('heading');
let text = "Search Your Fevorite mobile";
const massage = document.getElementsByClassName('massage')[0];
const inputField = document.getElementById('input-value');
const mobileContainer = document.getElementById('mobile-container');
const mobileModal = document.getElementById('mobileModal');



//Heading animation
let start = 0;
function textTypieng() {
    heading.innerText = text.slice(0, start);
    start++;

    if(heading.innerText.length == text.length){ 
        clearInterval(time)       
        return false;
    }
}
let time = setInterval(textTypieng, 100)

// Get Data
const getData = () => {

    // Validation part
    if (!isNaN(inputField.value) || inputField.value == "") {
        massage.textContent = "Please enter the valid text....";        
        massage.style.display = "block";
        inputField.value = "";
        mobileContainer.textContent = "";
        loader("block");
        setTimeout(() => {
            massage.style.display = "none";
            // loader("none");
        }, 2000)
    } else {
        mobileContainer.textContent = "";
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputField.value.toLowerCase()}`)
        .then((res => res.json()))
        .then(data =>  displayItem(data.data))    
        loader("none");
    }
}  
// Loader function
const loader = (showHide)=>{ document.getElementById('load').style.display= showHide;}
const notFound = (showHide)=>{ document.getElementById('noData').style.display= showHide;}

const displayItem = (items) => {
 
    // Data not found
    if(items.length == 0){
        notFound("block")
        loader("block")
        setTimeout(() => {
          
            notFound("none");
            loader("none");
        }, 5000)
    }

    // Remove Previous element
    mobileContainer.textContent = "";
    //Create All element
    items.forEach((mobile) => { 
        let div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div  data-bs-toggle="modal" data-bs-target="#exampleModal" class="card" style="cursor: pointer;">
            <img  src="${mobile.image}" class="card-img-top img-fluid" alt="${mobile.phone_name}">
            <div class="card-body">
                <h5 class="card-title"><strong>Name:</strong> ${mobile.phone_name}</h5>
                <p class="card-text"><strong>Brand:</strong> ${mobile.brand}</p>
                <button onclick = "signleItem('${mobile.slug}')" type="button" class="btn btn-secondary" >Details</button>
            </div>
        </div>
        `;
        mobileContainer.appendChild(div);
       
    });

    inputField.value = "";
}


// GET Signle Item
const signleItem = function(mobileID) {
    fetch(`https://openapi.programming-hero.com/api/phone/${mobileID}`)
    .then((res => res.json()))
    .then(data => displayData(data.data))
}
// Display Signle Item
function displayData(data) {

    // Release Date
    let releaseDate = "";
    if(data.releaseDate == ""){
        releaseDate = "No date updated"
    }else{
        releaseDate = data.releaseDate;
    }
    // Sensor data
    let sensor = data.mainFeatures.sensors;
    let sensorItem = [];
    sensor.forEach((item) =>{
        return sensorItem.push(item + " ");
    });

    // Remove Previous element
    mobileModal.textContent = "";
    //Create div element
    const div = document.createElement('div');
    div.classList.add('modal-content');
    div.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title text-success" id="exampleModalLabel">${data.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        
        <div class="modal-body w-100 mx-auto">
            <div class="row w-100 g-0">
                <div class="col-md-4 align-items-center">
                    <img src="${data.image}" class="card-img-top img-fluid " alt="${data.name}">
                        
                    <p class="card-text mt-3 mb-0"><strong>Release Date:</strong></p>
                    <p class="card-text mt-0">${releaseDate}</p>
                </div>
                <div class="col-md-8 text-start overflow-hidden">
                    <div class="card-body">                       
                        <fieldset>
                            <legend>Main Features:</legend>
                            <p class="card-text mb-0"> <strong>ChipSet:</strong> ${data.mainFeatures.chipSet}</p>
                            <p class="card-text mb-0"> <strong>Storage:</strong> ${data.mainFeatures.storage}</p>
                            <p class="card-text"> <strong>Display Size:</strong> ${data.mainFeatures.displaySize}</p>                       
                        </fieldset>

                        <fieldset>
                            <legend>Others:</legend>
                            <p class="card-text mb-0"><strong>WLAN:</strong> ${data.others !== undefined ? data.others.WLAN : "No property updated."}</p>
                            <p class="card-text"> <strong>Bluetooth:</strong> ${data.others !== undefined ? data.others.Bluetooth : "No property updated."}</p>
                        </fieldset>
                        <fieldset>
                            <legend>Sensors:</legend>
                            <p class="card-text">${sensorItem }</p>
                        </fieldset>
                    </div>
                </div>
            </div>                  
        </div>

        <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
    mobileModal.appendChild(div);

}