const anchors = document.querySelectorAll('a[href="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
    
        const blockID = anchor.getAttribute('href').substr(1)
    
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

function subscripe() {
    document.getElementById("subscripeInput").value = ""
}

function contactDeleteButton() {
    document.getElementById("contactReservationInputFirstName").value = ""
    document.getElementById("contactReservationInputLastName").value = ""
    document.getElementById("contactReservationInputEmail").value = ""
    document.getElementById("contactReservationInputPhone").value = ""
    document.getElementById("contactReservationInputDate").value = ""
    document.getElementById("contactReservationSectionTime").value = "date1"
    document.getElementById("contactReservationSectionPerson").value = "pers1"
}

function bookNow() {
    document.getElementById("reservationDate").value = ""
    document.getElementById("reservationTime").value = "date1"
    document.getElementById("reservationPerson").value = "pers1"
}

function buttonNavigation(navigationFuncType) {
    if(navigationFuncType=="open") {
        document.getElementById("navigation").classList.remove("navigation")
        document.getElementById("navigation").classList.add("navigation-active")
    }

    else if(navigationFuncType=="close") {
        document.getElementById("navigation").classList.add("navigation")
        document.getElementById("navigation").classList.remove("navigation-active")
    }
}