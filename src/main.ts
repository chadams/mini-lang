import typography from "@twind/typography";
import { setup, disconnect } from "twind/shim";
import App from "./App.svelte";

setup({
  plugins: {
    ...typography({}),
  },
});
const app = new App({
  target: document.getElementById("app"),
});

export default app;
