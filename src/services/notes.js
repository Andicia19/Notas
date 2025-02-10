import axios from 'axios'
//const baseUrl = 'http://localhost:3001/notes'
//Este servidor se creo en la parte 3
const baseUrl = 'http://localhost:3001/api/notes'

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

//Las dos funciones son iguales
//const getAll = () => {
//  const request = axios.get(baseUrl)
//  return request.then(response => {
//    return response.data  })}

//Esto es una cadena de promesas
// axios
//   .put(`${baseUrl}/${id}`, newObject)
//   .then(response => response.data)
//   .then(changedNote => {
//     // ...
//   })

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// export default { 
//   getAll: getAll, 
//   create: create, 
//   update: update 
// }

export default { getAll, create, update }