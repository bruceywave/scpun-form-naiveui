import {
	// create naive ui
	create,
	// component
	NButton,
	NForm,
	NRow,
  NCol,
  NConfigProvider,
} from "naive-ui";

const naive = create({
	components: [NButton, NForm, NRow, NCol, NConfigProvider,],
});

export function setupNaiveui(app) {
	app.use(naive);
}
