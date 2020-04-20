import { set, get } from "./storage";
import { Note } from "../interfaces/note";

let notes: Note[];

async function load(): Promise<Note[]> {
  if (notes === undefined) {
    notes = (await get("notes")) ?? [];
  }
  return notes;
}

async function save(): Promise<void> {
  return await set("notes", notes);
}

function getNote(id: string): Note {
  return notes.find((note) => note.id === id);
}

function createNote(title: string): void {
  let id = Math.max(...notes.map((n) => parseInt(n.id)), 0) + 1;

  notes.push({
    id: id.toString(),
    title,
    content: "",
  });
  save();
}

function updateNote(note: Note, content: string): void {
  let index = notes.indexOf(note);

  notes[index].content = content;
  save();
}

function deleteNote(note: Note): void {
  let index = notes.indexOf(note);

  if (index > -1) {
    notes.splice(index, 1);
    save();
  }
}

export const NotesService = {
  load,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
