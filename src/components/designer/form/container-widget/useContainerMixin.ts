import { useI18n } from "/@/locale/useI18n";

export default function useContainerMixin(props, _context) {
	const getFormConfig = inject("getFormConfig", () => {});
	const getGlobalDsv = inject("getGlobalDsv", () => {});

	const formConfig = computed(() => getFormConfig());

	const { designer, parentWidget, parentList, indexOfParentList, widget } = props;

    const { t } = useI18n()

    const selected = computed(() => props.widget.id === props.designer.selectedId)

    const customClass = computed(() => widget.options.customClass || '')

	const methods = {
		appendTableRow(widget) {
			designer.appendTableRow(widget);
		},

		appendTableCol(widget) {
			designer.appendTableCol(widget);
		},

		onContainerDragAdd(evt, subList) {
			const newIndex = evt.newIndex;
			if (!!subList[newIndex]) {
				designer.setSelected(subList[newIndex]);
			}

			designer.emitHistoryChange();
		},

		onContainerDragUpdate() {
			designer.emitHistoryChange();
		},

		checkContainerMove(evt) {
			return designer.checkWidgetMove(evt);
		},

		selectWidget(widget) {
			designer.setSelected(widget);
		},

		selectParentWidget() {
			if (parentWidget) {
				designer.setSelected(parentWidget);
			} else {
				designer.clearSelected();
			}
		},

		moveUpWidget() {
			designer.moveUpWidget(parentList, indexOfParentList);
			designer.emitHistoryChange();
		},

		moveDownWidget() {
			designer.moveDownWidget(parentList, indexOfParentList);
			designer.emitHistoryChange();
		},

		cloneContainer(widget) {
			if (!!parentList) {
				let newCon = designer.cloneContainer(widget);
				parentList.splice(indexOfParentList + 1, 0, newCon);
				designer.setSelected(newCon);

				designer.emitHistoryChange();
			}
		},

		removeWidget() {
			if (!!parentList) {
				const widgetRefName = designer.selectedWidgetName;
				let nextSelected = null;
				if (parentList.length === 1) {
					if (!!parentWidget) {
						nextSelected = parentWidget;
					}
				} else if (parentList.length === 1 + indexOfParentList) {
					nextSelected = parentList[indexOfParentList - 1];
				} else {
					nextSelected = parentList[indexOfParentList + 1];
				}

				nextTick(() => {
					parentList.splice(indexOfParentList, 1);
					designer.setSelected(nextSelected);

					designer.formWidget.deleteWidgetRef(widgetRefName); //删除组件ref！！！
					designer.emitHistoryChange();
				});
			}
		},

		setWidgetOption(optionName, optionValue) {
			//通用组件选项修改API
			if (widget.options.hasOwnProperty(optionName)) {
				widget.options[optionName] = optionValue;
			}
		},
	};

	return {
		formConfig,
        selected,
        customClass,
		...methods,
        getGlobalDsv,
        t,
	};
}
