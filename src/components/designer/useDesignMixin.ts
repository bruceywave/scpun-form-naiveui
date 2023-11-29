import { useI18n } from "/@/locale/useI18n";

export function useDesignMixin(props, _context) {
    const refList = inject('refList', {})

    const { widget } = props

    // const message = useMessage()

    const { t } = useI18n()

	const methods = {
		initRefList() {
			if (refList !== null && !!widget.options.name) {
				refList[widget.options.name] = this;
			}
		},

		getWidgetRef(widgetName, showError) {
			let foundRef = refList[widgetName];
			if (!foundRef && !!showError) {
				console.error(t("render.hint.refNotFound") + widgetName);
			}
			return foundRef;
		},

		/* 该方法用于组件重名检查！！ */
		registerToRefList(oldRefName) {
			if (refList !== null && !!widget.options.name) {
				if (!!oldRefName) {
					delete refList[oldRefName];
				}
				refList[widget.options.name] = this;
			}
		},
	};

	return {
		...methods,
        t,
	};
}
