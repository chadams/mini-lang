import { setup, disconnect } from "twind/shim";
import App from "./App.svelte";

setup();
const app = new App({
  target: document.getElementById("app"),
});

export default app;
