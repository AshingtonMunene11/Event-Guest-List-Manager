document.addEventListener("DOMContentLoaded", () => {
    const guestForm = document.querySelector(".form-container");
    const guestList = document.getElementById("guestList");
    const addGuestButton = document.querySelector(".button");
    let guests = [];

    //the toggle to add a guest name to the page
    function addGuest() {
        const guestNameInput = document.getElementById("guestName");
        const guestCategoryInput = document.getElementById("guestCategory");

        const guestName = guestNameInput.value.trim();
        const guestCategory = guestCategoryInput.value;
        if (!guestName) {
            alert("Please enter a guest name.");
            return;
        }
        if (guests.length >= 10) {
            alert("Guest limit reached! You can only add up to 10 guests.");
            return;
        }
        const guest = {
            id: guests.length,
            name: guestName,
            category: guestCategory,
            attending: true,
            addedTime: new Date().toLocaleTimeString(),
        };
        guests.push(guest);
        renderGuests();
        guestNameInput.value = "";
    }
    function renderGuests() {
        guestList.innerHTML = ""; 

        guests.forEach((guest, index) => {
            const listItem = document.createElement("li");
            listItem.className = guest.attending ? "attending" : "not-attending";

            listItem.innerHTML = `
                <strong>${guest.name}</strong> 
                <span class="category ${guest.category}">${guest.category}</span><br> 
                <small>Added: ${guest.addedTime}</small><br>
                <button class="rsvp" onclick="toggleRSVP(${index})">
                  ${guest.attending ? "Mark as Not Attending" : "Mark as Attending"}
                </button>
                <button class="remove" onclick="removeGuest(${index})">Remove</button>
            `;
            guestList.appendChild(listItem);
        });
    }
    window.toggleRSVP = (index) => {
        guests[index].attending = !guests[index].attending;
        renderGuests();
    };
    window.removeGuest = (index) => {
        guests.splice(index, 1);
        renderGuests();
    };
    addGuestButton.addEventListener("click", addGuest);
});
