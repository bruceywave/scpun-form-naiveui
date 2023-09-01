import { Rules, WidgetForm } from "../naiveui/types";
import { advanceComponents } from "./advance";
import { basicComponents } from "./basic";
import { layoutComponents } from "./layout";

export { advanceComponents, basicComponents, layoutComponents };

export type { Rules, WidgetForm };

export const widgetForm: WidgetForm = {
	list: [
    
  ],
	config: {
    size: "medium",
    hideRequiredMark: false,
    layout: "horizontal",
    labelAlign: "left",
    labelCol: {
      span: 3,
      offset: 0,
    },
    inline: false,
    lableWidth: 'auto',
    lablePlacement: "left",
    showLabel: true
  },
};
