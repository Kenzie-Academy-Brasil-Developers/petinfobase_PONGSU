import { login, getUserData } from "../../scripts/api.js";
import { verifyInputs, verification } from "../../scripts/formVerifications.js";

const loginCall = () => {
	const loginForm = document.querySelector("form")
	const loginFormElements = [...loginForm.elements]
	const loginBttn = loginForm.querySelector('.bttn-blue')

	loginForm.addEventListener("submit", async (e) => {
		e.preventDefault()
		loginBttn.innerHTML = '<img id="spiner" src="../../src/spinnerspiner.svg" alt="">'
		const body = {}

		loginFormElements.forEach((elem) => {
			if (elem.tagName == "INPUT" && elem.value !== "") {
				body[elem.id] = elem.value
			}
		})
		await login(body)
	})

}
loginCall()

function registerLink() {
	const goToRegisterBttn = document.getElementById('go-to-register')
	goToRegisterBttn.addEventListener('click', () => {
		window.location.replace("../register/index.html")
	})
}
registerLink()

verifyInputs()