const notesContainer = document.querySelector('#app')
const addNoteBtn = notesContainer.querySelector('.add-note')

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content)
    notesContainer.insertBefore(noteElement, addNoteBtn)
})

addNoteBtn.addEventListener('click', () => addNote())

function getNotes() {
    return JSON.parse(localStorage.getItem('myNotes-notes') || '[]')
}

function saveNotes(notes) {
    localStorage.setItem('myNotes-notes', JSON.stringify(notes))
}

function createNoteElement(id, content) {
    const element =document.createElement('textarea')

    element.classList.add('note')
    element.value = content
    element.placeholder = 'Empty Note'

    element.addEventListener('change', () => {
        updateNote(id, element.value)
    })

    element.addEventListener('dblclick', () => {
        const doDelete = confirm('Delete note?')

        if (doDelete) {
            deleteNote(id, element)
        }
    } )

    return element
}

function addNote() {
    const notes = getNotes()
    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: ''
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.content)
    notesContainer.insertBefore(noteElement, addNoteBtn)

    notes.push(noteObject)
    saveNotes(notes)
}

function updateNote(id, newContent) {
    const notes = getNotes()
    const targerNote = notes.filter(note => note.id == id)[0]

    targerNote.content = newContent
    saveNotes(notes)
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id)

    saveNotes(notes)
    notesContainer.removeChild(element)
}

