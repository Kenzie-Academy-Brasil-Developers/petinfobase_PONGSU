import { register } from "../../scripts/api.js";
import { verifyInputs, verification } from "../../scripts/formVerifications.js";

function userRegister() {
	const registerForm = document.querySelector('form')
	const registerFormElements = [...registerForm.elements]
	const registerBttn = registerForm.querySelector('.bttn-blue')

	registerForm.addEventListener("submit", async (e) => {
		e.preventDefault()
		registerBttn.innerHTML = '<img id="spiner" src="../../src/spinnerspiner.svg" alt="">'
		registerBttn.style.height = '40px'
		const body = {}

		registerFormElements.forEach((elem) => {
			if (elem.tagName == "INPUT") {
				body[elem.id] = elem.value
			}
		})
		await register(body)

	})
}
userRegister()


function loginLink() {
	const goToLoginBttns = [...document.getElementsByClassName('go-to-login')]
	goToLoginBttns.map((botao) => {
		botao.addEventListener('click', () => {
			window.location.replace("../login/index.html")
		})
	})
}
loginLink()

verifyInputs()
verification()
