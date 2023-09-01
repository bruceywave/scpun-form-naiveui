import { createApp } from "vue";
import App from "../src/App.vue";
import "/@/design/index.less";
import { setupNaiveui } from "./naiveui";
import { setupI18n } from "../src/locale/setupI18n";

async function setupApp() {
	const app = createApp(App);
	setupNaiveui(app);
  // 配置国际化
	await setupI18n(app);
	app.mount("#app");
}

setupApp();
