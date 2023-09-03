<template>
	<div class="scpun-designer-generate">
		<n-form
			ref="generateForm"
			:model="model"
			:rules="rules"
			:label-align="widgetForm.config.labelAlign"
			:label-placement="widgetForm.config.lablePlacement"
			:show-require-mark="widgetForm.config.hideRequiredMark"
		>
			<template v-for="(element, _index) of widgetForm.list">
				<!-- Grid 栅格 -->
				<template v-if="element.type === 'grid'">
					<n-grid
						class="widget-col widget-view"
						v-if="element.key"
						:key="element.key"
						:x-gap="element.options.xGap"
						:y-gap="element.options.yGap"
						:cols="element.options.cols"
						:responsive="element.options.responsive"
						:item-responsive="element.options.itemResponsive"
						:collapsed="element.options.collapsed"
						:collapsedRows="element.options.collapsedRows"
					>
						<n-gi
							v-for="(col, colIndex) of element.columns"
							:key="colIndex"
							:span="col.span"
							:offset="col.offset"
						>
							<FormGenerateItem
								v-for="colItem of col.list"
								v-model:model="model"
                                :key="colItem.key"
								:element="colItem"
								:config="data.config"
								:disabled="disabled"
							/>
						</n-gi>
					</n-grid>
				</template>
				<FormGenerateItem
                    v-else
					v-model:model="model"
                    :key="element.key"
					:element="element"
					:config="data.config"
					:disabled="disabled"
				/>
			</template>
		</n-form>
	</div>
</template>

<script lang="ts">
import FormGenerateItem from "./FormGenerateItem.vue";
import { naiveui } from "/@/config";

export default defineComponent({
	name: "FormGenerate",
	components: {
		FormGenerateItem,
	},
	props: {
		data: {
			type: Object,
			default: () => naiveui.widgetForm,
		},
		value: {
			type: Object,
		},
		disabled: {
			type: Boolean,
			default: () => false,
		},
		submitFunc: {
			type: Function,
		},
		requestFunc: {
			type: Function,
			default: () => ({}),
			required: false,
		},
	},
	setup(props) {
		const formState = reactive({
			generateForm: null as any,
			model: {} as any,
			rules: {} as any,
			widgetForm:
				(props.data && JSON.parse(JSON.stringify(props.data))) ??
				naiveui.widgetForm,
		});

		function getData() {
			return new Promise((resolve, reject) => {
				formState.generateForm
					?.validate((errors) => {
						if (!errors) {
							resolve(formState.model);
						}
					})
					.catch((error: Error) => {
						reject(error);
					});
			});
		}

		return {
			...toRefs(formState),
			getData,
		};
	},
});
</script>
