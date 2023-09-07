const userSubmission = document.querySelector("#submission")
const formContainer = document.querySelector("#forms-container")
const getAUSer = document.querySelector("#get-a-user")
const userName = document.querySelector("#user-name-population")
const userImage = document.querySelector("#user-image-population")
const userEmail = document.querySelector("#user-email-population")
const userBirthday = document.querySelector("#user-birthday-population")
const userPopulationDiv = document.querySelector("#populate-user")



formContainer.addEventListener('submit', event =>{
    event.preventDefault()
    
    let userObj = {
        name: event.target["name"].value,
        email: event.target["email"].value,
        birthday: event.target["birthday"].value,
        image: event.target["user-image"].value
    }

    addUser(userObj)
})


fetch("http://localhost:3000/users")
.then(response => response.json()) 
.then(users =>{
    getAUSer.addEventListener("click", event =>{
        const randomUser = Math.floor(Math.random() * users.length)

        userName.textContent = users[randomUser].name
        userImage.src = users[randomUser].image
        userEmail.textContent = users[randomUser].email
        userBirthday.textContent = users[randomUser].birthday

        createEditUserNameForm(users[randomUser])
        createDeleteUserButton(users[randomUser])
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

function deleteUserFromJson(user) {
    fetch(`http://localhost:3000/users/${user.id}`,{
        method: 'DELETE'
    })
}
        
function patchUserName(user, newUserName){
    fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'name': newUserName
        })
    })
    .then(response => response.json())
    .then(console.log(user))
}

function createEditUserNameForm(user){
    const editUserName = document.createElement('form')
    const inputEditUserName = document.createElement('input')
    const submissionEditUserName = document.createElement('input')
    const editUserNameDiv = document.querySelector("#edit-user-div")
    const countEditUserNameDiv = editUserNameDiv.childElementCount

    if (countEditUserNameDiv > 0) {
        return

    } else {
        editUserNameDiv.append(editUserName)

        inputEditUserName.setAttribute('type', 'text')
        inputEditUserName.setAttribute('name', 'edit-user-name')

        submissionEditUserName.setAttribute('type', 'submit')
        submissionEditUserName.setAttribute('id', 'edit-name-submit')
        submissionEditUserName.setAttribute('value', 'Edit Name')

        editUserName.append(inputEditUserName, submissionEditUserName)

        editUserName.addEventListener('submit', event => {
            event.preventDefault()
            const newUserName = event.target[0].value
            userName.textContent = newUserName

            patchUserName(user,newUserName)
        })
    }
}

function createDeleteUserButton(user){
    const deleteUserDiv = document.querySelector("#delete-user-div")
    const countDeleteUserDiv = deleteUserDiv.childElementCount
    
    if (countDeleteUserDiv > 0) {
        return

    } else {
        const deleteUserButton = document.createElement('button')
        deleteUserButton.setAttribute('id', "delete-user")
        deleteUserButton.textContent = "Delete User"
        deleteUserDiv.append(deleteUserButton)

        deleteUserButton.addEventListener("click", event =>{
            userName.textContent = "User"
            userImage.src = "https://static1.squarespace.com/static/5898e29c725e25e7132d5a5a/58aa11bc9656ca13c4524c68/58aa11e99656ca13c45253e2/1487540713345/600x400-Image-Placeholder.jpg?format=original"
            userEmail.textContent = "User Email"
            userBirthday.textContent = "User Birthday"
            deleteUserFromJson(user)
        })  
    }   
}
