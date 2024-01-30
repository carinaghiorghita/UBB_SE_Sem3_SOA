import { View } from "Frontend/views/view";
import { customElement, state } from "lit/decorators.js";
import { html } from "lit";
import "@vaadin/message-list";
import "@vaadin/message-input";
import "@vaadin/text-field";
import { TextFieldChangeEvent } from "@vaadin/text-field";
import { MessageEndpoint } from "Frontend/generated/endpoints";
import Message from "Frontend/generated/com/example/application/model/Message";

@customElement("messages-view")
export class MessagesView extends View {
  @state() messages: (Message | undefined)[] = [];
  @state() userName = "";

  render() {
    return html`
      <h1 class="m-m">Book lecture club</h1>
      <vaadin-message-list
        class="flex-grow"
        .items=${this.messages}
      ></vaadin-message-list>
      <div class="flex p-s gap-s items-baseline">
        <vaadin-text-field
          placeholder="Your name"
          @change=${this.userNameChange}
        ></vaadin-text-field>
        <vaadin-message-input
          class="flex-grow"
          @submit=${this.submit}
        ></vaadin-message-input>
      </div>
    `;
  }

  userNameChange(e: TextFieldChangeEvent) {
    this.userName = e.target.value;
  }

  async submit(e: CustomEvent) {
    MessageEndpoint.send({
      text: e.detail.value,
      userName: this.userName,
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.classList.add("flex", "flex-col", "h-full", "box-border");

    MessageEndpoint.join().onNext(
        (message) => (this.messages = [...this.messages, message])
    );
  }
}
