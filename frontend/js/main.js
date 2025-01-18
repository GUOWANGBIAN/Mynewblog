// 文章加载
async function loadArticles() {
    try {
        const response = await fetch('/api/posts');
        const articles = await response.json();
        displayArticles(articles);
    } catch (error) {
        console.error('加载文章失败:', error);
    }
}

// 显示文章
function displayArticles(articles) {
    const container = document.querySelector('.article-container');
    container.innerHTML = articles.map(article => `
        <article class="article-card">
            <h2>${article.title}</h2>
            <p>${article.excerpt}</p>
            <a href="/post/${article.slug}">阅读更多</a>
        </article>
    `).join('');
}

// 初始化
document.addEventListener('DOMContentLoaded', loadArticles);