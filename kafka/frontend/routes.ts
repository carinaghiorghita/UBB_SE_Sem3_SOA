import {Route} from "@vaadin/router";
import "./views/messages/messages-view";

export const routes: Route[] = [
    {path: "/chat", component: "messages-view"},
];
