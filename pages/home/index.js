import { getLocalStorage } from "../../scripts/localStorage.js";
import { getPosts, createPost, getUserData, editPostRequest, deletePostRequest } from "../../scripts/api.js";

// Lista de funções:
// verifyLogin       ==> linha 15
// renderUserData    ==> linha 23
// logout            ==> linha 36
// renderPosts       ==> linha 46
// renderCreatePost  ==> linha 89
// openPost          ==> linha 116
// tratarData        ==> linha 145 
// deletePost        ==> linha 154 
// editPost          ==> linha 179 

const verifyLogin = () => {
    const user = getLocalStorage();
    if (user == "") {
        window.location.replace("../login/index.html");
    }
};
verifyLogin();

const renderUserData = async () => {
    const user = getLocalStorage();
    await getUserData()
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || ""
    const userName = document.querySelector("#user-name");
    const userImg = document.querySelector('#user-img')
    userImg.setAttribute("src", userInfo.avatar)
    userName.innerText = userInfo.username;

    renderPosts()
};
renderUserData()

const logout = () => {
    const logoutBttn = document.getElementById('user-logout')
    logoutBttn.addEventListener('click', () => {
        localStorage.removeItem('user')
        localStorage.removeItem('userInfo')
        window.location.replace("../login/index.html");
    })
}
logout()

const renderPosts = async () => {
    const user = getLocalStorage();
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || ""
    await getUserData()
    let posts = await getPosts()
    const postsList = document.getElementById('posts-list')
    postsList.innerHTML = ''
    posts.map((post) => {
        let postTextAux = ''
        if (post.content.length > 145) {
            postTextAux = post.content.substring(0, 145) + "..."
        } else {
            postTextAux = post.content
        }
        postsList.insertAdjacentHTML("beforeend", `
            <article class="post" id="post-${post.id}">
                <div class="post-header">
                    <span class="post-author-infos">
                        <img class='post-author-img' src="${post.user.avatar}" alt="">
                        <p class="post-author-name">${post.user.username}</p>
                        <p class="post-header-separator">|</p>
                        <p class="post-date">${tratarData(post.createdAt)}</p>
                    </span>
                    <span class="post-bttns" id='user-bttns-${post.user.username}'>
                        <button id="edit-${post.id}" class="post-edit-bttn bttn-whiteSmall">Editar</button>
                        <button id="delete-${post.id}" class="post-delete-bttn bttn-greySmall">Excluir</button>
                    </span>
                </div>
                <h3 class="post-tittle">${post.title}</h3>
                <p class="post-text">${postTextAux}</p>
                <p class='open-post-link link' id="open-post-${post.id}">Acessar publicação</p>
            </article>
        `)
        let postBttns = document.getElementById(`user-bttns-${post.user.username}`)
        if (post.user.username != userInfo.username) {
            postBttns.remove()
        }
    })
    openPost()
    deletePost()
    editPost()
}

const renderCreatePost = () => {
    const createPostBttn = document.getElementById('create-post-bttn')
    const createPostModal = document.getElementById('create-post-modal')
    const createPostBttnClose = document.getElementById('create-post-bttn-close')
    const createPostBttnClose2 = document.getElementById('create-post-bttn-close2')

    createPostBttn.addEventListener('click', () => {
        createPostModal.classList.remove('hide')
        createPostBttnClose.addEventListener('click', () => { createPostModal.classList.add('hide') })
        createPostBttnClose2.addEventListener('click', () => { createPostModal.classList.add('hide') })
    })
    const createPostBttnCreate = document.getElementById('create-post-bttn-create')
    const newPostTitle = document.getElementById('new-post-title')
    const newPostText = document.getElementById('new-post-text')

    createPostBttnCreate.addEventListener("click", async () => {
        const post = {
            title: newPostTitle.value,
            content: newPostText.value,
        };
        await createPost(post);
        createPostModal.classList.add('hide')
        await renderPosts();
    });
}
renderCreatePost()

const openPost = async () => {
    const openPostLinks = [...document.getElementsByClassName('open-post-link')]
    const openPostModal = document.getElementById('open-post-modal')

    let openPostImg = document.querySelector('.open-post-author-img')
    let openPostAuthor = document.querySelector('.open-post-author-name')
    let openPostDate = document.querySelector('.open-post-date')
    let openPostTitle = document.querySelector('.open-post-title')
    let openPostText = document.querySelector('.open-post-text')
    const closePostModal = document.getElementById('open-post-close')

    openPostLinks.map((link) => {
        link.addEventListener('click', async () => {
            openPostModal.classList.remove('hide')
            let postID = link.id.slice(10)
            let posts = await getPosts()
            let postOpened = posts.find((post) => post.id == postID)
            openPostImg.setAttribute('src', postOpened.user.avatar)
            openPostAuthor.innerText = postOpened.user.username
            openPostDate.innerText = tratarData(postOpened.createdAt)
            openPostTitle.innerText = postOpened.title
            openPostText.innerText = postOpened.content
            closePostModal.addEventListener('click', () => {
                openPostModal.classList.add('hide')
            })
        })
    })
}

const tratarData = (data) => {
    let dataNova = new Date(data)
    let ano = dataNova.getFullYear()
    let mes = dataNova.getMonth()
    let messesNome = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let dataTratada = messesNome[mes] + ' de ' + ano
    return dataTratada
}

const deletePost = () => {
    const deletePostOpenBttns = [...document.getElementsByClassName('post-delete-bttn')]
    const deletePostModal = document.getElementById('delete-post-modal')
    const finalDeleteBttn = deletePostModal.querySelector('.bttn-red')
    const closeDeleteModalBttns = [...document.getElementsByClassName('delete-modal-close')]

    deletePostOpenBttns.map((bttn) => {
        bttn.addEventListener('click', async () => {
            deletePostModal.classList.remove('hide')
            finalDeleteBttn.id = 'delete-' + bttn.id.slice(7)
            finalDeleteBttn.addEventListener('click', async () => {
                deletePostRequest(finalDeleteBttn.id.slice(7))
                deletePostModal.classList.add('hide')
                return await renderPosts()
            })
        })
    })
    closeDeleteModalBttns.map((closeBttn) => {
        closeBttn.addEventListener('click', async () => {
            deletePostModal.classList.add('hide')
            await renderPosts()
        })
    })
}

const editPost = () => {
    const editPostOpenBttns = [...document.getElementsByClassName('post-edit-bttn')]
    const editPostModal = document.getElementById('post-edit-modal')
    const finalEditBttn = editPostModal.querySelector('.bttn-blue')
    const closeEditModalBttns = [...document.getElementsByClassName('close-edit-modal')]
    let openPostTitle = document.querySelector('#post-editing-title')
    let openPostText = document.querySelector('#post-editing-content')

    editPostOpenBttns.map((bttn) => {
        bttn.addEventListener('click', async () => {
            editPostModal.classList.remove('hide')
            finalEditBttn.id = 'save-edit-' + bttn.id.slice(7)
            let postID = bttn.id.slice(5)
            let posts = await getPosts()
            let postOpened = posts.find((post) => post.id == postID)
            openPostTitle.value = postOpened.title
            openPostText.value = postOpened.content
            finalEditBttn.addEventListener('click', async () => {
                const post1 = {
                    title: openPostTitle.value,
                    content: openPostText.value,
                };
                editPostRequest(post1, postID)
                editPostModal.classList.add('hide')
                await renderPosts()
            })
        })
    })
    closeEditModalBttns.map((closeBttn) => {
        closeBttn.addEventListener('click', async () => {
            editPostModal.classList.add('hide')
            await renderPosts()
        })
    })
}