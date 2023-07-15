export default class ChatWithBotView {
  constructor() {
    this.weather = [
      'Ожидается пасмурная и прохладная погода. Вероятность осадков 1%. Атмосферное давление в пределах нормы (743—744 мм рт.ст.). Температура воздуха +14...+15°C. Ветер слабый (2—3 м/с). Относительная влажность 60—63%.',
      'В прогнозе на сегодня в городе ожидается жаркая почти безоблачная погода. Днем от +30 до +37, ночью до +29°. Ожидается спокойная погода, в основном 3 м/с с порывами до 7 м/с. Днем без осадков.',
      'Прогнозы погоды на сегодня и завтра в городе практически совпадают. Будет преобладать облачная погода, чуть теплее, чем сегодня. Температурный фон в течение дня в пределах от +25 до +34, ночью от +23 до +26°. По ветровым условиям погода спокойная — легкий бриз около 2 м/с, порывами до 5 м/с. Днем осадков не ожидается.',
      'Завтра в городе погода чуть лучше, чем сегодня. Ожидается ясная погода, чуть теплее, чем сегодня. Температурный фон в течение дня в пределах от +9 до +22, ночью от +9 до +11°. Ожидается безветренная погода, в основном 1 м/с, порывами до 4 м/с. В течение дня погода без осадков.',
      'По синоптическим картам, погода в городе завтра чуть ухудшится. Погода в основном малооблачная с кучевыми и перистыми облаками, чуть холоднее, чем сегодня. Днем от +28 до +34, ночью до +29°. По ветровым условиям погода спокойная — легкий бриз около 3 м/с, порывами до 5 м/с. Погода днем без осадков.',
    ];
    this.movies = [
      'Зеленая миля (1999): https://www.kinopoisk.ru/film/435/',
      'Побег из Шоушенка (1994): https://www.kinopoisk.ru/film/326/',
      'Форрест Гамп (1994): https://www.kinopoisk.ru/film/448/',
      'Список Шиндлера (1993): https://www.kinopoisk.ru/film/329/',
      '1+1 (2011): https://www.kinopoisk.ru/film/535341/',
    ];
    this.books = [
      '«Властелин колец», Джон Р. Р. Толкин',
      '«Унесённые ветром», Маргарет Митчелл',
      '«Убить пересмешника», 	Харпер Ли',
      '«Маленькие женщины», Луиза Мэй Олкотт',
      '«Война и мир», Лев Толстой',
    ];
    this.tracks = [
      '«Bohemian Rhapsody», Queen',
      '«Billie Jean», Майкл Джексон',
      '«Hallelujah», Джеф Бакли',
      '«No Woman, No Cry», Bob Marley & the Wailers',
      '«Under Pressure», Queen и Дэвид Боуи',
    ];
    this.cities = [
      'Прага – столица и крупнейший город Чешской Республики. Здесь проживает около 1,3 миллиона человек. Благодаря своему историческому центру он считается одним из самых красивых городов мира. Наиболее важные памятники включают Пражский Град, Карлов мост и Староместскую площадь.',
      'Город Рим, также известный как Вечный город, является столицей и крупнейшим городом Италии. Конечно, он стал известен в основном потому, что был центром впечатляющей Римской империи. Он насчитывает менее трех миллионов жителей и полон памятников, включая знаменитый Колизей и Форум романов. В центре города также находится самая маленькая страна в мире – Ватикан со знаменитым собором Святого Петра.',
      'Многие считают Нью-Йорк мегаполисом мира, а значит, и одним из самых посещаемых мест на земле. Большая часть его состоит из островов, соединенных множеством мостов, самым важным из которых является Манхэттен – густонаселенная территория, полная небоскребов. Самые известные места – Статуя Свободы, Центральный парк, Уолл-стрит, Таймс-сквер и Бруклинский мост.',
      'Париж – один из крупнейших городов Европы. Самые большие памятники включают, конечно же, знаменитую Эйфелеву башню, собор Парижской Богоматери, Монмартр, Лувр, Версаль и многие другие. Это так называемый город влюбленных, куда многие пары отправляются провести свой медовый месяц. Другой, не менее интересный ресторан – Центр Жоржа Помпиду. Я до сих пор помню горячие споры по поводу этого здания, когда оно было достроено, как и Эйфелевой башни. История повторяется :-)',
      'Венеция – один из красивейших городов мира. Они расположены на островах в неглубокой лагуне. Город пересекает Гранд-канал, где вы найдете самые оживленные судоходные компании. К крупнейшим памятникам города относятся Дворец дожей и церковь Св. отметка',
    ];
  }

  drawUI() {
    const body = document.querySelector('.container-body');
    const postArea = document.createElement('div');
    postArea.classList.add('post-area', 'post-area__bot', 'invisible');
    body.appendChild(postArea);

    const postsHeader = document.createElement('div');
    postsHeader.classList.add('posts-header', 'posts-header__bot');
    postArea.appendChild(postsHeader);

    const postTittle = document.createElement('div');
    postTittle.classList.add('posts-header__title', 'posts-header__title__bot');
    postTittle.textContent = 'Bot';
    postsHeader.appendChild(postTittle);

    const postsList = document.createElement('div');
    postsList.classList.add('posts-list', 'posts-list__bot');
    postArea.appendChild(postsList);

    const footer = document.createElement('div');
    footer.classList.add('posts-footer', 'posts-footer__bot');
    postArea.appendChild(footer);

    const form = document.createElement('form', 'form');
    form.classList.add('posts-footer__form', 'posts-footer__form__bot');
    footer.appendChild(form);

    form.innerHTML = `<input list="instructions" class="posts-footer__input posts-footer__input__bot">
        <datalist id="instructions">
            <option>@chaos: погода</option>
            <option>@chaos: фильм</option>
            <option>@chaos: книга</option>
            <option>@chaos: трек</option>
            <option>@chaos: город</option>                
        </datalist>`;

    const filesContainer = document.createElement('div');
    filesContainer.classList.add('files-container', 'invisible');
    filesContainer.textContent = 'Все файлы';
    body.appendChild(filesContainer);

    const filesContainerClose = document.createElement('div');
    filesContainerClose.classList.add('files-container__close');
    filesContainer.appendChild(filesContainerClose);

    const img = document.createElement('div');
    img.classList.add('file-img', 'file');
    filesContainer.appendChild(img);

    const imgTitle = document.createElement('div');
    imgTitle.classList.add('file-img__title', 'file-title');
    imgTitle.textContent = 'Изображения';
    img.appendChild(imgTitle);

    const imgList = document.createElement('div');
    imgList.classList.add('file-img__list');
    img.appendChild(imgList);

    const audio = document.createElement('div');
    audio.classList.add('file-audio', 'file');
    filesContainer.appendChild(audio);

    const audioTitle = document.createElement('div');
    audioTitle.classList.add('file-audio__title', 'file-title');
    audioTitle.textContent = 'Аудио';
    audio.appendChild(audioTitle);

    const audioList = document.createElement('div');
    audioList.classList.add('file-audio__list');
    audio.appendChild(audioList);

    const video = document.createElement('div');
    video.classList.add('file-video', 'file');
    filesContainer.appendChild(video);

    const videoTitle = document.createElement('div');
    videoTitle.classList.add('file-video__title', 'file-title');
    videoTitle.textContent = 'Видео';
    video.appendChild(videoTitle);

    const videoList = document.createElement('div');
    videoList.classList.add('file-video__list');
    video.appendChild(videoList);
  }

  getRandomInfo(value) {
    switch (value) {
      case '@chaos: погода':
        return this.getRandomNumber(this.weather);
      case '@chaos: фильм':
        return this.getRandomNumber(this.movies);
      case '@chaos: книга':
        return this.getRandomNumber(this.books);
      case '@chaos: трек':
        return this.getRandomNumber(this.tracks);
      case '@chaos: город':
        return this.getRandomNumber(this.cities);
    }
  }

  getRandomNumber(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    return arr[randomIndex];
  }
}
