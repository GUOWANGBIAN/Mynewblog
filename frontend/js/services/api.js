class Api {
    constructor() {
        this.baseUrl = '/api';
    }

    async getPosts() {
        const response = await fetch(`${this.baseUrl}/posts`);
        return response.json();
    }

    async createPost(data) {
        const response = await fetch(`${this.baseUrl}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async login(credentials) {
        const response = await fetch(`${this.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return response.json();
    }
}

export const api = new Api();