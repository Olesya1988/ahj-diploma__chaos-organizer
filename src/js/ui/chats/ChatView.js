export default class ChatView {
  constructor(container, user) {
    this.container = container;
    this.user = user;
  }

  drawUI() {
    const container = document.createElement('div');
    container.classList.add('container');
    this.container.appendChild(container);

    const header = document.createElement('div');
    header.classList.add('container-header');
    container.appendChild(header);

    const title = document.createElement('div');
    title.classList.add('container-header__title');
    title.textContent = 'Chaos Organizer';
    header.appendChild(title);

    const searchForm = document.createElement('form');
    searchForm.classList.add('container-header__search-form');
    header.appendChild(searchForm);

    const search = document.createElement('input');
    search.classList.add('container-header__search-input');
    search.placeholder = 'Поиск';
    search.required = true;
    searchForm.appendChild(search);

    const profile = document.createElement('div');
    profile.classList.add('container-header__profile');
    header.appendChild(profile);

    const body = document.createElement('div');
    body.classList.add('container-body');
    container.appendChild(body);

    const usersList = document.createElement('div');
    usersList.classList.add('users-list');
    body.appendChild(usersList);

    const user = document.createElement('div');
    user.classList.add('user-item', 'user', 'active-user');
    usersList.appendChild(user);

    const userStatus = document.createElement('div');
    userStatus.classList.add('user-status', 'modal-exit__online-img');
    user.appendChild(userStatus);

    const userName = document.createElement('div');
    userName.classList.add('user-name');
    userName.textContent = `${this.user} (Вы)`;
    user.appendChild(userName);

    const bot = document.createElement('div');
    bot.classList.add('user-item', 'bot');
    usersList.appendChild(bot);

    const botStatus = document.createElement('div');
    botStatus.classList.add('modal-exit__online-img');
    bot.appendChild(botStatus);

    const botName = document.createElement('div');
    botName.classList.add('bot-name');
    botName.textContent = 'Bot';
    bot.appendChild(botName);

    const postArea = document.createElement('div');
    postArea.classList.add('post-area', 'post-area__user');
    body.appendChild(postArea);

    const postsHeader = document.createElement('div');
    postsHeader.classList.add('posts-header', 'posts-header__user');
    postArea.appendChild(postsHeader);

    const postTittle = document.createElement('div');
    postTittle.classList.add('posts-header__title', 'posts-header__title__user');
    postTittle.textContent = this.user;
    postsHeader.appendChild(postTittle);

    const menu = document.createElement('div');
    menu.classList.add('posts-header__menu', 'posts-header__menu__user');
    postsHeader.appendChild(menu);

    const files = document.createElement('div');
    files.classList.add('files', 'files__user');
    menu.appendChild(files);

    // const elected = document.createElement('div');
    // elected.classList.add('elected', 'elected__user');
    // menu.appendChild(elected);

    // const info = document.createElement('div');
    // info.classList.add('info', 'info__user');
    // menu.appendChild(info);

    const pinnedPost = document.createElement('div');
    pinnedPost.classList.add('pinned_post', 'pinned_post__user');
    postArea.appendChild(pinnedPost);

    const pinnedImg = document.createElement('div');
    pinnedImg.classList.add('pinned_post-img', 'pinned_post-img__user');
    pinnedPost.appendChild(pinnedImg);

    const pinnedText = document.createElement('div');
    pinnedText.classList.add('pinned_post-text', 'pinned_post-text__user');
    pinnedPost.appendChild(pinnedText);

    const postsList = document.createElement('div');
    postsList.classList.add('posts-list', 'posts-list__user');
    postArea.appendChild(postsList);

    const footer = document.createElement('div');
    footer.classList.add('posts-footer', 'posts-footer__user');
    postArea.appendChild(footer);

    const form = document.createElement('form', 'form');
    form.classList.add('posts-footer__form', 'posts-footer__form__user');
    footer.appendChild(form);

    const input = document.createElement('input');
    input.classList.add('posts-footer__input', 'posts-footer__input__user');
    form.appendChild(input);

    const buttons = document.createElement('div');
    buttons.classList.add('posts-footer__buttons', 'posts-footer__buttons__user');
    footer.appendChild(buttons);

    const attachСontainer = document.createElement('div');
    attachСontainer.classList.add('attach-container');
    buttons.appendChild(attachСontainer);

    const attach = document.createElement('input');
    attach.classList.add('attach');
    attach.type = 'file';
    attach.multiple = true;
    attachСontainer.appendChild(attach);

    const overlap = document.createElement('span');
    overlap.classList.add('overlap');
    attachСontainer.appendChild(overlap);

    const smiles = document.createElement('button');
    smiles.classList.add('smiles');
    buttons.appendChild(smiles);

    const smilesList = document.createElement('button');
    smilesList.classList.add('smiles-list', 'invisible');
    postArea.appendChild(smilesList);

    smilesList.innerHTML = `
    <div class="smiles-item">&#128522;</div>
    <div class="smiles-item">&#129315;</div>
    <div class="smiles-item">&#128525;</div>
    <div class="smiles-item">&#128557;</div>
    <div class="smiles-item">&#128520;</div>
    <div class="smiles-item">&#128545;</div>
    <div class="smiles-item">&#128526;</div>
    <div class="smiles-item">&#128563;</div>
    <div class="smiles-item">&#128565;</div>
    <div class="smiles-item">&#128640;</div>
    <div class="smiles-item">&#128561;</div>
    <div class="smiles-item">&#128591;</div>`;

    const prev = document.createElement('div');
    prev.classList.add('prev', 'invisible');
    postArea.appendChild(prev);

    const previewImage = document.createElement('img');
    previewImage.classList.add('preview-image');
    prev.appendChild(previewImage);

    const previewTitle = document.createElement('span');
    previewTitle.classList.add('preview-title');
    prev.appendChild(previewTitle);

    const previewClose = document.createElement('div');
    previewClose.classList.add('preview-close');
    prev.appendChild(previewClose);
  }
}
