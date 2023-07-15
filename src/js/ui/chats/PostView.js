export default class PostView {
  constructor() {

  }

  getPostHTML(id, name, content, created, status, coordinates, img, audio, video, parent) {
    const item = document.createElement('div');
    item.classList.add('post');
    parent.appendChild(item);

    const photo = document.createElement('div');
    item.appendChild(photo);
    photo.classList.add('post-photo');

    if (name === 'Bot') {
      photo.classList.add('post-photo__bot');
    } else {
      photo.classList.add('post-photo__user');
    }

    const body = document.createElement('div');
    body.classList.add('post-body');
    item.appendChild(body);

    const title = document.createElement('div');
    title.classList.add('post-title');
    body.appendChild(title);

    const user = document.createElement('div');
    user.classList.add('post-title__name');
    user.textContent = name;
    title.appendChild(user);

    if (status === true) {
      const dateEdit = document.createElement('div');
      dateEdit.classList.add('post-title__date-edit');
      dateEdit.textContent = 'ред.';
      title.appendChild(dateEdit);
    }

    const date = document.createElement('div');
    date.classList.add('post-title__date');
    date.textContent = created;
    title.appendChild(date);

    const coordinate = document.createElement('div');
    coordinate.classList.add('post-title__coordinates');
    coordinate.textContent = coordinates;
    title.appendChild(coordinate);

    const text = document.createElement('div');
    text.classList.add('post-text');
    text.textContent = content;
    body.appendChild(text);

    const input = document.createElement('input');
    input.classList.add('post-input', 'invisible');
    body.appendChild(input);

    const identifier = document.createElement('div');
    identifier.classList.add('identifier', 'invisible');
    identifier.textContent = id;
    body.appendChild(identifier);

    if (id !== null) {
      const menu = document.createElement('div');
      menu.classList.add('post-menu', 'invisible');
      title.appendChild(menu);

      const toPinned = document.createElement('div');
      toPinned.classList.add('toPinned');
      menu.appendChild(toPinned);

      const toEdit = document.createElement('div');
      toEdit.classList.add('toEdit');
      menu.appendChild(toEdit);

      const toDelete = document.createElement('div');
      toDelete.classList.add('toDelete');
      menu.appendChild(toDelete);

      const help = document.createElement('div');
      help.classList.add('help', 'invisible');
      body.appendChild(help);

      const ok = document.createElement('button');
      ok.classList.add('help-ok');
      ok.textContent = 'Сохранить';
      help.appendChild(ok);

      const cancel = document.createElement('button');
      cancel.classList.add('help-cancel');
      cancel.textContent = 'Отменить';
      help.appendChild(cancel);
    }

    if (img) {
      const imageItem = document.createElement('img');
      imageItem.classList.add('image-item');
      imageItem.src = img;
      body.appendChild(imageItem);
    }

    if (audio) {
      const audioItem = document.createElement('audio');
      audioItem.classList.add('audio-item');
      audioItem.src = audio;
      audioItem.controls = true;
      body.appendChild(audioItem);
    }

    if (video) {
      const videoItem = document.createElement('video');
      videoItem.classList.add('video-item');
      videoItem.src = video;
      videoItem.controls = true;
      body.appendChild(videoItem);
    }

    return item;
  }

  addInput(item) {
    item.classList.remove('invisible');
    item.classList.add('edit');
  }

  hideInput(item) {
    item.classList.add('invisible');
    item.classList.remove('edit');
  }

  addHelp(item) {
    item.classList.remove('invisible');
  }

  hideHelp(item) {
    item.classList.add('invisible');
  }

  addPost(item) {
    item.classList.remove('invisible');
  }

  hidePost(item) {
    item.classList.add('invisible');
  }

  delete(item) {
    item.remove();
  }
}
