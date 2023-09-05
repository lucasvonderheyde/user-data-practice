const emailInput = document.querySelector("#email-here")
const birthdayInput = document.querySelector("#birthday-here")
const nameInput = document.querySelector("#name-here")
const imageInput = document.querySelector("#user-image")

fetch("http://localhost:3000/users")
.then(response => response.json())
.then(users =>{
    console.log(users)
})

fetch("http://localhost:3000/users")