const userSubmission = document.querySelector("#submission")
const formContainer = document.querySelector("#forms-container")
const getAUSer = document.querySelector("#get-a-user")
const userName = document.querySelector("#user-name-population")
const userImage = document.querySelector("#user-image-population")
const userEmail = document.querySelector("#user-email-population")
const userBirthday = document.querySelector("#user-birthday-population")



formContainer.addEventListener('submit', event =>{
    event.preventDefault()
    
    let userObj = {
        name: event.target["name"].value,
        email: event.target["email"].value,
        birthday: event.target["birthday"].value,
        image: event.target["user-image"].value
    }

    addUser(userObj)
    event.reset()
})


fetch("http://localhost:3000/users")
.then(response => response.json()) 
.then(users =>{
    getAUSer.addEventListener("click", event =>{
        const randomUser = Math.floor(Math.random() * users.length)
        console.log(userImage)

        userName.textContent = users[randomUser].name
        userImage.src = users[randomUser].image
        userEmail.textContent = users[randomUser].email
        userBirthday.textContent = users[randomUser].birthday
    })
})

function addUser(newUser){
    fetch("http://localhost:3000/users",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(user => console.log(user))
}