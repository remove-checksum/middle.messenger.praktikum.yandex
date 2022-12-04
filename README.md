## [Ссылка на PR первого спринта](https://github.com/remove-checksum/middle.messenger.praktikum.yandex/pull/1)

# Веб-приложение "Чат"

## [Макет](https://www.figma.com/file/cG1j59KCBoXf3Ix9HX5Fs3/Chat-App)

Вдохновлен [дизайн-системой](https://design-system.service.gov.uk/) gov.uk

## Развернуто на [Netlify](https://square-chat-app.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/9e343c10-e020-4480-b23c-21dace2348bf/deploy-status)](https://app.netlify.com/sites/square-chat-app/deploys)

## Развернуто на [Render](https://boxy-in-a-box.onrender.com)

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
        core\ - движок и вспомогательные модули
     layouts\ - каркасы страниц
       pages\ - готовые страницы приложения
      models\ - интерфейсы модели данных приложения
    services\ - прикладные сервисы приложения
      router\ - описания страниц и конфиг роутера
       store\ - глобальное хранилище и его настройки
      shared\ - глобальные файлы стилей
       tests\ - настройки и утилиты для тестов
      app.ts  - точка входа

typings\ - глобальные типы
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
npm run start:dev
```

4. Сборка для деплоя:

```bash
npm run build
```

5. Отдать собранные страницы с помощью express:

```bash
npm run start
```

## Используемые технологии

<a href="https://www.typescriptlang.org/" target="_blank">
  <img width="150" align="left" src="https://raw.githubusercontent.com/microsoft/TypeScript-Website/v2/packages/typescriptlang-org/static/branding/ts-logo-128.svg" alt="typescript logo">
</a>

<a href="https://parceljs.org/" target="_blank">
  <img height="100" align="left" src="https://raw.githubusercontent.com/parcel-bundler/website/v2/src/assets/og.png" alt="Parcel logo"/>
</a>

<a href="https://handlebarsjs.com/" target="_blank">
  <img height="100" align="left" src="https://raw.githubusercontent.com/handlebars-lang/docs/master/src/.vuepress/public/images/handlebars_logo.png" alt="Handlebars logo"/>
</a>

<a href="https://postcss.org/" target="_blank">
  <img height="100" src="https://postcss.org/logo.svg" alt="PostCSS logo"/>
</a>

<a href="https://expressjs.com/" target="_blank">
  <img width="200" src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png" alt="Expressjs logo"/>
</a>

<div style="display: flex; gap: 20px;">
  <a href="https://eslint.org/" target="_blank">
    <img width="200" src="https://raw.githubusercontent.com/eslint/eslint/main/docs/src/assets/images/logo/eslint-logo-color.svg" alt="eslint logo">
  </a>

  <a href="https://testing-library.com/" target="_blank">
    <img width="160" src="https://testing-library.com/img/octopus-128x128.png" alt="jest logo">
  </a>
  
  <a href="https://stylelint.io/" target="_blank">
   <img width="200" src="https://raw.githubusercontent.com/stylelint/stylelint.io/main/static/img/light.svg" alt="stylelint logo">
  </a>

  <a href="https://jestjs.io/" target="_blank">
    <img width="200" src="https://raw.githubusercontent.com/facebook/jest/2ec6d243612c891d74fb6d3d0f2af453cb4d1106/website/static/img/jest.svg" alt="jest logo">
  </a>

</div>
