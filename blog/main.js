const http = require("http");
const fs = require("fs");
const url = require("url");

const app = http.createServer((request, response) => {
  let _url = request.url;
  let pathname = url.parse(_url, true).pathname;
  let path = url.parse(_url, true).path;
  console.log(_url, path);
  if (_url === "/") {
    let template = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./app.css" />
    <title>Meta-log</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&family=Roboto&display=swap" rel="stylesheet" />
  </head>
  <body data-theme="light">
    <header>
      <div class="header-container">
        <a href=""><div>Meta-log</div></a>
        <nav class="toggle-container">
          <div id="dark-light-toggle">☀️</div>
          <div id="english-korean-toggle">한국어</div>
        </nav>
      </div>
    </header>
    <main>
      <div class="main-category">
        <div class="category-container">
          <div class="category-title">카테고리</div>
          <ul class="category-list">
            <a data-selected="false"><li>아이템</li></a>
            <a data-selected="false"><li>아이템</li></a>
            <a data-selected="false"><li>아이템</li></a>
            <a data-selected="false"><li>아이템</li></a>
            <a data-selected="false"><li>아이템</li></a>
          </ul>
        </div>
      </div>
      <div class="main-mid">
        <div class="search-box">
          <div class="search-title">검색</div>
          <input class="search-box" type="text" placeholder="태그를 입력하세요" />
        </div>
        <div class="posts-box">
          <a>
            <article>
              <h2 class="post-title">제목</h2>
              <div class="post-date">날짜</div>
              <p class="post-summary">요약</p>
              <span class="post-tag">태그</span>
            </article>
          </a>
          <a>
            <article>
              <h2 class="post-title">제목</h2>
              <div class="post-date">날짜</div>
              <p class="post-summary">요약</p>
              <span class="post-tag">태그</span>
            </article>
          </a>
        </div>
      </div>
      <div class="main-bio">
        <div class="profile-title">프로필</div>
        <div class="profile-content">
          <img src="./avatar.png" alt="프로필 이미지" loading="lazy" decoding="async" />
          <div class="name">이재혁</div>
          <div class="role">프론트엔드 개발자</div>
          <div class="status-message">나는 지금 개발중</div>
        </div>
      </div>
    </main>
    <script>
      // 다크모드 - 라이트 모드
      const body = document.querySelector("body");
      const dark_light_toggle = document.querySelector("#dark-light-toggle");
      dark_light_toggle.addEventListener("click", (event) => {
        if (body.dataset.theme === "light") {
          body.dataset.theme = "dark";
          body.classList.add("dark");
          body.classList.remove("light");
          dark_light_toggle.textContent = "🌙";
          document.documentElement.style.setProperty("color-scheme", "dark");
        } else {
          body.dataset.theme = "light";
          body.classList.add("light");
          body.classList.remove("dark");
          dark_light_toggle.textContent = "☀️";
          document.documentElement.style.setProperty("color-scheme", "light");
        }
      });
      // 영어 - 한국어
      const english_korean_toggle = document.querySelector("#english-korean-toggle");
      english_korean_toggle.addEventListener("click", (event) => {
        if (english_korean_toggle.innerHTML === "한국어") english_korean_toggle.innerHTML = "English";
        else english_korean_toggle.innerHTML = "한국어";
      });
      // 카테고리 클릭시
      let list = document.querySelector(".category-list").children;
      [...list].forEach((e) =>
        e.addEventListener("click", (event) => {
          // prettier-ignore
          [...list].filter((e) => e.dataset.selected === "true").forEach((e) => {
              if (e !== event.currentTarget) e.dataset.selected = "false";
            });
          e.dataset.selected = JSON.parse(e.dataset.selected) ? "false" : "true";
        })
      );
    </script>
  </body>
</html>
    `;
    response.writeHead(200);
    response.end(template);
  } else {
    fs.readFile(`blog${path}`, (err, data) => {
      response.writeHead(200);
      response.end(data);
    });
  }
});
app.listen(80);
