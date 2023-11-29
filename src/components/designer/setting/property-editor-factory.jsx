
export const createInputTextEditor = (propName, propLabelKey) => {
    return {
        props: {
            optionModal: Object
        },
        render(h) {
            return (
                <n-form-item>
                    <n-input v-model:value={this.optionModel[propName]}/>
                </n-form-item>
            )
        }
    }
}

export const createInputNumberEditor = (propName, propLabelKey) => {
    return {
        props: {
            optionModal: Object
        },
        render(h) {
            return (
                <n-form-item>
                    <n-input-number v-model:value={this.optionModel[propName]} update:value={this.updateValue} style="width: 100%" />
                </n-form-item>
            )
        },
        methods: {
            updateValue(newValue) {
                if ((newValue === undefined) || (newValue === null) || isNaN(newValue)) {
                  this.optionModel[propName] = null
                } else {
                  this.optionModel[propName] = Number(newValue)
                }
            },
        }
    }
}