<template>
	<div class="widget-item-container">
		<n-form-item
			v-if="element"
			class="widget-view"
			:key="element.key"
			:class="{ active: selectWidget?.key === element.key }"
			:label="element.label"
			:rules="element.options.rules"
		>
			<!-- 输入框组件 -->
			<template v-if="element.type === 'input'">
				<n-input
					readonly
					:size="((config.size || 'medium') as Size)"
					:autosize="element.options.autosize"
					:value="element.options.defaultValue"
					:style="{ width: element.options.width }"
					:placeholder="element.options.placeholder"
					:maxlength="element.options.maxlength"
					:minlength="element.options.minlength"
					:clearable="element.options.clearable"
					:disabled="element.options.disabled"
				/>
			</template>

			<!-- 密码框 -->
			<template v-if="element.type === 'password'">
				<n-input
					type="password"
					readonly
					:size="((config.size || 'medium') as Size)"
					:autosize="element.options.autosize"
					:value="element.options.defaultValue"
					:style="{ width: element.options.width }"
					:placeholder="element.options.placeholder"
					:maxlength="element.options.maxlength"
					:minlength="element.options.minlength"
					:clearable="element.options.clearable"
					:disabled="element.options.disabled"
					:showPasswordOn="element.options.showPasswordOn"
				/>
			</template>

			<!-- 多行文本框 -->
			<template v-if="element.type === 'textarea'">
				<n-input
					type="textarea"
					readonly
					:size="((config.size || 'medium') as Size)"
					:autosize="element.options.autosize"
					:value="element.options.defaultValue"
					:style="{ width: element.options.width }"
					:placeholder="element.options.placeholder"
					:maxlength="element.options.maxlength"
					:minlength="element.options.minlength"
					:clearable="element.options.clearable"
					:disabled="element.options.disabled"
				/>
			</template>

			<!-- 计数器 -->
			<template v-if="element.type === 'number'">
				<n-input-number
					readonly
					:size="((config.size || 'medium') as Size)"
					:autosize="element.options.autosize"
					:value="element.options.defaultValue"
					:style="{ width: element.options.width }"
					:placeholder="element.options.placeholder"
					:max="element.options.max"
					:min="element.options.min"
					:clearable="element.options.clearable"
					:disabled="element.options.disabled"
				/>
			</template>

			<!-- 单选框组 -->
			<template v-if="element.type === 'radio'">
				<n-radio-group
					readonly
					:size="((config.size || 'medium') as any)"
					:value="element.options.defaultValue"
					:style="{ width: element.options.width }"
					:disabled="element.options.disabled"
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
			</template>

			<!-- 多选框组 -->
			<template v-if="element.type === 'checkbox'">
				<n-checkbox-group
					:value="element.options.defaultValue"
					:style="{ width: element.options.width }"
					:disabled="element.options.disabled"
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
            <!-- 日期选择器 -->
			<template v-if="element.type === 'date'">
				<n-date-picker
					readonly
					:type="element.options.type"
					:value="element.options.defaultValue"
				/>
			</template>

            <!-- 评分 -->
			<template v-if="element.type === 'rate'">
				<n-rate
					readonly
					:type="element.options.type"
                    :allow-half="element.options.allowHalf"
					:value="element.options.defaultValue"
                    :disabled="element.options.disabled"
				/>
			</template>
		</n-form-item>

		<div class="widget-view-action" v-if="selectWidget?.key === element.key">
			<SvgIcon type="copy" @click.stop="$emit('copy')" />
			<SvgIcon type="delete" @click.stop="$emit('delete')" />
		</div>

		<div class="widget-view-drag" v-if="selectWidget?.key === element.key">
			<SvgIcon type="move" className="drag-widget" />
		</div>
	</div>
</template>

<script lang="ts">
import { WidgetForm } from "/@/config/naiveui";
import moment from "moment";
import RichTextEditor from "/@/components/RichTextEditor.vue";
import { Size } from "naive-ui/es/select/src/interface";
import SvgIcon from "/@/components/SvgIcon.vue";

export default defineComponent({
	name: "FormWidgetPaneItem",
	components: {
		RichTextEditor,
		SvgIcon,
	},
	props: {
		config: {
			type: Object as PropType<WidgetForm["config"]>,
			required: true,
		},
		element: {
			type: Object,
			required: true,
		},
		selectWidget: {
			type: Object,
		},
	},
	emits: ["copy", "delete"],
	setup() {
		const handleFilterOption = (input: string, option: { label: string }) =>
			option.label.toLowerCase().includes(input);

		return {
			handleFilterOption,
			moment,
		};
	},
});
</script>

<style lang="less" scoped>
.widget-item-container {
	position: relative;

	:deep(.n-form-item) {
		padding-bottom: 0 !important;
	}
}
</style>

<style lang="less">
.widget-item-container {
	position: relative;
	.widget-view {
		padding-bottom: 18px;
		position: relative;
		border: 1px dashed rgba(170, 170, 170, 0.7);
		background-color: rgba(236, 245, 255, 0.3);
		margin: 2px;

		&:after {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			display: block;
		}

		&:hover {
			background: var(--app-border-color);
			outline: 1px solid var(--app-primary-color);
			outline-offset: 0;

			&.active {
				outline: 2px solid var(--app-primary-color);
				border: 1px solid var(--app-primary-color);
				outline-offset: 0;
			}

			.widget-view-drag {
				display: block;
			}
		}

		&.active {
			outline: 2px solid var(--app-primary-color);
			border: 1px solid var(--app-primary-color);
		}

		&.ghost {
			background: #f56c6c;
			border: 2px solid #f56c6c;
			outline-width: 0;
			height: 3px;
			box-sizing: border-box;
			font-size: 0;
			content: "";
			overflow: hidden;
			padding: 0;
		}
	}

	.widget-view-action {
		position: absolute;
		right: 0;
		bottom: 0;
		height: 26px;
		line-height: 26px;
		background: var(--app-primary-color);
		z-index: 10;

		.svg-icon {
			display: inline-block;
			font-size: 14px;
			color: #fff;
			margin: 0 5px;
			cursor: pointer;
		}
	}

	.widget-view-drag {
		position: absolute;
		height: 28px;
		left: 0;
		top: 0;
		padding-top: 6px;
		line-height: 26px;
		background: var(--app-primary-color);
		z-index: 10;

		.svg-icon {
			font-size: 14px;
			color: #fff;
			margin: 0 5px;
			cursor: move;
		}
	}
}
</style>
