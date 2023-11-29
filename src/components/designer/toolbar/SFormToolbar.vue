<template>
	<div class="scpun-form-toolbar">
		<n-space class="scpun-form-toolbar__left">
			<n-button-group>
				<n-button type="default" ghost :title="t('designer.toolbar.undoHint')">
					<n-icon :size="16">
						<SvgIcon type="undo"/>
					</n-icon>
				</n-button>
				<n-button type="default" ghost :title="t('designer.toolbar.redoHint')">
					<n-icon :size="16">
						<SvgIcon type="redo"/>
					</n-icon>
				</n-button>
			</n-button-group>

			<n-radio-group v-model:value="layoutType" @update:value="changeLayoutType">
				<n-radio-button value="PC">
					{{ t("designer.toolbar.pcLayout") }}
				</n-radio-button>
                <n-radio-button value="Pad">
					{{ t("designer.toolbar.padLayout") }}
				</n-radio-button>
				<n-radio-button value="H5">
					{{ t("designer.toolbar.mobileLayout") }}
				</n-radio-button>
			</n-radio-group>
		</n-space>
		<n-space class="scpun-form-toolbar__right" :size="10">
            <n-button text size="small">{{ t('designer.toolbar.clear') }}</n-button>
            <n-button text size="small">{{ t('designer.toolbar.preview') }}</n-button>
            <n-button text size="small">{{ t('designer.toolbar.importJson') }}</n-button>
            <n-button text size="small">{{ t('designer.toolbar.exportJson') }}</n-button>
            <n-button text size="small">{{ t('designer.toolbar.exportCode') }}</n-button>
            <n-button text size="small">{{ t('designer.toolbar.generateCode') }}</n-button>
            <n-button text size="small">{{ t('designer.toolbar.generateSFC') }}</n-button>
        </n-space>
	</div>
</template>

<script lang="ts">
import { useI18n } from "/@/locale/useI18n";
import SvgIcon from "../../SvgIcon.vue";

export default defineComponent({
	name: "SFormToolbar",
	props: {
		designer: Object,
	},
	setup(props) {
		const data = reactive({
			layoutType: "PC",
		});

		const { t } = useI18n();

        const methods = {
            changeLayoutType(newType) {
                props.designer?.changeLayoutType(newType)
            }
        }

		return {
			...toRefs(data),
            ...methods,
			t,
		};
	},
});
</script>

<style lang="less">
.scpun-form-toolbar {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 40px;
	padding: 3px;

	&__left {
        use {
            fill: var(--app-text-color-base)
        }
	}
}
</style>
