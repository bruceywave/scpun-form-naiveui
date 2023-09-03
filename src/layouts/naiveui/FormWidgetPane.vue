<template>
	<div class="scpun-widget-form__container">
		<div v-if="!widgetForm.list?.length" class="form-empty">
			<n-empty description="从左侧拖拽来添加字段" size="large" />
		</div>

		<n-form
			:label-width="widgetForm.config.lableWidth"
			:show-require-mark="widgetForm.config.hideRequiredMark"
			:label-align="(widgetForm.config.labelAlign as LabelAlign)"
			:label-placement="(widgetForm.config.lablePlacement as LabelPlacement)"
		>
			<Draggable
				class="widget-form-list"
				item-key="key"
				ghostClass="ghost"
				handle=".drag-widget"
				:animation="200"
				:group="{ name: 'default' }"
				:list="widgetForm.list"
				@add="handleMoveAdd"
			>
				<template #item="{ element, index }">
					<TransitionGroup name="fade" tag="div">
						<template v-if="element.type === 'grid'">
							<div class="widget-grid-wrapper">
								<n-grid
									class="widget-col widget-view"
									v-if="element.key"
									:key="element.key"
									:class="{ active: widgetFormSelect?.key === element.key }"
									:x-gap="element.options.xGap"
									:y-gap="element.options.yGap"
									:cols="element.options.cols"
									:responsive="element.options.responsive"
									:item-responsive="element.options.itemResponsive"
									:collapsed="element.options.collapsed"
									:collapsedRows="element.options.collapsedRows"
									@click="handleItemClick(element)"
								>
									<n-gi
										v-for="(col, colIndex) of element.columns"
										:key="colIndex"
										:span="col.span"
										:offset="col.offset"
									>
										<Draggable
											class="widget-col-list"
											item-key="key"
											ghostClass="ghost"
											handle=".drag-widget"
											:animation="200"
											:group="{ name: 'default' }"
											:no-transition-on-drag="true"
											:list="col.list"
											@add="handleColMoveAdd($event, element, colIndex)"
										>
											<template #item="{ element, index }">
												<transition-group name="fade" tag="div">
													<FormWidgetPaneItem
														v-if="element.key"
														:key="element.key"
														:element="element"
														:config="widgetForm.config"
														:select-widget="widgetFormSelect"
														@click.stop="handleItemClick(element)"
														@copy="handleCopyClick(index, col.list)"
														@delete="handleDeleteClick(index, col.list)"
													/>
												</transition-group>
											</template>
										</Draggable>
									</n-gi>
								</n-grid>
								<!-- 删除按钮-->
								<div
									class="widget-view-action widget-col-action"
									v-if="widgetFormSelect?.key === element.key"
								>
									<SvgIcon
										type="delete"
										@click.stop="handleDeleteClick(index, widgetForm.list)"
									/>
								</div>

								<!-- 移动按钮-->
								<div
									class="widget-view-drag widget-col-drag"
									v-if="widgetFormSelect?.key === element.key"
								>
									<SvgIcon type="move" className="drag-widget" />
								</div>
							</div>
						</template>
						<template v-else>
							<FormWidgetPaneItem
								v-if="element.key"
								:key="element.key"
								:element="element"
								:config="widgetForm.config"
								:select-widget="widgetFormSelect"
								@click.stop="handleItemClick(element)"
								@copy="handleCopyClick(index, widgetForm.list)"
								@delete="handleDeleteClick(index, widgetForm.list)"
							/>
						</template>
					</TransitionGroup>
				</template>
			</Draggable>
		</n-form>
	</div>
</template>

<script lang="ts">
import moment from "moment";
import { LabelAlign, LabelPlacement } from "naive-ui/es/form/src/interface";
import { v4 } from "uuid";
import Draggable from "vuedraggable";
import { WidgetForm } from "/@/config/naiveui";
import { handleListDelete, handleListInsert } from "/@/utils";

export default defineComponent({
	name: "FormWidgetPane",
	components: {
		Draggable,
	},
	props: {
		widgetForm: {
			type: Object as PropType<WidgetForm>,
			required: true,
		},
		widgetFormSelect: {
			type: Object,
		},
	},
	emits: ["update:widgetForm", "update:widgetFormSelect"],
	setup(props, context) {
		const handleItemClick = (row: any) => {
			if (row.type === "date" || row.type === "time") {
				row.options.defaultValue =
					row.options.defaultValue &&
					(row.options.valueFormat
						? moment(row.options.defaultValue).format(row.options.valueFormat)
						: moment(row.options.defaultValue));
			}
			context.emit("update:widgetFormSelect", row);
		};

		const handleCopyClick = (index: number, list: any[]) => {
			const key = v4().replaceAll("-", "");
			const oldList = JSON.parse(JSON.stringify(props.widgetForm.list));

			let copyData = {
				...list[index],
				key,
				model: `${list[index].type}_${key}`,
				rules: list[index].rules ?? [],
			};

			if (
				list[index].type === "radio" ||
				list[index].type === "checkbox" ||
				list[index].type === "select"
			) {
				copyData = {
					...copyData,
					options: {
						...copyData.options,
						options: copyData.options.options.map((item: any) => ({ ...item })),
					},
				};
			}

			context.emit("update:widgetForm", {
				...props.widgetForm,
				list: handleListInsert(list[index].key, oldList, copyData),
			});

			context.emit("update:widgetFormSelect", copyData);
		};

		const handleDeleteClick = (index: number, list: any[]) => {
			const oldList = JSON.parse(JSON.stringify(props.widgetForm.list));

			if (list.length - 1 === index) {
				if (index === 0) {
					nextTick(() => context.emit("update:widgetFormSelect", undefined));
				} else {
					context.emit("update:widgetFormSelect", list[index - 1]);
				}
			} else {
				context.emit("update:widgetFormSelect", list[index + 1]);
			}

			context.emit("update:widgetForm", {
				...props.widgetForm,
				list: handleListDelete(list[index].key, oldList),
			});
		};

		const handleMoveAdd = (event: any) => {
			const { newIndex } = event;

			const key = v4().replaceAll("-", "");
			const list = JSON.parse(JSON.stringify(props.widgetForm.list));

			list[newIndex] = {
				...list[newIndex],
				key,
				model: `${list[newIndex].type}_${key}`,
				rules: [],
			};

			if (
				list[newIndex].type === "radio" ||
				list[newIndex].type === "checkbox" ||
				list[newIndex].type === "select"
			) {
				list[newIndex] = {
					...list[newIndex],
					options: {
						...list[newIndex].options,
						options: list[newIndex].options.options.map((item: any) => ({
							...item,
						})),
					},
				};
			}

			if (list[newIndex].type === "grid") {
				list[newIndex] = {
					...list[newIndex],
					columns: list[newIndex].columns.map((item: any) => ({ ...item })),
				};
			}

			context.emit("update:widgetForm", { ...props.widgetForm, list });

			context.emit("update:widgetFormSelect", list[newIndex]);
		};

		const handleColMoveAdd = (
			event: any,
			row: any,
			index: string | number | symbol
		) => {
			const { newIndex, oldIndex, item } = event;
			const list = JSON.parse(JSON.stringify(props.widgetForm.list));

			if (item.className.includes("data-grid")) {
				item.tagName === "DIV" &&
					list.splice(oldIndex, 0, row.columns[index].list[newIndex]);
				row.columns[index].list.splice(newIndex, 1);
				return false;
			}

			const key = v4().replaceAll("-", "");

			row.columns[index].list[newIndex] = {
				...row.columns[index].list[newIndex],
				key,
				model: `${row.columns[index].list[newIndex].type}_${key}`,
				rules: [],
			};

			if (
				row.columns[index].list[newIndex].type === "radio" ||
				row.columns[index].list[newIndex].type === "checkbox" ||
				row.columns[index].list[newIndex].type === "select"
			) {
				row.columns[index].list[newIndex] = {
					...row.columns[index].list[newIndex],
					options: {
						...row.columns[index].list[newIndex].options,
						options: row.columns[index].list[newIndex].options.options.map(
							(item: any) => ({ ...item })
						),
					},
				};
			}

			context.emit(
				"update:widgetFormSelect",
				row.columns[index].list[newIndex]
			);
		};

		return {
			handleItemClick,
			handleCopyClick,
			handleDeleteClick,
			handleMoveAdd,
			handleColMoveAdd,
		};
	},
});
</script>

<style lang="less" scoped>
.scpun-widget-form {
	display: flex;
	flex: 1;

	.widget-empty {
		background-position: 50%;
	}

	&__container {
		position: relative;
		overflow: auto;
		padding: 2px;
		box-sizing: border-box;
		display: flex;
		flex: 1;
		border: 1px dashed var(--app-border-color);

		position: relative;

		.form-empty {
			position: absolute;
			width: 300px;
			top: 45%;
			left: 40%;
		}

		.n-form {
			display: flex;
			flex: 1;
			padding: 10px;

			.widget-form-list {
				flex: 1;
				overflow: auto;
				// background:linear-gradient(90deg,var(--app-border-color) 1px,transparent 1px),linear-gradient(var(--app-border-color) 1px, #cccccc15 1px);
				// background-size: 60px 60px;

                .widget-grid-wrapper {
                    position: relative;
                }

				.widget-col.widget-view {
					width: unset !important;
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
						outline: 1px solid #e6a23c;
						outline-offset: 0;

						&.active {
							outline: 2px solid #e6a23c;
							border: 1px solid #e6a23c;
							outline-offset: 0;
						}

						.widget-view-drag {
							display: block;
						}
					}

					&.active {
						outline: 2px solid #e6a23c;
						border: 1px solid #e6a23c;
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

				.widget-col-list {
					min-height: 50px;
					border: 1px dashed var(--app-border-color);
					background: var(--n-color);
				}

				.ghost {
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

				.widget-view-action {
					position: absolute;
					right: 0;
					bottom: 0;
					height: 26px;
					line-height: 26px;
					background: #e6a23c;
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
					background: #e6a23c;
					z-index: 10;

					.svg-icon {
						font-size: 14px;
						color: #fff;
						margin: 0 5px;
						cursor: move;
					}
				}
			}

			.ghost {
				background: #f56c6c;
				border: 2px solid #f56c6c;
				position: relative;

				&::after {
					background: #f56c6c;
				}
			}
		}
	}

	&__container,
	.draggable-drag {
		background: var(--n-color);
		height: 100%;
		position: relative;
	}

	&__container > form,
	&__container > form > .n-row {
		height: 100%;
	}
}
</style>
