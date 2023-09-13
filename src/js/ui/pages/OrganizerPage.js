import PostView from '../chats/PostView';
import ChatView from '../chats/ChatView';
import ChatWithBotView from '../chats/ChatWithBotView';
import Coordinates from '../widgets/Coordinates';
import Requests from '../../api/Requests';
import Modals from '../widgets/Modal';

export default class OrganizerPage {
  constructor(container, user) {
    this.container = container;
    this.user = user;
    this.requests = new Requests();
    this.chatView = new ChatView(this.container, this.user);
    this.chatWithBotView = new ChatWithBotView();
    this.modals = new Modals(this.container);
    this.coordinates = new Coordinates(this.container);
    this.data;
    this.count = 10;
  }

  init() {
    this.preloader();
    this.chatView.drawUI();
    this.chatWithBotView.drawUI();
    this.modals.drawDelete();
    this.modals.drawExit(this.user);
    this.modals.drawProfileSettings(this.user);
    this.coordinates.drawModal();
    this.coordinates.drawWarning();
    this.getCoordinates();
    this.modalDelete = document.querySelector('.modal-delete');
    this.postView = new PostView();
    this.changePhoto();
    this.getFiles();
    this.getPinnedPosts();
    this.fileAPI();
    this.id;
    this.img;
    this.audio;
    this.video;
    this.fileName;
    this.place;
    this.bindToDOM();
    this.getSomePosts();
    
    if (!this.profilePhotoClassName) {
      this.profilePhotoClassName = 'modal-settings__photo-cat';
    }
  }

  bindToDOM() {
    document.addEventListener('submit', this.submit.bind(this));
    document.addEventListener('click', this.click.bind(this));
    document.querySelector('.posts-list__user').addEventListener('scroll', this.throttle(this.checkPosition.bind(this), 1000));  
  }

  submit(e) {
    e.preventDefault();
    const { target } = e;
    Array.from(document.querySelectorAll('.post')).forEach((el) => {
      el.style.background = 'white';
    });

    const input = document.querySelector('.posts-footer__input__user');
    const inputBot = document.querySelector('.posts-footer__input__bot');

    if (target.classList.contains('posts-footer__form__user')) { // отправка сообщений от пользователя
      this.requests.createPost(this.user, input.value, Date.now(), false, this.place, this.img, this.audio, this.video, this.fileName);
      this.getAllPosts();
      document.querySelector('.prev').classList.add('invisible');
      this.getFiles();
      this.img = null;
      this.audio = null;
      this.video = null;
    } else if (target.classList.contains('posts-footer__form__bot')) { // отправка команд боту
      const parent = document.querySelector('.posts-list__bot');
      const answer = this.chatWithBotView.getRandomInfo(inputBot.value);
      this.postView.getPostHTML(null, this.user, inputBot.value, new Date().toLocaleString(), null, this.place, null, null, null, parent, this.profilePhotoClassName);
      this.postView.getPostHTML(null, 'Bot', answer, new Date().toLocaleString(), null, this.place, null, null, null, parent);
      inputBot.value = '';
    } else if (target.classList.contains('container-header__search-form')) { // отправляем запрос поиска
      const search = document.querySelector('.container-header__search-input').value;
      this.requests.searchByWord(search);
      this.search();
    }
  }

  click(e) {
    const { target } = e;
    document.querySelector('.modal-coordinates__form-input').style.background = 'white';

    if (target.classList.contains('toDelete')) { // кнопка удаления поста
      this.modals.show(this.modalDelete);
      this.id = this.getId(target);
    } else if (target.classList.contains('toEdit')) { // кнопка редактирования поста
      const text = target.closest('.post').querySelector('.post-text');
      const help = target.closest('.post').querySelector('.help');
      const input = target.closest('.post').querySelector('.post-input');
      this.postView.hidePost(text);
      this.postView.addInput(input);
      this.postView.addHelp(help);
      input.value = text.textContent;
    } else if (target.classList.contains('modal-delete__submit')) { // удаление поста
      this.requests.delete(this.id);
      this.getAllPosts();
      this.getFiles();
      this.modals.close(this.modalDelete);
    } else if (target.classList.contains('modal-delete__cancel')) { // отмена удаления
      this.modals.close(this.modalDelete);
    } else if (target.classList.contains('help-ok')) { // подтверждение изменений после редактирования
      const input = target.closest('.post').querySelector('.post-input');
      this.id = this.getId(target);
      this.requests.update(this.id, input.value);
      this.getAllPosts();
      this.requests.postById(this.id, this.user);
      this.getPinnedPosts();
    } else if (target.classList.contains('help-cancel')) { // отмена изменений после редактирования
      const text = target.closest('.post').querySelector('.post-text');
      const help = target.closest('.post').querySelector('.help');
      const input = target.closest('.post').querySelector('.post-input');
      text.textContent = input.value;
      this.postView.addPost(text);
      this.postView.hideInput(input);
      this.postView.hideHelp(help);
    } else if (target.classList.contains('bot-name')) { // переключение на чат с ботом
      this.showBot();
    } else if (target.classList.contains('user-name')) { // переключение на чат с пользователем
      this.showUser();
    } else if (target.classList.contains('toPinned')) { // закрепляем пост
      this.id = this.getId(target);
      this.requests.postById(this.id, this.user);
      this.getPinnedPosts();
    } else if (target.classList.contains('modal-coordinates__ok')) { // подтверждаем ручные координаты
      const coordinates = document.querySelector('.modal-coordinates__form-input').value;
      const valid = this.coordinates.toValidate(coordinates); // проверяем корректность координат
      if (!valid) {
        document.querySelector('.modal-coordinates__form-input').style.background = 'red';
        return;
      }
      this.place = valid;
      document.querySelector('.modal-coordinates').classList.add('invisible');
    } else if (target.classList.contains('modal-coordinates__close')) { // отменяем ручной ввод координат
      document.querySelector('.modal-coordinates').classList.add('invisible');
      document.querySelector('.warning').classList.remove('invisible');
    } else if (target.classList.contains('warning__close')) { // подтверждаем отмену ручного ввода координат
      document.querySelector('.warning').classList.add('invisible');
    } else if (target.classList.contains('warning__ok')) { // возвращаемся к ручному вводу координат
      document.querySelector('.warning').classList.add('invisible');
      document.querySelector('.modal-coordinates').classList.remove('invisible');
    } else if (target.classList.contains('preview-close')) { // закрываем превью загруженного файла
      document.querySelector('.prev').classList.add('invisible');
    } else if (target.classList.contains('files')) { // открываем раздел с сохранёнными файлами
      document.querySelector('.files-container').classList.toggle('invisible');
    } else if (target.classList.contains('files-container__close')) { // закрываем раздел с сохранёнными файлами
      document.querySelector('.files-container').classList.add('invisible');
    } else if (target.classList.contains('link')) { // скачиваем файл - НЕ РАБОТАЕТ :(
      target.click();
    } else if (target.classList.contains('smiles')) { // показываем/скрываем эмодзи
      document.querySelector('.smiles-list').classList.toggle('invisible');
    } else if (target.classList.contains('smiles-item')) { // добавляем эмодзи
      document.querySelector('.posts-footer__input__user').value += target.textContent;
    } else if (target.classList.contains('modal-exit__text')) { // меняем статус
      this.changeStatus(target);
    } else if (target.classList.contains('modal-exit__info-text')) { // открываем редактирование профиля
      document.querySelector('.modal-settings').classList.remove('invisible');
    } else if (target.classList.contains('modal-settings__close')) { // закрываем редактирование профиля
      document.querySelector('.modal-settings').classList.add('invisible');
    } else if (target.classList.contains('modal-settings__photo-item')) { // меняем фото
      const className = [...target.classList];
      this.requests.updatePhoto(className[0], this.user);
      this.changePhoto();
      this.getAllPosts();
    } else if (target.classList.contains('modal-exit__exit-text')) { // выход
      location.reload();
    } else if (target.classList.contains('container-header__search-input')) { // снимаем выделение найденных элементов
      Array.from(document.querySelectorAll('.post')).forEach((el) => {
        el.style.background = 'white';
      });
    } else if (target.classList.contains('search-container__close')) { // закрываем меню с результатами поиска
      document.querySelector('.search-container').classList.add('invisible');
      Array.from(document.querySelectorAll('.post')).forEach((el) => {
        el.style.background = 'white';
      });
    } else if (target.classList.contains('container-header__profile')) { // открываем меню с профилем
      document.querySelector('.modal-exit').classList.toggle('invisible');
    } else if (!target.classList.contains('modal-exit')) { // закрываем меню с профилем
      this.modals.close(document.querySelector('.modal-exit'));
    }
  }

  // загрузка всех постов авторизованного пользователя
  async getAllPosts() {
    document.querySelector('.posts-list').innerHTML = '';
    this.data = await this.requests.getAllPostsByUser();

    if (this.data) {
      const parent = document.querySelector('.posts-list__user');

      for (let i = 0; i < this.data.length; i++) {
        this.postView.getPostHTML(this.data[i].id, this.data[i].name, this.data[i].content, new Date(this.data[i].created).toLocaleString(), this.data[i].status, this.data[i].coordinates, this.data[i].img, this.data[i].audio, this.data[i].video, parent, this.profilePhotoClassName);
      }

      document.querySelector('.posts-footer__input').value = '';

      if (document.querySelector('.posts-list').lastElementChild !== null) {
        document.querySelector('.posts-list').lastElementChild.scrollIntoView();
      }

      this.clickable();
    }
  }

  // проверка положения последнего поста относительно родителя
  checkPosition() {
    const parent = document.querySelector('.posts-list__user');
    const childArr = document.querySelectorAll('.post');
    const child = childArr[childArr.length - 1];
    
    if (child && parent.getBoundingClientRect().bottom >= child.getBoundingClientRect().bottom) {    
      this.getSomePosts();          
    }
  }

    // загрузка части постов авторизованного пользователя
    async getSomePosts() {
      
      this.data = await this.requests.getAllPostsByUser();

      if (this.count > this.data.length) {
        this.count = this.data.length;
        return;
      }
  
      if (this.data) {
        document.querySelector('.posts-list').innerHTML = '';
        const parent = document.querySelector('.posts-list__user');        
  
        for (let i = 0; i < this.count; i++) {
          this.postView.getPostHTML(this.data[i].id, this.data[i].name, this.data[i].content, new Date(this.data[i].created).toLocaleString(), this.data[i].status, this.data[i].coordinates, this.data[i].img, this.data[i].audio, this.data[i].video, parent, this.profilePhotoClassName);
        } 
        
        
        console.log(`Нарисовано ${this.count} постов`);
  
        document.querySelector('.posts-footer__input').value = '';
  
        // if (document.querySelector('.posts-list').lastElementChild !== null) {
        //   document.querySelector('.posts-list').lastElementChild.scrollIntoView();
        // }
  
        this.clickable();
        this.count *= 2;
      }
    }

  // тормоз
  throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
      if (timer) return;

      timer = setTimeout(() => {
        callee(...args);

        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  // загрузка файлов авторизованного пользователя
  async getFiles() {
    const imgList = document.querySelector('.file-img__list');
    const audioList = document.querySelector('.file-audio__list');
    const videoList = document.querySelector('.file-video__list');

    imgList.innerHTML = '';
    audioList.innerHTML = '';
    videoList.innerHTML = '';
    const data = await this.requests.getAllPostsByUser();

    if (data.message === 'Post not found') {
      return;
    }
    data.filter((el) => el.img).forEach((el) => {
      this.getLinkHTML(el.img, el.fileName, imgList);
    });

    data.filter((el) => el.audio).forEach((el) => {
      this.getLinkHTML(el.audio, el.fileName, audioList);
    });

    data.filter((el) => el.video).forEach((el) => {
      this.getLinkHTML(el.video, el.fileName, videoList);
    });
  }

  // загрузка закрепленного поста авторизованного пользователя
  async getPinnedPosts() {
    const pinnedPost = document.querySelector('.pinned_post-text');
    pinnedPost.innerHTML = '';
    const data = await this.requests.getPinnedPost();

    if (data.message === 'Post not found') {
      pinnedPost.innerHTML = '';
    } else {
      pinnedPost.innerHTML = data.content;
    }
  }

  // загрузка нового фото пользователя
  async changePhoto() {
    const data = await this.requests.getUpdatePhoto();
    this.profilePhotoClassName = data.class;
    if (!this.profilePhotoClassName) {
      this.profilePhotoClassName = 'modal-settings__photo-cat';
    }
    const containerHeaderProfile = document.querySelector('.container-header__profile');
    const modalExitProfileImg = document.querySelector('.modal-exit__profile-img');
    containerHeaderProfile.classList.remove('modal-settings__photo-cat', 'modal-settings__photo-dog', 'modal-settings__photo-bird', 'modal-settings__photo-whale');
    modalExitProfileImg.classList.remove('modal-settings__photo-cat', 'modal-settings__photo-dog', 'modal-settings__photo-bird', 'modal-settings__photo-whale');
    containerHeaderProfile.classList.add(this.profilePhotoClassName);
    modalExitProfileImg.classList.add(this.profilePhotoClassName);
  }

  // находим id поста
  getId(target) {
    const id = target.closest('.post').querySelector('.identifier').textContent;
    return id;
  }

  // переходим в чат с ботом
  showBot() {
    document.querySelector('.post-area__user').classList.add('invisible');
    document.querySelector('.post-area__bot').classList.remove('invisible');
    document.querySelector('.user').classList.remove('active-user');
    document.querySelector('.bot').classList.add('active-user');
  }

  // переходим в чат с пользователем
  showUser() {
    document.querySelector('.post-area__user').classList.remove('invisible');
    document.querySelector('.post-area__bot').classList.add('invisible');
    document.querySelector('.bot').classList.remove('active-user');
    document.querySelector('.user').classList.add('active-user');
  }

  // делаем ссылки кликательными - НЕ РАБОТАЕТ переход по ссылке
  clickable() {
    const codeElems = document.querySelectorAll('.post-text');
    const regExp = /((http|https):\/\/[.\w/=&-?]+)/gi;

    for (let i = 0; i < codeElems.length; i++) {
      codeElems[i].innerHTML = codeElems[i].innerHTML.replace(regExp, '<a href="$1" target="_blank">$1</a>');
    }
  }

  // запрос на получение координат
  getCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const { latitude, longitude } = data.coords;
        this.place = `[${latitude.toFixed(2)}, ${longitude.toFixed(2)}]`;
      }, (err) => {
        console.log(err);
        document.querySelector('.modal-coordinates').classList.remove('invisible');
      });
    }
  }

  // сортировка файлов, превью при зарузке, генерация событий и blob-ссылок
  fileAPI() {
    const fileContainer = document.querySelector('.attach-container');
    const fileInput = fileContainer.querySelector('.attach');
    const previewTitle = document.querySelector('.preview-title');
    const previewImage = document.querySelector('.preview-image');

    const regImg = /\.(png|jpg|jpeg|jp2|gif|raw|tiff|psd|bmp)$/i;
    const regAudio = /\.(mp3|wav|mid|midi|au|aiff|wma)$/i;
    const regVideo = /\.(mp4|avi|mov|mpg|mpeg)$/i;

    fileContainer.addEventListener('click', (e) => {
      fileInput.dispatchEvent(new MouseEvent('click'));
    });

    fileContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    fileContainer.addEventListener('drop', (e) => {
      e.preventDefault();

      document.querySelector('.prev').classList.remove('invisible');
      previewTitle.src = '';
      previewImage.src = '';

      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (!file) return;

      previewTitle.textContent = file.name;
      const url = URL.createObjectURL(file);

      this.fileName = file.name.toLowerCase();

      if (regImg.test(this.fileName)) {
        previewImage.src = url;
        this.img = url;
      } else if (regAudio.test(this.fileName)) {
        this.audio = url;
      } else if (regVideo.test(this.fileName)) {
        this.video = url;
      }
    });

    fileInput.addEventListener('change', (e) => {
      document.querySelector('.prev').classList.remove('invisible');
      previewTitle.src = '';
      previewImage.src = '';

      const file = fileInput.files && fileInput.files[0];

      if (!file) return;

      previewTitle.textContent = file.name;
      const url = URL.createObjectURL(file);

      this.fileName = file.name.toLowerCase();

      if (regImg.test(this.fileName)) {
        previewImage.src = url;
        this.img = url;
      } else if (regAudio.test(this.fileName)) {
        this.audio = url;
      } else if (regVideo.test(this.fileName)) {
        this.video = url;
      }
    });
  }

  // рисуем ссылку для вставки в хранилище файлов
  getLinkHTML(url, name, parent) {
    const link = document.createElement('a');
    link.classList.add('link');
    link.href = url;
    link.rel = 'noopener';
    link.text = name;
    parent.appendChild(link);
    link.download = name;
  }

  // отрисовываем заливку найденных слов
  async search() {
    const parent = document.querySelector('.search-container__list');
    parent.innerHTML = '';
    const data = await this.requests.getSearch();
    const posts = document.querySelectorAll('.identifier');

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < posts.length; j++) {
        if (data[i].id === posts[j].textContent) {
          posts[j].closest('.post').style.background = 'lightgrey';
          const arr = [];
          arr.push(posts[j]);
          arr[arr.length - 1].closest('.post').scrollIntoView();
        }
      }
    }

    document.querySelector('.search-container').classList.remove('invisible');

    for (let i = 0; i < data.length; i++) {
      this.postView.getPostHTML(null, data[i].name, data[i].content, new Date(data[i].created).toLocaleString(), data[i].status, null, data[i].img, data[i].audio, data[i].video, parent);
    }
    document.querySelector('.container-header__search-input').value = '';
  }

  // функция замены статуса
  changeStatus(target) {
    const userStatus = document.querySelector('.user-status');
    const userStatusInHeader = document.querySelector('.container-header__profile-status');
    userStatus.classList.remove('modal-exit__online-img', 'modal-exit__departed-img', 'modal-exit__noDisturb-img');
    userStatusInHeader.classList.remove('modal-exit__online-img', 'modal-exit__departed-img', 'modal-exit__noDisturb-img');
    const className = target.closest('.modal-exit__menu-item').querySelector('div').classList;
    userStatus.classList.add(className);
    userStatusInHeader.classList.add(className);
  }

  // запуск и остановка прелоадера
  preloader() {
    document.querySelector('.loader').classList.remove('invisible');
    setTimeout(() => {
      document.querySelector('.loader').classList.add('invisible');
    }, 500);
  }
}