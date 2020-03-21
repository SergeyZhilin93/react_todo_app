import { api } from ".";

export function login(data) {
  return api.post('/auth/sign_in', data)
}

export function registration(data) {
  return api.post('/auth', data)
}