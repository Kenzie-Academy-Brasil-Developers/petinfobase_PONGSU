import { toltip } from "./toltip.js";
const baseUrl = 'http://localhost:3333/'

// Lista de funções:
// login             ==> linha 13
// getUserData       ==> linha 51
// register          ==> linha 70 
// getPosts          ==> linha 105
// createPost        ==> linha 122
// deletePostRequest ==> linha 142
// editPostRequest   ==> linha 162          (export ==> linha 182)
 
async function login(body) {
  const bttn = document.querySelector('.bttn-blue')
  const errorAlert = document.querySelector('.error-alert')
  if (errorAlert != null) {
    errorAlert.remove()
  }

  try {
    const request = await fetch(baseUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (request.ok) {
      const response = await request.json();

      localStorage.setItem("user", JSON.stringify(response));

      setTimeout(() => {
        window.location.replace("../home/index.html");
      }, 4000);
    } else {
      bttn.innerHTML = 'Acessar'
      bttn.insertAdjacentHTML('afterend', `
      <p class='error-alert'>Usuário e/ou senha invalido(s)</p>
      `)
    }
  } catch (err) {
    bttn.innerHTML = 'Acessar'
    bttn.insertAdjacentHTML('afterend', `
    <p class='error-alert'>ERRO AO FAZER LOGIN</p>
    `)
  }
}

async function getUserData() {
  const user = JSON.parse(localStorage.getItem("user"))
  let userInfo = {}
  try {
    const request = await fetch(baseUrl + "users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    });
    const response2 = await request.json();

    localStorage.setItem("userInfo", JSON.stringify(response2));
    return userInfo = response2
  } catch (err) {
    console.log(err);
  }
}

async function register(body) {
  const bttn = document.querySelector('.bttn-blue')
  const errorAlert = document.querySelector('.error-alert')
  if (errorAlert != null) {
    errorAlert.remove()
  }

  try {
    const request = await fetch(baseUrl + "users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (request.ok) {
      toltip(1)
      setTimeout(() => {
        window.location.replace("../login/index.html");
      }, 4000);
    } else {
      bttn.innerHTML = 'Acessar'
      bttn.insertAdjacentHTML('afterend', `
      <p class='error-alert'>Usuário e/ou email já estão cadastrados</p>
      `)
    }
  } catch (err) {
    bttn.innerHTML = 'Acessar'
    bttn.insertAdjacentHTML('afterend', `
    <p class='error-alert'>OPS! Algo deu errado</p>
    `)
  }
}

async function getPosts() {
  const user = JSON.parse(localStorage.getItem("user"))
  try {
    const request = await fetch(baseUrl + "posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const response = await request.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function createPost(body) {
  const user = JSON.parse(localStorage.getItem("user"))
  try {
    const request = await fetch(baseUrl + "posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function deletePostRequest(id) {
  const user = JSON.parse(localStorage.getItem("user"))
  try {
    const request = await fetch(baseUrl + "posts/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      }
    });

    toltip(2)
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

async function editPostRequest(body, id) {
  const user = JSON.parse(localStorage.getItem("user"))
  try {
    const request = await fetch(baseUrl + "posts/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export { 
  login, 
  getUserData, 
  register, 
  getPosts, 
  createPost, 
  deletePostRequest, 
  editPostRequest
 };
