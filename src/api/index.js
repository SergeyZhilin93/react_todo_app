import axios from 'axios';

export const api = axios.create({ baseURL: 'https://pogrommist-todo-app-backend.herokuapp.com' })