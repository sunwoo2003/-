const apiKey = "ca7c4b8d049f408884f4311485011eb5";  // 🔑 본인 API 키 사용
const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error("뉴스 데이터를 불러오는데 실패했습니다.");
    }
    return response.json();
  })
  .then(data => {
    const articleContainer = document.getElementById("news-article");

    data.articles.forEach(article => {
      const title = article.title || "제목 없음";
      const date = new Date(article.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
      const author = article.author || "기자 미상";
      const description = article.description || "";
      const imageHTML = article.urlToImage
        ? `<img src="${article.urlToImage}" alt="기사 이미지">`
        : "";
      const content = article.content || "";

      const articleHTML = `
        <section style="margin-bottom: 40px; border-bottom: 1px solid #ddd; padding-bottom: 32px;">
          <h2>${title}</h2>
          <div class="meta">${date} / ${author}</div>
          <p class="summary"><strong>${description}</strong></p>
          ${imageHTML}
          <p>${content}</p>
        </section>
      `;

      articleContainer.insertAdjacentHTML("beforeend", articleHTML);
    });
  })
  .catch(error => {
    console.error("에러 발생:", error);
    const container = document.getElementById("news-article");
    container.innerHTML = "<p>뉴스를 불러오는 데 실패했습니다.</p>";
  });

  