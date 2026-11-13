
(() => {
  'use strict';

  const ID = 'ym-cozy-interface-v6';

  // Удаляем предыдущие версии и их наблюдатели
  try { window.YMCozyV5?.destroy?.(); } catch (_) {}
  try { window.YMCozyUI?.destroy?.(); } catch (_) {}

  [
    'ym-cozy-interface-v1',
    'ym-cozy-interface-v2',
    'ym-cozy-interface-v3',
    'ym-cozy-interface-v4',
    'ym-cozy-interface-v5',
    ID
  ].forEach(id => document.getElementById(id)?.remove());

  const css = String.raw`

  :root {
    --ym-bg: #ffe2a7;
    --ym-card: #fffaf2;
    --ym-card-soft: #fff5e7;
    --ym-text: #493d36;
    --ym-muted: #998779;
    --ym-line: #efdfca;
    --ym-red: #d4493e;
    --ym-red-dark: #b83d34;
    --ym-red-soft: #fbe9e4;
    --ym-side-width: clamp(145px, 33vw, 210px);
    --ym-shadow: 0 7px 22px rgba(91,59,37,.07);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    accent-color: var(--ym-red);
  }

  body {
    margin: 0 !important;
    width: 100% !important;
    color: var(--ym-text) !important;
    font-family: "Open Sans", Roboto, Arial, sans-serif !important;
    background: var(--ym-bg) !important;
    background-image: none !important;
  }

  /* Удаляем объявления, игровые блоки и рекламу */

  #announcements-block,
  #chokak-tournament-block,
  #log .ended-adv,
  #log .ended-adv-image,
  #social,
  #status-chat-started,
  #typing,
  #recording,
  [id$="-offer"],
  #balance-clue {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  /* =====================================
     БОКОВАЯ ПАНЕЛЬ И ДВИЖЕНИЕ ЧАТА
  ===================================== */

  #side {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    left: auto !important;
    bottom: 0 !important;
    width: var(--ym-side-width) !important;
    height: 100dvh !important;
    z-index: 1000 !important;
    padding: 0 !important;
    overflow: hidden !important;
    background: var(--ym-red) !important;
    border-left: 1px solid rgba(255,255,255,.18) !important;
    box-shadow: -7px 0 24px rgba(80,35,25,.09) !important;
    transform: translateX(100%) !important;
    transition: transform .2s ease !important;
  }

  #side.show,
  body.side-shown #side {
    transform: translateX(0) !important;
  }

  body.start-page,
  body:not(.start-page) {
    width: 100% !important;
    margin: 0 !important;
  }

  body.ym-side-open:not(.start-page) #chat {
    right: calc(var(--ym-side-width) + 12px) !important;
    transition: right .2s ease !important;
  }

  body:not(.ym-side-open) #chat {
    right: 12px !important;
  }

  body.start-page.ym-side-open #page {
    width: calc(100% - var(--ym-side-width) - 30px) !important;
    max-width: none !important;
    margin-left: 15px !important;
    margin-right: calc(var(--ym-side-width) + 15px) !important;
    transition: width .2s ease, margin .2s ease !important;
  }

  #side-toggle {
    position: fixed !important;
    top: 13px !important;
    right: 0 !important;
    left: auto !important;
    z-index: 1002 !important;
    width: 41px !important;
    height: 41px !important;
    line-height: 41px !important;
    border-radius: 12px 0 0 12px !important;
    background: var(--ym-red) !important;
    color: white !important;
    box-shadow: 0 4px 13px rgba(70,30,20,.17) !important;
  }

  body.side-shown #side-toggle,
  #side-toggle.side-shown {
    right: var(--ym-side-width) !important;
  }

  #current-user {
    width: 100% !important;
    min-height: 86px !important;
    height: auto !important;
    padding: 11px !important;
    background: var(--ym-red) !important;
    color: white !important;
    overflow: hidden !important;
  }

  #current-user #nickname {
    display: block !important;
    max-width: calc(100% - 43px) !important;
    height: auto !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: clip !important;
    color: white !important;
    font-weight: 700 !important;
    font-size: 12px !important;
  }

  #nickname-edit {
    color: #ffe4c7 !important;
  }

  #side-content {
    position: absolute !important;
    top: 86px !important;
    right: 0 !important;
    bottom: 80px !important;
    left: 0 !important;
    width: auto !important;
    height: auto !important;
    margin: 0 5px !important;
    padding: 7px !important;
    overflow: hidden !important;
    border-radius: 12px !important;
    background: var(--ym-card) !important;
  }

  #side-actions {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 80px !important;
    padding: 8px !important;
    background: var(--ym-red) !important;
    color: white !important;
  }

  #side-actions li {
    color: white !important;
  }

  #contacts-available,
  #contacts-unavailable {
    width: 100% !important;
    height: 100% !important;
    max-height: 100% !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
  }

  #contacts-available .menu-header {
    padding: 11px 7px 8px !important;
    color: var(--ym-muted) !important;
    font-size: 10px !important;
    font-weight: 750 !important;
    letter-spacing: .09em !important;
    text-transform: uppercase !important;
  }

  #contacts-available #search {
    margin: 3px 0 9px !important;
    padding: 9px 8px !important;
    border-radius: 9px !important;
    background: var(--ym-red-soft) !important;
    color: var(--ym-red-dark) !important;
    font-size: 11px !important;
  }

  /* =====================================
     ПОИСК КОНТАКТОВ
  ===================================== */

  #side.ym-search-active #side-content {
    overflow: visible !important;
  }

  #side.ym-search-active #contacts-available {
    position: relative !important;
    overflow-x: visible !important;
    overflow-y: auto !important;
  }

  #side .ym-v6-search-back {
    position: absolute !important;
    top: 7px !important;
    left: 6px !important;
    z-index: 11000 !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 36px !important;
    min-width: 36px !important;
    height: 36px !important;
    margin: 0 !important;
    padding: 0 !important;
    border-radius: 10px !important;
    background: var(--ym-red-soft) !important;
    color: var(--ym-red-dark) !important;
    cursor: pointer !important;
  }

  /* =====================================
     КОНТАКТЫ
     АВАТАР | НИК И СООБЩЕНИЕ | МЕНЮ
  ===================================== */

  #contacts-list {
    display: block !important;
    width: 100% !important;
    margin: 7px 0 !important;
    padding: 0 !important;
    list-style: none !important;
  }

  #contacts-list .contact-item {
    position: relative !important;
    display: grid !important;
    grid-template-columns: 36px minmax(0,1fr) 20px !important;
    grid-template-rows: 21px 17px !important;
    column-gap: 6px !important;
    row-gap: 0 !important;
    width: 100% !important;
    min-width: 0 !important;
    min-height: 58px !important;
    height: auto !important;
    margin: 3px 0 !important;
    padding: 6px 3px !important;
    overflow: hidden !important;
    border-radius: 10px !important;
    background: transparent !important;
    align-items: center !important;
  }

  #contacts-list .contact-item:hover {
    background: var(--ym-red-soft) !important;
  }

  #contacts-list .avatar-wrapper {
    position: relative !important;
    grid-column: 1 !important;
    grid-row: 1 / 3 !important;
    display: block !important;
    justify-self: center !important;
    align-self: center !important;
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    border-radius: 10px !important;
  }

  #contacts-list .avatar-wrapper img,
  #contacts-list .avatar-wrapper .default-avatar {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 36px !important;
    height: 36px !important;
    max-width: 36px !important;
    max-height: 36px !important;
    margin: 0 !important;
    border-radius: 10px !important;
    object-fit: cover !important;
  }

  #contacts-list .contact-name {
    position: relative !important;
    grid-column: 2 !important;
    grid-row: 1 !important;
    display: block !important;
    align-self: end !important;
    width: 100% !important;
    min-width: 0 !important;
    height: auto !important;
    max-height: 21px !important;
    margin: 0 !important;
    padding: 0 2px 0 0 !important;
    overflow: hidden !important;
    color: var(--ym-text) !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    line-height: 17px !important;
    white-space: nowrap !important;
    text-overflow: clip !important;
  }

  #contacts-list .contact-last-message {
    position: relative !important;
    grid-column: 2 !important;
    grid-row: 2 !important;
    display: block !important;
    align-self: start !important;
    width: 100% !important;
    min-width: 0 !important;
    height: auto !important;
    max-height: 17px !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    color: var(--ym-muted) !important;
    font-size: 9px !important;
    line-height: 15px !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
  }

  #contacts-list .contacts-but {
    position: relative !important;
    grid-column: 3 !important;
    grid-row: 1 / 3 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 20px !important;
    height: 28px !important;
    margin: 0 !important;
    padding: 0 !important;
    color: var(--ym-muted) !important;
    font-size: 17px !important;
    overflow: visible !important;
  }

  #contacts-list .contact-more {
    z-index: 50 !important;
    left: auto !important;
    right: 0 !important;
  }

  #contacts-list .typing-indicator,
  #contacts-list .recording-indicator {
    display: none !important;
  }

  #contacts-list .vip-badge {
    position: absolute !important;
    top: 1px !important;
    right: 24px !important;
    font-size: 8px !important;
  }

  #contacts-list .unread-badge {
    position: absolute !important;
    right: 23px !important;
    bottom: 4px !important;
  }

  #contacts-list .online-indicator {
    position: absolute !important;
    left: 31px !important;
    bottom: 6px !important;
  }

  /* =====================================
     ЗАЯВКИ В ДРУЗЬЯ
  ===================================== */

  #contacts-new-requests {
    min-width: 0 !important;
    overflow: visible !important;
  }

  #contacts-invite-list {
    width: 100% !important;
    margin: 5px 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    list-style: none !important;
  }

  #contacts-invite-list > li {
    position: relative !important;
    box-sizing: border-box !important;
    min-width: 0 !important;
    min-height: 54px !important;
    margin: 5px 0 !important;
    padding: 7px !important;
    border-radius: 10px !important;
    background: #fff5e9 !important;
  }

  #contacts-invite-list > li.ym-invite-row {
    display: flex !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 7px !important;
  }

  #contacts-invite-list .ym-invite-actions {
    position: static !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    flex: 0 0 auto !important;
    gap: 7px !important;
    width: auto !important;
    height: auto !important;
    margin-left: auto !important;
    padding: 0 !important;
    float: none !important;
    transform: none !important;
    overflow: visible !important;
  }

  #contacts-invite-list .ym-accept-request,
  #contacts-invite-list .ym-reject-request {
    position: relative !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex: 0 0 31px !important;
    width: 31px !important;
    min-width: 31px !important;
    max-width: 31px !important;
    height: 31px !important;
    min-height: 31px !important;
    margin: 0 !important;
    padding: 0 !important;
    inset: auto !important;
    border: 1px solid transparent !important;
    border-radius: 9px !important;
    font-size: 0 !important;
    line-height: 1 !important;
    text-indent: 0 !important;
    color: transparent !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    text-decoration: none !important;
    cursor: pointer !important;
    transform: none !important;
    box-shadow: none !important;
  }

  #contacts-invite-list .ym-accept-request {
    background: #e4f2e5 !important;
    border-color: #c9e4ce !important;
  }

  #contacts-invite-list .ym-reject-request {
    background: #fae7e3 !important;
    border-color: #f0d0ca !important;
  }

  #contacts-invite-list .ym-accept-request::before {
    content: "✓" !important;
    display: block !important;
    color: #367d4e !important;
    font-family: Arial, sans-serif !important;
    font-size: 19px !important;
    font-weight: 700 !important;
    line-height: 1 !important;
  }

  #contacts-invite-list .ym-reject-request::before {
    content: "×" !important;
    display: block !important;
    color: #c64c42 !important;
    font-family: Arial, sans-serif !important;
    font-size: 23px !important;
    font-weight: 500 !important;
    line-height: 1 !important;
  }

  #contacts-invite-list .ym-accept-request:hover {
    background: #d4ebd8 !important;
  }

  #contacts-invite-list .ym-reject-request:hover {
    background: #f6d8d2 !important;
  }

  #contacts-invite-list .ym-accept-request > *,
  #contacts-invite-list .ym-reject-request > * {
    display: none !important;
  }

  /* =====================================
     ГЛАВНАЯ СТРАНИЦА
  ===================================== */

  body.start-page #wrapper,
  body.start-page #wrapper > div,
  body.start-page #main,
  body.start-page #wideContainer {
    display: block !important;
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    background: transparent !important;
  }

  body.start-page #page {
    width: min(1240px, calc(100% - 36px)) !important;
    max-width: 1240px !important;
    margin: 16px auto 30px !important;
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  body.start-page #header {
    display: flex !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 8px 18px !important;
    width: 100% !important;
    min-height: 70px !important;
    height: auto !important;
    margin: 0 0 13px !important;
    padding: 8px !important;
    background: transparent !important;
    color: var(--ym-red-dark) !important;
  }

  #header h1 {
    margin: 0 !important;
    font-size: 24px !important;
    font-weight: 750 !important;
  }

  #header h1 a {
    color: var(--ym-red) !important;
    text-decoration: none !important;
  }

  #header h2 {
    margin: 0 !important;
    color: var(--ym-muted) !important;
    font-size: 13px !important;
  }

  #header .usersOnline {
    margin: 0 0 0 auto !important;
    color: var(--ym-muted) !important;
    font-size: 11px !important;
  }

  #content {
    display: grid !important;
    grid-template-columns: minmax(0,1.2fr) minmax(260px,.8fr) !important;
    gap: 15px !important;
    align-items: start !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  #rooms-section,
  #topic-form,
  #all-topics-container,
  #vips {
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: 18px !important;
    border: 1px solid var(--ym-line) !important;
    border-radius: 16px !important;
    background: var(--ym-card) !important;
    color: var(--ym-text) !important;
    box-shadow: var(--ym-shadow) !important;
  }

  #rooms-section,
  #topic-form {
    grid-column: 1 / -1 !important;
  }

  #all-topics-container {
    grid-column: 1 !important;
    height: auto !important;
    overflow: visible !important;
  }

  #vips {
    grid-column: 2 !important;
    position: relative !important;
    max-height: 700px !important;
    overflow: auto !important;
  }

  #rooms-section {
    display: flex !important;
    flex-direction: column-reverse !important;
    gap: 10px !important;
  }

  #room-header,
  #topics-all-header,
  #vips .section-header {
    position: static !important;
    margin: 0 0 11px !important;
    color: var(--ym-muted) !important;
    font-size: 10px !important;
    line-height: 1.4 !important;
    font-weight: 750 !important;
    letter-spacing: .1em !important;
    text-transform: uppercase !important;
  }

  /* =====================================
     ВЫБОР КОМНАТЫ
  ===================================== */

  #room-options {
    display: grid !important;
    grid-template-columns: repeat(3,minmax(0,1fr)) !important;
    gap: 8px !important;
    width: 100% !important;
  }

  #room-options .room-option {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    width: 100% !important;
    min-width: 0 !important;
    min-height: 42px !important;
    height: auto !important;
    margin: 0 !important;
    padding: 7px 5px !important;
    border: 1px solid var(--ym-line) !important;
    border-radius: 10px !important;
    background: var(--ym-card-soft) !important;
    color: var(--ym-text) !important;
    font-size: 11px !important;
    font-weight: 650 !important;
    line-height: 1.25 !important;
    cursor: pointer !important;
  }

  #room-options .room-option.selected {
    border-color: #e9a99c !important;
    background: var(--ym-red-soft) !important;
    color: var(--ym-red-dark) !important;
  }

  #room-options .room-option svg {
    width: 19px !important;
    height: 19px !important;
    flex-shrink: 0 !important;
  }

  /* =====================================
     СОЗДАНИЕ ТЕМЫ
  ===================================== */

  #topic-form {
    display: grid !important;
    grid-template-columns: minmax(0,1fr) auto !important;
    grid-template-areas:
      "main main"
      "design design"
      "settings start" !important;
    gap: 11px 15px !important;
    align-items: center !important;
    position: relative !important;
  }

  #topic-main-container {
    grid-area: main !important;
    display: flex !important;
    align-items: center !important;
    flex-wrap: wrap !important;
    gap: 9px !important;
    width: 100% !important;
  }

  #topic-field-container {
    float: none !important;
    flex: 1 1 220px !important;
    width: auto !important;
    min-width: 0 !important;
  }

  #topic-field-container .field-wrap {
    width: 100% !important;
  }

  #topic-field-container .field-label {
    display: none !important;
  }

  #topic {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
    height: 44px !important;
    padding: 0 13px !important;
    border: 1px solid var(--ym-line) !important;
    border-radius: 10px !important;
    background: #fffdf9 !important;
    color: var(--ym-text) !important;
    font-size: 13px !important;
    outline: none !important;
    box-shadow: none !important;
  }

  #topic::placeholder {
    color: #aa9a8c !important;
    opacity: 1 !important;
  }

  #topic-optional {
    color: var(--ym-muted) !important;
    font-size: 10px !important;
  }

  #topic-to-top,
  #show-topic-design-options,
  #chat-settings {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    min-height: 36px !important;
    margin: 0 !important;
    padding: 0 10px !important;
    border: 1px solid var(--ym-line) !important;
    border-radius: 9px !important;
    background: var(--ym-card-soft) !important;
    color: var(--ym-red-dark) !important;
    font-size: 10px !important;
    text-decoration: none !important;
  }

  #topic-design-options {
    grid-area: design !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }

  #chat-settings-wrap {
    grid-area: settings !important;
    justify-self: start !important;
    position: relative !important;
    margin: 0 !important;
  }

  #topic-form h2.startChat {
    grid-area: start !important;
    justify-self: end !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  #chat_start {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 165px !important;
    min-height: 44px !important;
    padding: 0 19px !important;
    border: 0 !important;
    border-radius: 11px !important;
    background: var(--ym-red) !important;
    color: white !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    text-decoration: none !important;
  }

  /* =====================================
     ТЕМЫ И ТОП ТЕМЫ
  ===================================== */

  #all-topics-container {
    height: auto !important;
    overflow: visible !important;
  }

  #topics,
  #topics-top {
    position: relative !important;
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    margin: 0 !important;
    overflow: visible !important;
  }

  #topics-top {
    padding-bottom: 13px !important;
    margin-bottom: 15px !important;
    border-bottom: 1px solid var(--ym-line) !important;
  }

  #topics > ul,
  #topics-top > ul {
    display: grid !important;
    position: relative !important;
    grid-template-columns: repeat(5,minmax(0,1fr)) !important;
    grid-auto-rows: minmax(70px,auto) !important;
    gap: 8px !important;
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
    overflow: visible !important;
  }

  #topics > ul > li.topic-button,
  #topics-top > ul > li.topic-button {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    min-width: 0 !important;
    min-height: 70px !important;
    height: auto !important;
    max-height: none !important;
    margin: 0 !important;
    padding: 8px !important;
    transform: none !important;
    border: 1px solid var(--ym-line) !important;
    border-radius: 10px !important;
    background-color: var(--ym-card-soft) !important;
    color: var(--ym-text) !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    line-height: 1.35 !important;
    text-align: center !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
    word-break: normal !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    cursor: pointer !important;
  }

  /* Оформленные темы: сохраняем оригинальные картинки */

  #topics > ul > li.topic-button-with-design,
  #topics-top > ul > li.topic-button-with-design {
    position: relative !important;
    display: block !important;
    isolation: isolate !important;
    overflow: hidden !important;
    padding: 0 !important;
  }

  #topics .topic-button-with-design-overlay,
  #topics-top .topic-button-with-design-overlay {
    position: absolute !important;
    inset: 0 !important;
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 0 !important;
    pointer-events: none !important;
    background-position: left center, right center !important;
    background-repeat: no-repeat !important;
    background-size: auto 100%, auto 100% !important;
  }

  #topics .topic-button-with-design-inner,
  #topics-top .topic-button-with-design-inner {
    position: absolute !important;
    inset: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    height: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    padding: 0 12px !important;
    margin: 0 !important;
    z-index: 2 !important;
    overflow: hidden !important;
    text-align: center !important;
    white-space: nowrap !important;
    text-overflow: clip !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    line-height: 1.15 !important;
    box-sizing: border-box !important;
    pointer-events: none !important;
  }

  #topics > ul > li.topic-button:hover,
  #topics-top > ul > li.topic-button:hover {
    border-color: #e6aaa0 !important;
  }

  /* VIP сохраняет родную структуру */

  #vips {
    height: auto !important;
  }

  #vips .section-header {
    display: block !important;
    overflow: visible !important;
  }

  #vips .vip {
    border-radius: 10px !important;
  }

  /* =====================================
     ЧАТ
  ===================================== */

  #chat {
    position: fixed !important;
    z-index: 2 !important;
    top: 12px !important;
    right: 12px !important;
    bottom: 12px !important;
    left: 12px !important;
    width: auto !important;
    height: auto !important;
    margin: 0 !important;
    border: 1px solid var(--ym-line) !important;
    border-radius: 15px !important;
    background: var(--ym-card) !important;
    box-shadow: var(--ym-shadow) !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
  }

  #actions {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 54px !important;
    padding: 0 12px !important;
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    overflow: hidden !important;
    border-bottom: 1px solid var(--ym-line) !important;
    border-radius: 0 !important;
    background: var(--ym-card) !important;
    text-align: left !important;
    white-space: normal !important;
  }

  #room-current-chat,
  #add-to-contacts,
  #settings-wrap {
    display: inline-flex !important;
    align-items: center !important;
    min-height: 30px !important;
    margin: 0 !important;
    padding: 0 9px !important;
    border-radius: 9px !important;
    background: var(--ym-red-soft) !important;
    color: var(--ym-red-dark) !important;
    font-size: 10px !important;
    font-weight: 650 !important;
  }

  #opponent-label,
  #log li.message-item .name {
    display: none !important;
  }

  #opponent-panel,
  #friend-panel {
    margin-left: auto !important;
  }

  #log-wrap {
    position: absolute !important;
    top: 54px !important;
    right: 0 !important;
    bottom: 72px !important;
    left: 0 !important;
    width: auto !important;
    height: auto !important;
    overflow: hidden !important;
    background: #fff5e8 !important;
  }

  #log {
    position: absolute !important;
    inset: 0 !important;
    width: auto !important;
    height: auto !important;
    padding: 18px clamp(10px,2vw,30px) !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    background: transparent !important;
  }

  #log ol {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  #log li.message-item {
    width: fit-content !important;
    max-width: min(78%,680px) !important;
    margin: 4px 0 !important;
    padding: 10px 13px !important;
    border: 1px solid var(--ym-line) !important;
    border-radius: 14px !important;
    background: #fffdf9 !important;
    color: var(--ym-text) !important;
    box-shadow: 0 2px 8px rgba(91,59,37,.035) !important;
    line-height: 1.45 !important;
  }

  #log li.message-item.from {
    align-self: flex-start !important;
    border-top-left-radius: 5px !important;
  }

  #log li.message-item.to {
    align-self: flex-end !important;
    border-top-right-radius: 5px !important;
    background: var(--ym-red-soft) !important;
    border-color: #f0d9d1 !important;
  }

  #log li.message-item .message {
    color: var(--ym-text) !important;
    font-size: 14px !important;
    line-height: 1.5 !important;
    overflow-wrap: anywhere !important;
  }

  #log li.message-item .time {
    margin-top: 4px !important;
    color: var(--ym-muted) !important;
    font-size: 10px !important;
  }

  #log .ended {
    margin: 12px auto !important;
    padding: 13px !important;
    border-radius: 12px !important;
    background: var(--ym-card) !important;
  }

  /* =====================================
     ПАНЕЛЬ ВВОДА
  ===================================== */

  #controls {
    position: absolute !important;
    top: auto !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    width: auto !important;
    height: 72px !important;
    border-top: 1px solid var(--ym-line) !important;
    background: var(--ym-card) !important;
  }

  #but-start,
  #but-close {
    top: 9px !important;
    left: 12px !important;
    width: 130px !important;
    height: 53px !important;
    line-height: 53px !important;
    border-radius: 11px !important;
    background: var(--ym-red) !important;
    color: white !important;
    font-size: 11px !important;
    font-weight: 700 !important;
  }

  #text-wrap {
    top: 7px !important;
    bottom: 7px !important;
    left: 151px !important;
    right: 185px !important;
    width: auto !important;
    height: auto !important;
    border: 1px solid var(--ym-line) !important;
    border-radius: 12px !important;
    background: var(--ym-card-soft) !important;
  }

  #text {
    color: var(--ym-text) !important;
    font-size: 13px !important;
  }

  #text:empty::before {
    content: "Напишите сообщение…";
    color: #aa9a8c;
  }

  #but-gift,
  #but-sticker {
    color: #90776a !important;
  }

  #but-gift:hover,
  #but-sticker:hover {
    background: var(--ym-red-soft) !important;
    border-radius: 9px !important;
  }

  #but-audio,
  #but-photo,
  #but-send {
    top: 7px !important;
    width: 54px !important;
    height: 58px !important;
    line-height: 58px !important;
    border-radius: 10px !important;
    color: var(--ym-red-dark) !important;
  }

  #but-send {
    background: var(--ym-red-soft) !important;
  }

  /* =====================================
     ОКНА АВТОРИЗАЦИИ И РЕГИСТРАЦИИ
  ===================================== */

  .ym-v6-auth-frame {
    box-sizing: border-box !important;
    width: min(420px,calc(100vw - 28px)) !important;
    max-width: calc(100vw - 28px) !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    transform-origin: center center !important;
    z-index: 10050 !important;
  }

  .ym-v6-auth-form,
  #signin-form,
  #signup-form,
  #register-form,
  #registration-form,
  #login-form {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }

  .ym-v6-auth-frame input,
  .ym-v6-auth-frame select,
  .ym-v6-auth-frame textarea,
  .ym-v6-auth-frame button {
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .ym-v6-auth-frame .modal-body,
  .ym-v6-auth-frame .popup-content,
  .ym-v6-auth-frame .modal-content {
    max-height: none !important;
    overflow: visible !important;
  }

  /* =====================================
     АДАПТИВНОСТЬ
  ===================================== */

  @media (max-width: 1050px) {
    #content {
      grid-template-columns: minmax(0,1fr) !important;
    }

    #rooms-section,
    #topic-form,
    #all-topics-container,
    #vips {
      grid-column: 1 !important;
    }

    #topics > ul,
    #topics-top > ul {
      grid-template-columns: repeat(3,minmax(0,1fr)) !important;
    }
  }

  @media (max-width: 760px) {
    body.start-page #page {
      width: calc(100% - 18px) !important;
      margin: 10px auto 20px !important;
    }

    body.start-page #header {
      min-height: 60px !important;
      padding: 6px 3px 10px !important;
      gap: 5px 10px !important;
    }

    #header h1 {
      font-size: 20px !important;
    }

    #header h2 {
      font-size: 11px !important;
    }

    #header .usersOnline {
      width: 100% !important;
      margin: 0 !important;
    }

    #content {
      gap: 10px !important;
    }

    #rooms-section,
    #topic-form,
    #all-topics-container,
    #vips {
      padding: 13px !important;
      border-radius: 13px !important;
    }

    #room-options .room-option {
      min-height: 40px !important;
      font-size: 10px !important;
    }

    #topic-form {
      grid-template-columns: minmax(0,1fr) !important;
      grid-template-areas:
        "main"
        "design"
        "settings"
        "start" !important;
      gap: 9px !important;
    }

    #chat-settings-wrap {
      justify-self: start !important;
    }

    #topic-form h2.startChat {
      justify-self: stretch !important;
      text-align: center !important;
    }

    #chat_start {
      width: 100% !important;
    }

    #topics > ul,
    #topics-top > ul {
      grid-template-columns: repeat(3,minmax(0,1fr)) !important;
      grid-auto-rows: minmax(66px,auto) !important;
      gap: 6px !important;
    }

    #topics > ul > li.topic-button,
    #topics-top > ul > li.topic-button {
      min-height: 66px !important;
      font-size: 10px !important;
    }

    #side {
      height: calc(100dvh - 72px) !important;
      bottom: 72px !important;
    }

    #side-content {
      bottom: 76px !important;
    }

    #side-actions {
      height: 76px !important;
    }

    body.ym-side-open:not(.start-page) #chat {
      right: calc(var(--ym-side-width) + 6px) !important;
    }

    #chat {
      top: 6px !important;
      right: 6px !important;
      bottom: 6px !important;
      left: 6px !important;
    }

    #actions {
      height: 48px !important;
      padding: 0 7px !important;
      gap: 4px !important;
    }

    #room-current-chat,
    #add-to-contacts,
    #settings-wrap {
      min-height: 27px !important;
      padding: 0 6px !important;
      font-size: 9px !important;
    }

    #log-wrap {
      top: 48px !important;
      bottom: 66px !important;
    }

    #log {
      padding: 10px 8px !important;
    }

    #log li.message-item {
      max-width: 90% !important;
      padding: 8px 10px !important;
    }

    #controls {
      height: 66px !important;
    }

    #but-start,
    #but-close {
      top: 7px !important;
      left: 7px !important;
      width: 40px !important;
      height: 51px !important;
      line-height: 51px !important;
      overflow: hidden !important;
      font-size: 0 !important;
    }

    #but-start i,
    #but-close i {
      font-size: 21px !important;
    }

    #text-wrap {
      top: 6px !important;
      bottom: 6px !important;
      left: 52px !important;
      right: 151px !important;
    }

    #but-audio,
    #but-photo,
    #but-send {
      top: 6px !important;
      width: 44px !important;
      height: 54px !important;
      line-height: 54px !important;
    }

    #but-audio { right: 94px !important; }
    #but-photo { right: 47px !important; }
    #but-send { right: 0 !important; }

    #but-gift,
    #but-sticker {
      width: 38px !important;
      padding: 0 !important;
    }

    #but-gift { right: 38px !important; }
    #but-sticker { right: 0 !important; }

    #text { right: 78px !important; }
  }

  @media (max-width: 430px) {
    #topics > ul,
    #topics-top > ul {
      grid-template-columns: repeat(2,minmax(0,1fr)) !important;
    }

    #room-options .room-option {
      gap: 3px !important;
      padding: 6px 2px !important;
      font-size: 9px !important;
    }

    #topic-main-container {
      align-items: stretch !important;
    }

    #topic-field-container {
      flex-basis: 100% !important;
    }

    #topic-to-top,
    #show-topic-design-options {
      flex: 1 1 0 !important;
    }

    #text-wrap {
      left: 49px !important;
      right: 143px !important;
    }

    #but-audio,
    #but-photo,
    #but-send {
      width: 42px !important;
    }

    #but-audio { right: 88px !important; }
    #but-photo { right: 44px !important; }
  }

  `;

  const style = document.createElement('style');
  style.id = ID;
  style.textContent = css;
  document.head.appendChild(style);

  /* =====================================
     АВТОПОДГОНКА ДЛИННЫХ НИКОВ
  ===================================== */

  function fitOneLine(el, minSize, maxSize) {
    if (!el || !el.isConnected) return;

    const width = el.clientWidth;
    if (width < 5) return;

    const base = Number(el.dataset.ymBaseSize) ||
      parseFloat(getComputedStyle(el).fontSize) || maxSize;

    let size = Math.min(maxSize, base);

    el.style.whiteSpace = 'nowrap';
    el.style.textOverflow = 'clip';
    el.style.fontSize = size + 'px';

    while (size > minSize && el.scrollWidth > width + 1) {
      size = Math.max(minSize, size - .25);
      el.style.fontSize = size + 'px';
    }

    if (!el.dataset.ymBaseSize) {
      el.dataset.ymBaseSize = String(base);
    }
  }

  function fitAllText() {
    document.querySelectorAll('#current-user #nickname')
      .forEach(el => fitOneLine(el, 7.5, 12));

    document.querySelectorAll('#contacts-list .contact-name')
      .forEach(el => fitOneLine(el, 7.5, 11));

    document.querySelectorAll(
      '#topics .topic-button-with-design-inner,' +
      '#topics-top .topic-button-with-design-inner'
    ).forEach(el => fitOneLine(el, 7.5, 11));
  }

  /* =====================================
     ОТКРЫТИЕ / ЗАКРЫТИЕ БОКОВОЙ ПАНЕЛИ
  ===================================== */

  function syncSide() {
    const side = document.querySelector('#side');
    if (!side) return;

    const opened =
      document.body.classList.contains('side-shown') ||
      side.classList.contains('show');

    document.body.classList.toggle('ym-side-open', opened);
  }

  /* =====================================
     КНОПКА ВОЗВРАТА ИЗ ПОИСКА
  ===================================== */

  function updateSearchPanel() {
    const side = document.querySelector('#side');
    if (!side) return;

    const visible = el => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 &&
        s.display !== 'none' &&
        s.visibility !== 'hidden';
    };

    const inputs = [...side.querySelectorAll('input')].filter(visible);

    const searchInput = inputs.find(input => {
      const text = [
        input.id,
        input.className,
        input.name,
        input.placeholder,
        input.getAttribute('aria-label')
      ].join(' ').toLowerCase();

      return input.type === 'search' ||
        /search|поиск|пользовател/.test(text);
    });

    const active = Boolean(searchInput);
    side.classList.toggle('ym-search-active', active);

    side.querySelectorAll('.ym-v6-search-back')
      .forEach(el => el.classList.remove('ym-v6-search-back'));

    if (!active) return;

    const candidates = side.querySelectorAll(
      'button,a,[role="button"],div,span,i'
    );

    const inputRect = searchInput.getBoundingClientRect();

    for (const el of candidates) {
      if (!visible(el) || el === searchInput) continue;

      const text = [
        el.id,
        typeof el.className === 'string' ? el.className : '',
        el.getAttribute('aria-label'),
        el.title,
        el.textContent
      ].join(' ').toLowerCase();

      const r = el.getBoundingClientRect();

      const namedBack =
        /search-back|back-button|go-back|arrow_back|chevron_left|назад|вернуться/.test(text);

      const nearSearchTop =
        r.width > 10 && r.width < 60 &&
        r.height > 10 && r.height < 60 &&
        r.left <= inputRect.left + 48 &&
        r.top <= inputRect.top + 55;

      if (namedBack || nearSearchTop) {
        const target = el.closest('button,a,[role="button"]') || el;
        target.classList.add('ym-v6-search-back');
      }
    }
  }

  /* =====================================
     ЗАЯВКИ В ДРУЗЬЯ
  ===================================== */

  function classifyRequests() {
    const list = document.querySelector('#contacts-invite-list');
    if (!list) return;

    const acceptPattern =
      /accept|approve|confirm|принять|подтвердить|добавить в друзья|согласиться/i;

    const rejectPattern =
      /reject|decline|deny|refuse|отклонить|отказать|игнорировать/i;

    const actionSelector = [
      'button',
      'a',
      '[role="button"]',
      '[onclick]',
      '[class*="accept" i]',
      '[id*="accept" i]',
      '[class*="approve" i]',
      '[id*="approve" i]',
      '[class*="reject" i]',
      '[id*="reject" i]',
      '[class*="decline" i]',
      '[id*="decline" i]',
      '[class*="deny" i]'
    ].join(',');

    for (const item of list.children) {
      const controls = [...item.querySelectorAll(actionSelector)];

      let accept = null;
      let reject = null;

      for (const el of controls) {
        const classText =
          typeof el.className === 'string' ? el.className : '';

        const label = [
          el.innerText,
          el.textContent,
          el.title,
          el.getAttribute('aria-label'),
          el.getAttribute('data-action'),
          el.id,
          classText
        ].filter(Boolean).join(' ');

        const isAccept = acceptPattern.test(label);
        const isReject = rejectPattern.test(label);

        if (isAccept && !isReject && !accept) accept = el;
        if (isReject && !isAccept && !reject) reject = el;
      }

      if (!accept || !reject || accept === reject) continue;

      accept.classList.add('ym-accept-request');
      reject.classList.add('ym-reject-request');

      accept.setAttribute('aria-label', 'Принять заявку');
      reject.setAttribute('aria-label', 'Отклонить заявку');

      item.classList.add('ym-invite-row');

      let wrapper = accept.parentElement;

      while (
        wrapper &&
        wrapper !== item &&
        !wrapper.contains(reject)
      ) {
        wrapper = wrapper.parentElement;
      }

      if (wrapper && wrapper !== item) {
        wrapper.classList.add('ym-invite-actions');
      }
    }
  }

  /* =====================================
     ФОРМЫ ВХОДА И РЕГИСТРАЦИИ
  ===================================== */

  function authFit() {
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    if (!viewportW || !viewportH) return;

    const forms = document.querySelectorAll('form');

    const authRegex =
      /signin|sign-in|login|register|registration|signup|auth|авторизац|регистрац|вход|восстановлен/i;

    const modalRegex =
      /modal-content|modal-dialog|popup-inner|popup-content|login-box|signin-box|register-box|auth-box|auth-form|modal-window/i;

    for (const form of forms) {
      const formInfo = [
        form.id,
        form.className,
        form.getAttribute('action'),
        ...[...form.querySelectorAll('input')].map(input =>
          [input.id,input.name,input.type,input.placeholder].join(' ')
        )
      ].join(' ').toLowerCase();

      const hasPassword =
        !!form.querySelector('input[type="password"]');

      const isAuth =
        authRegex.test(formInfo) ||
        (hasPassword && /phone|username|email|password|парол/i.test(formInfo));

      if (!isAuth) continue;

      form.classList.add('ym-v6-auth-form');

      const formRect = form.getBoundingClientRect();
      if (!formRect.width || !formRect.height) continue;

      let frame = null;
      let modalFrame = false;

      for (
        let parent = form.parentElement, depth = 0;
        parent && parent !== document.body && depth < 9;
        parent = parent.parentElement, depth++
      ) {
        const rect = parent.getBoundingClientRect();
        const position = getComputedStyle(parent).position;
        if (!rect.width || !rect.height) continue;

        const fullScreen =
          rect.width >= viewportW * .96 &&
          rect.height >= viewportH * .96;

        if (fullScreen) continue;

        const name = (
          parent.id + ' ' +
          (typeof parent.className === 'string'
            ? parent.className : '')
        ).toLowerCase();

        const namedModal = modalRegex.test(name);

        const positionedModal =
          (position === 'fixed' || position === 'absolute') &&
          rect.width > formRect.width &&
          rect.height > formRect.height * .8;

        if (namedModal || positionedModal) {
          frame = parent;
          modalFrame = true;
          break;
        }
      }

      if (!frame) {
        frame = form;
        modalFrame = false;
      }

      frame.classList.add('ym-v6-auth-frame');

      frame.style.setProperty(
        'width',
        `min(420px, ${Math.max(240, viewportW - 28)}px)`,
        'important'
      );

      frame.style.setProperty('max-height', 'none', 'important');
      frame.style.setProperty('height', 'auto', 'important');
      frame.style.setProperty('overflow', 'visible', 'important');

      const width = Math.max(
        frame.offsetWidth,
        frame.scrollWidth,
        form.scrollWidth
      );

      const height = Math.max(
        frame.offsetHeight,
        frame.scrollHeight,
        form.scrollHeight
      );

      if (!width || !height) continue;

      const availableW = Math.max(240, viewportW - 24);
      const availableH = Math.max(260, viewportH - 24);

      const scale = Math.min(
        1,
        availableW / width,
        availableH / height
      );

      if (modalFrame) {
        frame.style.setProperty('position', 'fixed', 'important');
        frame.style.setProperty('left', '50%', 'important');
        frame.style.setProperty('top', '50%', 'important');
        frame.style.setProperty('right', 'auto', 'important');
        frame.style.setProperty('bottom', 'auto', 'important');
        frame.style.setProperty(
          'transform',
          `translate(-50%, -50%) scale(${scale.toFixed(3)})`,
          'important'
        );
        frame.style.setProperty(
          'transform-origin',
          'center center',
          'important'
        );
      } else {
        form.style.setProperty('max-width', '100%', 'important');
        form.style.setProperty('overflow', 'visible', 'important');
        form.style.setProperty(
          'transform',
          `scale(${scale.toFixed(3)})`,
          'important'
        );
        form.style.setProperty(
          'transform-origin',
          'top center',
          'important'
        );
      }
    }
  }

  /* =====================================
     ОБНОВЛЕНИЕ И НАБЛЮДЕНИЕ
  ===================================== */

  let frameId = 0;

  function update() {
    if (frameId) return;

    frameId = requestAnimationFrame(() => {
      frameId = 0;

      syncSide();
      updateSearchPanel();
      classifyRequests();
      fitAllText();
      authFit();

      const topic = document.querySelector('#topic');

      if (
        topic &&
        topic.getAttribute('placeholder') !== 'Предложите свою тему'
      ) {
        topic.setAttribute('placeholder', 'Предложите свою тему');
      }
    });
  }

  const observer = new MutationObserver(update);

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['class']
  });

  window.addEventListener('resize', update);

  update();

  /* =====================================
     УПРАВЛЕНИЕ
  ===================================== */

  window.YMCozyUI = {
    observer,

    refresh() {
      update();
    },

    destroy() {
      observer.disconnect();
      window.removeEventListener('resize', update);

      document.getElementById(ID)?.remove();

      document.body.classList.remove('ym-side-open');

      document.querySelectorAll(
        '.ym-invite-row,.ym-invite-actions,' +
        '.ym-accept-request,.ym-reject-request,' +
        '.ym-v6-auth-frame,.ym-v6-auth-form,' +
        '.ym-v6-search-back'
      ).forEach(el => {
        el.classList.remove(
          'ym-invite-row',
          'ym-invite-actions',
          'ym-accept-request',
          'ym-reject-request',
          'ym-v6-auth-frame',
          'ym-v6-auth-form',
          'ym-v6-search-back'
        );
      });

      delete window.YMCozyUI;
    }
  };

})();
