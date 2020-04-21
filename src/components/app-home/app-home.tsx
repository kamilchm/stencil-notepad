import { Component, h } from "@stencil/core";
import { alertController } from "@ionic/core";

import * as Notes from "../../model/notes";
import { state } from "../store";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
})
export class AppHome {
  async componentDidLoad() {
    state.notes = await Notes.load();
  }

  async addNote() {
    const alert = await alertController.create({
      header: "New note",
      message: "What should the title of this note be?",
      inputs: [{ type: "text", name: "title" }],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: async (data) => {
            state.notes = Notes.add(state.notes)(data.title);
          },
        },
      ],
    });

    alert.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Notes</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.addNote()}>
              <ion-icon slot="icon-only" name="clipboard" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-list>
          {state.notes.map(note => (
            <ion-item button detail href={`/notes/${note.id}`} routerDirection="forward">
              <ion-label>{note.title}</ion-label>
            </ion-item>
          ))}
        </ion-list>
      </ion-content>,
    ];
  }
}
