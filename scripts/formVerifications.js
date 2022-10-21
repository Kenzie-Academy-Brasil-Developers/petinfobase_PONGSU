export const verifyInputs = () => {
    verification()
    
    document.addEventListener('keyup', ()=> {
        verification()
    })

}

export const verification = () => {
    const inputs = [...document.querySelectorAll('input')]
    const submitBttn = document.querySelector('.bttn-blue')
    let allVerifys = inputs.map((input) => {
       return input.value.length == 0
    });
    // allVerifys.splice(2,1) // remover obrigatoriedade da img
    if (allVerifys.includes(true)) {            
        submitBttn.classList.add('disable')
        return submitBttn.disabled = true
    }else{
        submitBttn.classList.remove('disable')
        submitBttn.disabled = false
    }          
}













// export const verifyEmail = () => {
//     const emailInput = document.getElementById('email')
//     const passwordInput = document.getElementById('password')
//     const submitBttn = document.querySelector('.bttn-blue')

//     emailInput.addEventListener('keyup', ()=>{
//         if (emailInput.value.length == 0) {
//             submitBttn.classList.add('disable')
//             submitBttn.disabled = true
//         }else{
//             submitBttn.classList.remove('disable')
//             submitBttn.disabled = false
//         }
//     })
// }

// export const verifyPassword = () => {
//     const passwordInput = document.getElementById('password')
    
// }

// export const verifyUsername = () => {
//     const usernameInput = document.getElementById('username')
    
// }

// export const verifyImage = () => {
//     const avatarInput = document.getElementById('avatar')
    
// }

