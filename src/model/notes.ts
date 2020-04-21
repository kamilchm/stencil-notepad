import { Build } from "@stencil/core";

import * as Storage from "./storage";

export interface Note {
  id: string;
  title: string;
  content: string;
}

export async function load(): Promise<Note[]> {
  return Build.isServer ? [] : (await Storage.get("notes")) ?? [];
}

export async function save(notes: Note[]) {
  if (Build.isServer) {
    return;
  }
  Storage.set("notes", notes);
}

export const get = (notes: Note[]) => (id: string): Note =>
  notes.find((note) => note.id === id);

export const add = (notes: Note[]) => (title: string): Note[] => {
  let id = Math.max(...notes.map((n) => parseInt(n.id)), 0) + 1;

  return [...notes, { id: id.toString(), title, content: "" }];
};

export const update = (notes: Note[]) => (
  note: Note,
  content: string
): Note[] => [...notes.map((n) => (n.id !== note.id ? n : { ...n, content }))];

export const del = (notes: Note[]) => (note: Note): Note[] =>
  notes.filter((n) => n.id !== note.id);
