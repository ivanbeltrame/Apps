function calculate() {
    let numbers = document.getElementById("numbers").children;

    let sum = 0;
    let weights = 0;

    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i].children[0].value.replace(",", ".");
        let weight = numbers[i].children[1].value;
        if (weight == "") {
            weight = 100;
        }

        sum += number * weight;
        weights += weight*1; // *1 for casting to a int
    }

    let average = (sum / weights).toFixed(2);
    if (isNaN(average)) {
        document.getElementById("average").innerHTML = "Cannot calculate the average!";
    } else {
        document.getElementById("average").innerHTML = "The average is " + average;
    }
}

function addField() {
    let numbers = document.getElementById("numbers");
    let newField = document.createElement("div");

    newField.className = "field input-group mb-3 mx-auto";
    
    newField.innerHTML += `
    <input type="text" class="form-control" placeholder="Number" aria-label="Number" id="number">
    <input type="text" class="weight-field form-control" placeholder="Weight (100)" aria-label="Weight" id="weight">
    <span class="input-group-text">%</span>
    `;

    numbers.appendChild(newField);
}

function removeField() {
    let numbers = document.getElementById("numbers");
    numbers.removeChild(numbers.lastChild);
}