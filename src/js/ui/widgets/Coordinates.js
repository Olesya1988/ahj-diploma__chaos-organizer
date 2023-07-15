export default class Coordinates {
  constructor(container) {
    this.container = container;
  }

  // окно при невозможности автоматически определить координаты
  drawModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal-coordinates', 'invisible', 'modal');
    this.container.appendChild(modal);

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-coordinates__header');
    modalHeader.textContent = 'Что-то пошло не так';
    modal.appendChild(modalHeader);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-coordinates__body');
    modalBody.textContent = `
            К сожалению, нам не удалось определить ваше месторасположение.
            Пожалуйста, дайте разрешение на использование геолокации 
            либо введите координаты вручную.
            `;
    modal.appendChild(modalBody);

    const formGroup = document.createElement('form');
    formGroup.classList.add('modal-coordinates__form-group');
    modalBody.appendChild(formGroup);

    const formText = document.createElement('div');
    formText.classList.add('modal-coordinates__form-text');
    formText.textContent = `    
            Широта и долгота через запятую.
            `;
    formGroup.appendChild(formText);

    const formInput = document.createElement('input');
    formInput.classList.add('modal-coordinates__form-input');
    formInput.placeholder = 'Например: 51.50851, -0.12572';
    formInput.required = true;
    formInput.name = 'name';
    formGroup.appendChild(formInput);

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-coordinates__footer', 'modal-buttons');
    modal.appendChild(modalFooter);

    const modalClose = document.createElement('button');
    modalClose.classList.add('modal-coordinates__close', 'modal-button');
    modalClose.textContent = 'Отмена';
    modalFooter.appendChild(modalClose);

    const modalOk = document.createElement('button');
    modalOk.classList.add('modal-coordinates__ok', 'modal-button');
    modalOk.textContent = 'ОК';
    modalFooter.appendChild(modalOk);
  }

  // окно предупреждения о том, что координаты ещё можно указать
  drawWarning() {
    const warning = document.createElement('div');
    warning.classList.add('warning', 'invisible', 'modal');
    this.container.appendChild(warning);

    const warningBody = document.createElement('div');
    warningBody.classList.add('warning__body');
    warningBody.textContent = `
            Отметка о геоданных поможет Вам вспомнить, в каком месте Вы оставляли эту заметку.
            Вы можете вернуться и зафиксировать ваши координаты.
            Если отметка не нужна, нажмите "Отмена".
            В этом случае на Ваших записях не будет отметок о местоположении.
            `;
    warning.appendChild(warningBody);

    const warningFooter = document.createElement('div');
    warningFooter.classList.add('warning__footer', 'modal-buttons');
    warning.appendChild(warningFooter);

    const warningClose = document.createElement('button');
    warningClose.classList.add('warning__close', 'modal-button');
    warningClose.textContent = 'Отмена';
    warningFooter.appendChild(warningClose);

    const warningOk = document.createElement('button');
    warningOk.classList.add('warning__ok', 'modal-button');
    warningOk.textContent = 'Вернуться';
    warningFooter.appendChild(warningOk);
  }

  // проверка валидности ручного ввода координат
  toValidate(items) {
    const arr = items.trim().split(',');
    // eslint-disable-next-line
        if (arr.length !== 2 || Number(arr[0]) < -90 || Number(arr[0]) > 90 || Number(arr[1]) < -180 || Number(arr[1]) > 180) {
      return false;
    }

    return `[${arr[0]}°, ${arr[1]}°]`;
  }
}
