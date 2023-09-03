<template>
	<!-- 文本输入框 -->
	<n-form-item
		v-if="element"
		:key="element.key"
		:label="element.label"
		:path="element.model"
	>
		<template v-if="element.type === 'input'">
			<n-input
				v-model:value="data"
				:size="((config.size || 'medium') as Size)"
				:autosize="element.options.autosize"
				:style="{ width: element.options.width }"
				:placeholder="element.options.placeholder"
				:maxlength="element.options.maxlength"
				:minlength="element.options.minlength"
				:clearable="element.options.clearable"
				:disabled="element.options.disabled"
				:readonly="element.options.readonly"
			/>
		</template>
		<!-- 密码框 -->
		<template v-if="element.type === 'password'">
			<n-input
				type="password"
				v-model:value="data"
				:size="((config.size || 'medium') as Size)"
				:autosize="element.options.autosize"
				:style="{ width: element.options.width }"
				:placeholder="element.options.placeholder"
				:maxlength="element.options.maxlength"
				:minlength="element.options.minlength"
				:clearable="element.options.clearable"
				:disabled="element.options.disabled"
				:readonly="element.options.readonly"
				:showPasswordOn="element.options.showPasswordOn"
			/>
		</template>
		<!-- 多行文本框 -->
		<template v-if="element.type === 'textarea'">
			<n-input
				type="textarea"
				v-model:value="data"
				:size="((config.size || 'medium') as Size)"
				:autosize="element.options.autosize"
				:style="{ width: element.options.width }"
				:placeholder="element.options.placeholder"
				:maxlength="element.options.maxlength"
				:minlength="element.options.minlength"
				:clearable="element.options.clearable"
				:disabled="element.options.disabled"
				:readonly="element.options.readonly"
			/>
		</template>
		<!-- 计数器 -->
		<template v-if="element.type === 'number'">
			<n-input-number
				v-model:value="data"
				:size="((config.size || 'medium') as Size)"
				:autosize="element.options.autosize"
				:style="{ width: element.options.width }"
				:placeholder="element.options.placeholder"
				:max="element.options.max"
				:min="element.options.min"
				:clearable="element.options.clearable"
				:disabled="element.options.disabled"
				:readonly="element.options.readonly"
			/>
		</template>
		<!-- 单选框组 -->
		<template v-if="element.type === 'radio'">
			<n-radio-group
				v-model:value="data"
				:size="((config.size || 'medium') as any)"
				:style="{ width: element.options.width }"
				:disabled="element.options.disabled"
				:readonly="element.options.readonly"
			>
				<template v-if="element.options.type === 'radio'">
					<n-radio
						v-for="item of element.options.remote
							? element.options.remoteOptions
							: element.options.options"
						:key="item.value"
						:value="item.value"
					>
						{{ element.options.showLabel ? item.label : item.value }}
					</n-radio>
				</template>

				<template v-if="element.options.type === 'button'">
					<n-radio-button
						v-for="item of element.options.remote
							? element.options.remoteOptions
							: element.options.options"
						:key="item.value"
						:value="item.value"
					>
						{{ element.options.showLabel ? item.label : item.value }}
					</n-radio-button>
				</template>
			</n-radio-group>
			<!-- 多选框组 -->
			<template v-if="element.type === 'checkbox'">
				<n-checkbox-group
					v-model:value="data"
					:style="{ width: element.options.width }"
					:disabled="element.options.disabled"
					:readonly="element.options.readonly"
				>
					<n-checkbox
						v-for="item of element.options.remote
							? element.options.remoteOptions
							: element.options.options"
						:key="item.value"
						:value="item.value"
					>
						{{ element.options.showLabel ? item.label : item.value }}
					</n-checkbox>
				</n-checkbox-group>
			</template>
		</template>
		<!-- 日期选择器 -->
		<template v-if="element.type === 'date'">
			<n-date-picker v-model:value="data" :type="element.options.type" />
		</template>
		<!-- 评分 -->
		<template v-if="element.type === 'rate'">
			<n-rate
				v-model:value="data"
				:type="element.options.type"
				:allow-half="element.options.allowHalf"
				:readonly="element.options.readonly"
				:disabled="element.options.disabled"
			/>
		</template>
	</n-form-item>
</template>

<script lang="ts">
import moment from "moment";
import { WidgetForm } from "/@/config/naiveui";
import { Size } from "naive-ui/es/input/src/interface";

export default defineComponent({
	name: "FormGenerateItem",
	components: {},
	props: {
		config: {
			type: Object as PropType<WidgetForm["config"]>,
			required: true,
		},
		element: {
			type: Object,
			required: true,
		},
		model: {
			type: Object,
			required: true,
		},
		disabled: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:model"],
	setup(props, context) {
		const data = computed({
			get: () => {
				if (props.element.type === "date" || props.element.type === "time") {
					if (props.element.options.valueFormat) {
						return (
							props.model[props.element.model] &&
							moment(
								props.model[props.element.model],
								props.element.options.valueFormat
							).format(props.element.options.valueFormat)
						);
					} else {
						return (
							props.model[props.element.model] &&
							moment(props.model[props.element.model])
						);
					}
				} else {
					return props.model[props.element.model];
				}
			},
			set: (val) => {
				const model = JSON.parse(JSON.stringify(props.model));
				if (val === null) {
					model[props.element.model] = undefined;
				} else {
					model[props.element.model] = val;
				}
				context.emit("update:model", model);
			},
		});
		const handleFilterOption = (input: string, option: { label: string }) =>
			option.label.toLowerCase().includes(input);

		const handleUploadChange = ({ fileList }: any) => {
			data.value = fileList;
		};

		return {
			data,
			handleFilterOption,
			handleUploadChange,
		};
	},
});
</script>
