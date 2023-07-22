export default class Modals {
  constructor(container) {
    this.container = container;
  }

  // окно подтверждения удаления
  drawDelete() {
    const modal = document.createElement('div');
    modal.classList.add('modal-delete', 'modal', 'invisible');
    this.container.appendChild(modal);

    const text = document.createElement('div');
    text.classList.add('modal-delete__text', 'modal-text');
    text.textContent = 'Подтвердите удаление';
    modal.appendChild(text);

    const buttons = document.createElement('div');
    buttons.classList.add('modal-delete__buttons', 'modal-buttons');
    modal.appendChild(buttons);

    const submit = document.createElement('button');
    submit.classList.add('modal-delete__submit', 'modal-button');
    submit.textContent = 'OK';
    buttons.appendChild(submit);

    const cancel = document.createElement('button');
    cancel.classList.add('modal-delete__cancel', 'modal-button');
    cancel.textContent = 'ОТМЕНА';
    buttons.appendChild(cancel);
  }

  // окно входа/регистрации
  drawLogin(login) {
    const modal = document.createElement('div');
    modal.classList.add('modal-login', 'modal');
    this.container.appendChild(modal);

    const text = document.createElement('div');
    text.classList.add('modal-login__text', 'modal-text');
    modal.appendChild(text);

    const tooltip = document.createElement('div');
    tooltip.classList.add('modal-login__tooltip');
    modal.appendChild(tooltip);

    const input = document.createElement('input');
    modal.appendChild(input);

    const buttons = document.createElement('div');
    buttons.classList.add('modal-login__buttons', 'modal-buttons');
    modal.appendChild(buttons);

    const submit = document.createElement('button');
    submit.textContent = 'OK';
    buttons.appendChild(submit);

    const cancel = document.createElement('button');
    cancel.classList.add('modal-login__cancel', 'modal-button');
    cancel.textContent = 'ОТМЕНА';
    buttons.appendChild(cancel);

    if (login === true) {
      text.textContent = 'Для входа введите ваше имя';
      input.classList.add('modal-login__input');
      submit.classList.add('modal-login__submit', 'modal-button');
    } else {
      text.textContent = 'Для регистрации введите ваше имя';
      input.classList.add('modal-registration__input');
      submit.classList.add('modal-registration__submit', 'modal-button');
    }
  }

  // меню с профилем пользователя
  drawExit(name) {
    const modal = document.createElement('div');
    modal.classList.add('modal-exit', 'invisible');
    this.container.appendChild(modal);

    const menu = document.createElement('div');
    menu.classList.add('modal-exit__menu-list');
    modal.appendChild(menu);

    const profile = document.createElement('div');
    profile.classList.add('modal-exit__profile', 'modal-exit__menu-item');
    menu.appendChild(profile);

    const profilePhoto = document.createElement('div');
    profilePhoto.classList.add('modal-exit__profile-img', 'modal-settings__photo-cat');
    profile.appendChild(profilePhoto);

    const profileName = document.createElement('div');
    profileName.classList.add('modal-exit__profile-text');
    profileName.textContent = name;
    profile.appendChild(profileName);

    const online = document.createElement('div');
    online.classList.add('modal-exit__online', 'modal-exit__menu-item');
    menu.appendChild(online);

    const onlineImg = document.createElement('div');
    onlineImg.classList.add('modal-exit__online-img');
    online.appendChild(onlineImg);

    const onlineText = document.createElement('div');
    onlineText.classList.add('modal-exit__online-text', 'modal-exit__text');
    onlineText.textContent = 'Онлайн';
    online.appendChild(onlineText);

    const departed = document.createElement('div');
    departed.classList.add('modal-exit__departed', 'modal-exit__menu-item');
    menu.appendChild(departed);

    const departedImg = document.createElement('div');
    departedImg.classList.add('modal-exit__departed-img');
    departed.appendChild(departedImg);

    const departedText = document.createElement('div');
    departedText.classList.add('modal-exit__departed-text', 'modal-exit__text');
    departedText.textContent = 'Отошёл';
    departed.appendChild(departedText);

    const noDisturb = document.createElement('div');
    noDisturb.classList.add('modal-exit__noDisturb', 'modal-exit__menu-item');
    menu.appendChild(noDisturb);

    const noDisturbImg = document.createElement('div');
    noDisturbImg.classList.add('modal-exit__noDisturb-img');
    noDisturb.appendChild(noDisturbImg);

    const noDisturbText = document.createElement('div');
    noDisturbText.classList.add('modal-exit__noDisturb-text', 'modal-exit__text');
    noDisturbText.textContent = 'Не беспокоить';
    noDisturb.appendChild(noDisturbText);

    const info = document.createElement('div');
    info.classList.add('modal-exit__info', 'modal-exit__menu-item');
    menu.appendChild(info);

    const infoImg = document.createElement('div');
    infoImg.classList.add('modal-exit__info-img');
    info.appendChild(infoImg);

    const infoText = document.createElement('div');
    infoText.classList.add('modal-exit__info-text');
    infoText.textContent = 'Профиль';
    info.appendChild(infoText);

    const exit = document.createElement('div');
    exit.classList.add('modal-exit__exit', 'modal-exit__menu-item');
    menu.appendChild(exit);

    const exitImg = document.createElement('div');
    exitImg.classList.add('modal-exit__exit-img');
    exit.appendChild(exitImg);

    const exitText = document.createElement('div');
    exitText.classList.add('modal-exit__exit-text');
    exitText.textContent = 'Выйти';
    exit.appendChild(exitText);
  }

  // меню с настройками профиля
  drawProfileSettings() {
    const modal = document.createElement('div');
    modal.classList.add('modal-settings', 'invisible');
    this.container.appendChild(modal);

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-settings__header');
    modalHeader.textContent = 'Профиль';
    modal.appendChild(modalHeader);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-settings__body');
    modal.appendChild(modalBody);

    const modalText = document.createElement('div');
    modalText.classList.add('modal-settings__text');
    modalText.textContent = 'Выберите фото:';
    modalBody.appendChild(modalText);

    const modalPhoto = document.createElement('div');
    modalPhoto.classList.add('modal-settings__photo');
    modalBody.appendChild(modalPhoto);

    const modalPhotoCat = document.createElement('div');
    modalPhotoCat.classList.add('modal-settings__photo-cat', 'modal-settings__photo-item');
    modalPhoto.appendChild(modalPhotoCat);

    const modalPhotoDog = document.createElement('div');
    modalPhotoDog.classList.add('modal-settings__photo-dog', 'modal-settings__photo-item');
    modalPhoto.appendChild(modalPhotoDog);

    const modalPhotoWhale = document.createElement('div');
    modalPhotoWhale.classList.add('modal-settings__photo-whale', 'modal-settings__photo-item');
    modalPhoto.appendChild(modalPhotoWhale);

    const modalPhotoBird = document.createElement('div');
    modalPhotoBird.classList.add('modal-settings__photo-bird', 'modal-settings__photo-item');
    modalPhoto.appendChild(modalPhotoBird);

    const modalClose = document.createElement('div');
    modalClose.classList.add('modal-settings__close');
    modal.appendChild(modalClose);
  }

  show(item) {
    item.classList.remove('invisible');
  }

  close(item) {
    item.classList.add('invisible');
  }
}
