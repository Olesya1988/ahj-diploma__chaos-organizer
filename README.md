# Дипломное задание к курсу «Продвинутый JavaScript в браузере». Chaos Organizer


Ссылка на страницу: https://olesya1988.github.io/ahj-diploma__chaos-organizer/

[![Build status](https://ci.appveyor.com/api/projects/status/p579x3i75649lmkh?svg=true)](https://ci.appveyor.com/project/Olesya1988/ahj-diploma__chaos-organizer)

![CI](https://github.com/Olesya1988/ahj-diploma__chaos-organizer/actions/workflows/web.yml/badge.svg)


## Обязательные для реализации функции:
* сохранение в истории ссылок и текстовых сообщений;
  (текст и ссылки хранятся на сервере)
* ссылки (http:// или https://) должны быть кликабельны и отображаться, как ссылки;
  (ссылки выглядят, как ссылки, но пока не кликабельны)
* сохранение в истории изображений, видео и аудио (как файлов) — через Drag & Drop и через иконку загрузки;
  (не реализовано)
* скачивание файлов на компьютер пользователя;
  (не реализовано)
* ленивая подгрузка: сначала подгружаются последние 10 сообщений, при прокрутке вверх подгружаются следующие 10 и т. д.
  (не реализовано)

## Дополнительные для реализации функции:
* отправка геолокации;
* отправка команд боту: @chaos: погода, бот должен отвечать рандомным прогнозом погоды, интегрироваться с реальными сервисами не требуется, команд должно быть не менее 5;
* закрепление (pin) сообщений: закреплять можно только одно сообщение, оно прикрепляется к верхней части страницы
* просмотр вложений по категориям: аудио, видео, изображения, другие файлы