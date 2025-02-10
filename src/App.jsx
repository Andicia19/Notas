// const App = (props) => {
//   const { notes } = props


//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {/* Esto es lo mismo que abajo<li>{notes[0].content}</li>
//         <li>{notes[1].content}</li>
//         <li>{notes[2].content}</li> */}
//         {/*Existe una advertencia por que con map se debe coontar con un key por lo que se pone dentro de <li>*/}
//         {notes.map(note =>
//           <li key={note.id}>
//             {note.content}
//           </li>
//         )}
//       </ul>
//     </div>
//   )
// }

// const Note = ({ note }) => {
//   return (
//     <li>{note.content}</li>
//   )
// }


//importo el componente
//useState state hooks, proporciona el estado de los componentes
//useEffect Hooks de efectcos Permite que se conecte y sincronice con sistemas externos
//util cuando se usa libreria de interfaz de usuario diferente (manejar red, Dom del navegador, animaciones, wodgets)
//tambien se va a usar para obtener datos del servidor

import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
//Agregar estilos desde react
const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  
  //Obtener datos del servidor

  //El segundo parámetro de useEffect se usa para especificar la frecuencia con 
  // la que se ejecuta el efecto. Si el segundo parámetro es una matriz vacía [], 
  // entonces el efecto solo se ejecuta junto con el primer renderizado del componente.
  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }, [])

  useEffect(() => {
    noteService
    .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    /*event.preventDefault(), que evita la acción
    predeterminada de enviar un formulario. La acción 
    predeterminada, entre otras cosas, haría que la página se recargara.*/ 
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      //id : notes.length + 1 es mejor que el servidor genere el id
    }
    noteService
    .create(noteObject)
    //axios
    //.post('http://localhost:3001/notes', noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  /* Definicion con el operadro condicional funciona asi: */
  /*const result = condition ? val1 : val2*/
  /*la variable result se establecerá en el valor de val1 si 
  la condición (condition) es verdadera. Si la condition es falsa, 
  la variable result se establecerá en el valor de val2 */
  const notesToShow = showAll
    ? notes
    /*: notes.filter(note => note.important === true) esto es igual a lo de abajo, poque uimportant solo puede ser true o false*/
    : notes.filter(note => note.important)
//Las notas individuales almacenadas en el backend del servidor json se pueden modificar de dos formas diferentes 
//haciendo solicitudes HTTP a la URL única de la nota. Podemos reemplazar la nota completa con una solicitud HTTP PUT,
//o solo cambiar algunas de las propiedades de la nota con una solicitud HTTP PATCH.
  const toggleImportanceOf = id => {
    //const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    //En la práctica, { ...note } crea un nuevo objeto con copias de todas las propiedades del objeto note .
    //Cuando agregamos propiedades dentro de las llaves después del objeto extendido, por ejemplo,
    //{ ...note, important: true }, entonces el valor de la propiedad important del nuevo objeto será true.
    const changedNote = { ...note, important: !note.important }
    
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
    //Crear una nueva matriz de notes
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      //Cuando ocurre el error, agregamos un mensaje de error descriptivo al estado errorMessage. 
      //Al mismo tiempo, iniciamos un temporizador que establecerá el estado de errorMessage en null
      //después de cinco segundos.
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      // alert(
      //   `the note '${note.content}' was already deleted from server`
      // )
      setNotes(notes.filter(n => n.id !== id))
    })
    }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {/* <ul>
         eel key se ponde denro del componetne note y no dentro de li como estab antes
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul> */}
      {/*boton para cambiar showAll a True o false */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      {/*Lo siguiente muestra las notas importantes de acuerdo a si showAll es True*/}
      <ul>
        {notesToShow.map( (note,i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value = {newNote}
          onChange = {handleNoteChange}/> {/*Sin esta linea no puedo escribir nada se queda el de por defecto*/}
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App