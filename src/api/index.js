import axios from 'axios';

export const api = axios.create({ baseURL: 'https://pogrommist-todo-app-backend.herokuapp.com' })
// export const api = axios.create({ baseURL: 'http://localhost:3001' })