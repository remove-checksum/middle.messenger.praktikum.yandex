# Веб-приложение "Чат"

## [Макет](https://www.figma.com/file/cG1j59KCBoXf3Ix9HX5Fs3/Chat-App)
Вдохновлен [дизайн-системой](https://design-system.service.gov.uk/) gov.uk

## Развернуто на [Netlify](https://square-chat-app.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9e343c10-e020-4480-b23c-21dace2348bf/deploy-status)](https://app.netlify.com/sites/square-chat-app/deploys)

## Экраны приложения

- 404
- 500
- Чат
- Профиль
- Авторизация
- Регистрация

## Карта репозитория
```
src\
      assets\ - изображения и шрифты
  components\ - независимые компоненты
        data\ - данные шаблонов
     layouts\ - каркасы страниц
       pages\ - готовые страницы приложения
      shared\ - глобальные файлы стилей
```

## Установка и запуск

Для запуска необходимы [Git](https://git-scm.com) и [Node.js](https://nodejs.org/en/download/) `>= 16.5.1`

### Установка

1. Клонируйте репозиторий
```bash
git clone https://github.com/remove-checksum/middle.messenger.praktikum.yandex.git
```
2. Установите зависимости
```bash
cd middle.messenger.praktikum.yandex && npm install
```
3. Запустите девсервер
```bash
npm run start
```
4. Сборка для деплоя:
```bash
npm run build
```

## Используемые технологии
<a href="https://parceljs.org/" target="_blank">
  <img width="120" align="left" src="https://raw.githubusercontent.com/parcel-bundler/website/v2/src/assets/og.png" alt="Parcel logo"/>
</a>


<a href="https://handlebarsjs.com/" target="_blank">
  <img width="120" src="https://raw.githubusercontent.com/handlebars-lang/docs/master/src/.vuepress/public/images/handlebars_logo.png" alt="Handlebars logo"/>
</a>