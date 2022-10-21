export const toltip = (condition) => {
  const body = document.querySelector('body')
  if (condition == 1) {
    body.insertAdjacentHTML('beforeend', `
      <div id="create-acc-toltip">
        <span class="toltip-header">
          <img src="../../src/check.png" alt="">
          <h5>Sua conta foi criada com sucesso!</h5>
        </span>
        <p>Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="../login/index.html" class="link">Acessar página de login</a></p>
      </div>     
    `)
  }else if (condition == 2) {
    body.insertAdjacentHTML('beforeend', `
      <div id="delete-toltip">
        <span class="toltip-header">
          <img src="../../src/check.png" alt="">
          <h5>Post deletado com sucesso!</h5>
        </span>
        <p>O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed</p>
      </div>
    `)
  }
}