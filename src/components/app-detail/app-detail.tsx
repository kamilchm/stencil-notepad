import { Component, State, Prop, h } from "@stencil/core";

import * as Notes from "../../model/notes";
import { state } from "../store";

@Component({
  tag: "app-detail",
  styleUrl: "app-detail.css"
})
export class AppDetail {
  public navCtrl = document.querySelector("ion-router");

  @Prop() id: string;

  @State() note: Notes.Note = {
    id: null,
    title: "",
    content: ""
  };

  async componentDidLoad() {
    state.notes = await Notes.load();
    this.note = Notes.get(state.notes)(this.id);
  }

  noteChanged(ev) {
    state.notes = Notes.update(state.notes)(this.note, ev.target.value);
  }

  deleteNote() {
    setTimeout(() => state.notes = Notes.del(state.notes)(this.note), 500);
    this.navCtrl.back();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/notes" />
          </ion-buttons>
          <ion-title>{this.note.title}</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.deleteNote()}>
              <ion-icon slot="icon-only" name="trash" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-textarea
          onInput={ev => this.noteChanged(ev)}
          value={this.note.content}
          placeholder="...something on your mind?"
        />
      </ion-content>
    ];
  }
}
