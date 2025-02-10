import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)

// promise.then(response => {
//   console.log(response)
// })

//Es coomun hacerlo co  o siguue
// axios
//   .get('http://localhost:3001/notes')
//   .then(response => {
//   const notes = response.data
//   console.log(notes)
// })

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <App notes={notes} />
// )
// Esto tiene problemas ya que se procesa app solo cuando hay una respuesta de exito
//es ejor obtener los datos en app

// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data
//   ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
// })

ReactDOM.createRoot(document.getElementById("root")).render(<App />);