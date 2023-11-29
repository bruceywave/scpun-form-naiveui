import { useI18n } from "/@/locale/useI18n";

export function usePropertyMixin(props, _context) {
    const {designer, selectedWidget, optionModel} = props

    const { t } = useI18n()

    const methods = {
        hasConfig(configName) {
            if (!designer || !designer.selectedWidget) {
                return false;
            }
            return designer.hasConfig(selectedWidget, configName);
        },
        emitDefaultValueChange() {
            if (!!designer) {
                if (!!designer.formWidget) {
                    let fieldWidget = designer.formWidget.getWidgetRef(
                        designer.selectedWidget.options.name
                    );
                    if (!!fieldWidget && !!fieldWidget.refreshDefaultValue) {
                        fieldWidget.refreshDefaultValue();
                    }
                }
            }
        },
        inputNumberHandler(value) {
            value = value.replace(/[^0-9]/gi, "");
        },
        onRemoteChange(val) {
            if (!!val) {
                optionModel.filterable = true;
                optionModel.allowCreate = false;
            }
        },
        onMultipleSelected(val) {
            if (val) {
                optionModel.defaultValue = []; //清空原默认值!!
            } else {
                if (
                    !!optionModel.defaultValue &&
                    optionModel.defaultValue.length > 0
                ) {
                    optionModel.defaultValue = optionModel.defaultValue[0];
                } else {
                    optionModel.defaultValue = "";
                }
            }
        },
    }

    return {
        ...methods,
        t
    }
}