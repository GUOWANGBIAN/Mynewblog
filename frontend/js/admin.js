class AdminPanel {
    constructor() {
        this.init();
    }

    async init() {
        this.checkAuth();
        this.bindEvents();
        this.loadContent();
    }

    checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login.html';
        }
    }

    async loadContent(page = 'posts') {
        const content = document.getElementById('content');
        switch(page) {
            case 'posts':
                content.innerHTML = await this.getPostsHTML();
                break;
            case 'comments':
                content.innerHTML = await this.getCommentsHTML();
                break;
        }
    }
}

new AdminPanel();