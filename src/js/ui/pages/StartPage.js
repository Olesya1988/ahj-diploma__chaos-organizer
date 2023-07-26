import Modals from '../widgets/Modal';
import Requests from '../../api/Requests';
import OrganizerPage from './OrganizerPage';

export default class StartPage {
  constructor(container) {
    this.container = container;
    this.modals = new Modals(this.container);
    this.requests = new Requests();
  }

  init() {
    this.drawUi();
    this.bindToDOM();
  }

  drawUi() {
    const background = document.createElement('div');
    background.classList.add('background');
    this.container.appendChild(background);

    const greetings = document.createElement('div');
    greetings.classList.add('greetings');
    greetings.textContent = 'Добро пожаловать!';
    background.appendChild(greetings);

    const entrance = document.createElement('button');
    entrance.classList.add('entrance');
    entrance.textContent = 'Вход';
    greetings.appendChild(entrance);

    const registration = document.createElement('button');
    registration.classList.add('registration');
    registration.textContent = 'Регистрация';
    greetings.appendChild(registration);
  }

  bindToDOM() {
    document.addEventListener('click', this.click.bind(this));
  }

  click(e) {
    // e.preventDefault();
    const { target } = e;

    if (target.classList.contains('entrance')) { // вход
      this.modals.close(document.querySelector('.greetings'));
      this.modals.drawLogin(true);
    } else if (target.classList.contains('registration')) { // регистрация
      this.modals.close(document.querySelector('.greetings'));
      this.modals.drawLogin(false);
    } else if (target.classList.contains('modal-registration__submit')) { // подтверждение регистрации
      this.getNewUser();
    } else if (target.classList.contains('modal-login__submit')) { // подтверждение входа
      this.getRegisteredUser();
    } else if (target.classList.contains('modal-login__cancel')) { // закрываем окно ввода имени пользователя
      document.querySelector('.modal-login').remove();
      this.modals.show(document.querySelector('.greetings'));
    }
  }

  // получаем нового пользователя
  async getNewUser() {
    const input = document.querySelector('.modal-registration__input');
    const tooltip = document.querySelector('.modal-login__tooltip');

    const data = await this.requests.createUser(input.value);

    if (data.status === 'error') {
      tooltip.textContent = data.message;
    } else {
      const { user } = data.user;

      this.modals.close(document.querySelector('.background'));
      document.querySelector('.modal-login').remove();
      this.organizerPage = new OrganizerPage(this.container, user);
      this.organizerPage.init();
    }
  }

  // получаем авторизованного пользователя
  async getRegisteredUser() {
    const input = document.querySelector('.modal-login__input');
    const tooltip = document.querySelector('.modal-login__tooltip');

    const data = await this.requests.userByName(input.value);

    if (data.status === 'error') {
      tooltip.textContent = data.message;
    } else {
      const { user } = data;

      this.modals.close(document.querySelector('.background'));
      document.querySelector('.modal-login').remove();
      this.organizerPage = new OrganizerPage(this.container, user);
      this.organizerPage.init();
    }
  }
}
