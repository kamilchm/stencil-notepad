import { createStore } from "@stencil/store";

import * as Notes from "../model/notes";

export interface State {
  notes: Notes.Note[]
};

const { state, onChange } = createStore<State>({
  notes: []
})

onChange("notes", Notes.save);

export { state };
