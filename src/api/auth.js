export function login(data) {
  return new Promise((resolve, reject) => {
    if (data.email == 'dog@dog.com' && data.password == 'dog') {
      return resolve()
    } else return reject()
  })
}