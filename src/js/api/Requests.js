export default class Requests {
  constructor() {
    this.url = 'http://localhost:3000';
  }

  // создаём новый пост
  async createPost(name, content, created, status, coordinates, img, audio, video, fileName) {
    const post = {
      name,
      content,
      created,
      status,
      coordinates,
      img,
      audio,
      video,
      fileName,
    };

    const response = await fetch(`${this.url}?method=createPost`, {
      method: 'POST',
      body: JSON.stringify(post),
    });

    const result = await response.json();

    return result;
  }

  // создаём нового пользователя
  async createUser(user) {
    const client = {
      user,
    };

    const response = await fetch(`${this.url}?method=createUser`, {
      method: 'POST',
      body: JSON.stringify(client),
    });

    const result = await response.json();

    return result;
  }

  // получаем все посты пользователя
  async getAllPostsByUser() {
    const response = await fetch(`${this.url}?method=allPostsByUser`, {
      method: 'GET',
    });

    const result = await response.json();

    return result;
  }

  // поиск по имени пользователя
  async userByName(user) {
    const client = {
      user,
    };
    const response = await fetch(`${this.url}?method=userByName`, {
      method: 'POST',
      body: JSON.stringify(client),
    });

    const result = await response.json();

    return result;
  }

  // поиск поста по его id
  async postById(id) {
    const post = {
      id,
    };
    const response = await fetch(`${this.url}?method=postById`, {
      method: 'POST',
      body: JSON.stringify(post),
    });

    const result = await response.json();

    return result;
  }

  // получаем закреплённый пост
  async getPinnedPost() {
    const response = await fetch(`${this.url}?method=getPinnedPost`, {
      method: 'GET',
    });

    const result = await response.json();

    return result;
  }

  // обновляем пост после изменений
  async update(id, content) {
    const post = {
      content,
      created: Date.now(),
    };
    await fetch(`${this.url}?method=updateById&id=${id}`, {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  // удаляем пост
  async delete(id) {
    await fetch(`${this.url}?method=deleteById&id=${id}`, {
      method: 'GET',
    });
  }
}
