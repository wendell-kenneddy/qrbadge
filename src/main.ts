import { FormHandler } from "./lib/FormHandler";
import { TabSwitcher } from "./lib/TabSwitcher";
import "./styles/style.css";
import "toastify-js/src/toastify.css";

const tabs = document.getElementById("tabs") as HTMLDivElement;
const form = document.getElementById("form-tab") as HTMLFormElement;
const tabSwitcher = new TabSwitcher("form");
const formHandler = new FormHandler();

tabs.addEventListener("click", (e) => tabSwitcher.switch(e));
form.addEventListener("submit", (e) => formHandler.handleSubmit(e));
