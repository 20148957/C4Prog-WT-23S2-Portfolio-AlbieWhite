const checkbox1 = document.getElementById("1");
const checkbox2 = document.getElementById("2");
const form = document.getElementById('ninjaForm');
const responseArea = document.getElementById('responseArea');
const userInput = document.getElementById('userInput');

function checkIfOne(id)
{
    let otherCheckbox;
    if (id == "1")
    {
        otherCheckbox =checkbox2;
    }
    else if (id == "2")
    {
        otherCheckbox =checkbox1;
    }
    otherCheckbox.checked = false;
    userInput.value = "";
    responseArea.textContent = "Results will appear here...";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    responseArea.textContent = "";
    let userValue = userInput.value.trim();

    let URL;
    if (checkbox1.checked)
    {
        URL = "https://api.api-ninjas.com/v2/quotes?categories=" + (userValue);
    }
    else if (checkbox2.checked)
    {
        URL = "https://api.api-ninjas.com/v1/jokes";
    }

    fetch(URL, {
        headers: { "X-Api-Key": "rY2JXl0p4JXdL1p5VoWTrQ==71zvB10Mk5tZHIFu" }
    })

        .then(function(response) {
            if (!response.ok) {
                return response.text().then(function(text) {
                    throw new Error(text || "API request failed");
                });
            }
            return response.json();
        })
        .then(function(data) {
            if (checkbox1.checked)
            {
                responseArea.textContent = data[data.length - 1].quote;
            }
            else if (checkbox2.checked)
            {
                responseArea.textContent = data[data.length - 1].joke;
            }
        })
        .catch(function(error) {
            responseArea.textContent = "Error: " + error.message;
        });
    })