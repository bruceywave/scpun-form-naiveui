<template>
	<div class="scpun-designer-header">
		<!-- 左边区域布局 -->
		<div class="scpun-designer-header__logo">
			<img src="/@/assets/logo.png" />
			<span class="bold">SForm (NaiveUI)</span> 表单设计器
			<span class="version-span">V {{ formVersion }}</span>
		</div>
		<!-- 右边区域布局 -->
		<div class="scpun-designer-header_toolbar">
			<n-space>
				<n-radio-group :value="currentTheme" @update:value="handleChangeTheme">
					<n-radio-button value="lightTheme"> 亮色主题 </n-radio-button>
					<n-radio-button value="darkTheme"> 黑色主题 </n-radio-button>
					<n-radio-button value="systemTheme"> 跟随系统 </n-radio-button>
				</n-radio-group>
				<n-dropdown
					trigger="hover"
					placement="bottom-start"
					:options="localeOptions"
					@select="handleSelect"
				>
					<n-button> {{ currentLocaleName }} </n-button>
				</n-dropdown>
			</n-space>
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	name: "SFormHeader",
	props: {
		formVersion: String,
	},
	emits: ["updateTheme"],
	setup(_props, context) {
		const data = reactive({
			currentLocaleName: "简体中文",
            currentTheme: 'lightTheme',
			localeOptions: [
				{
					label: "简体中文",
					key: "zh-CN",
				},
				{
					label: "英文",
					key: "en",
				},
			],
		});

		const methods = {
			handleSelect(locale) {},
			handleChangeTheme(theme) {
                data.currentTheme = theme
                context.emit('updateTheme', theme)
			},
		};

		return {
			...toRefs(data),
			...methods,
		};
	},
});
</script>

<style lang="less">
.scpun-designer-header {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
	&__logo {
		font-size: 18px;
		color: var(--app-text-color-base);
		display: flex;
		align-items: center;
		justify-items: center;
		img {
			cursor: pointer;
			width: 36px;
			height: 36px;
		}
		span.bold {
			font-size: 20px;
			font-weight: bold;
			margin: 0 6px 0 6px;
		}

		span.version-span {
			font-size: 14px;
			color: var(--app-text-color-base);
			margin-left: 6px;
		}
	}
}
</style>
