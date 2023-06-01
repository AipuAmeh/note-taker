const util = require('util');
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class DB {
    read() {
        return readFile('db/db.json', 'utf-8');
    }
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }
    getAllNotes() {
        return this.read()
        .then((notes) => {
            let allNotes;
            try {
                allNotes = [].concat(JSON.parse(notes));
            }
            catch(err){
                allNotes = [];
            }
            return allNotes;
        })
    }
    addNote(note) {
        const {title, text} = note;
        if (!title || !text) {
            throw new Error('Title and text cannot be blank!');
        }
        const newNote = {title, text, id:generateUniqueId()}
        return this.getAllNotes() 
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)
    }
    removeNote(id) {
        return this.getAllNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new DB();