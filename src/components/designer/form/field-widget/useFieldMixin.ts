import { deepClone } from "../../designer";
import { useI18n } from "/@/locale/useI18n";
import { useEmitter } from "/@/utils/emitter";
import FormValidators from "/@/utils/validators";

export default function useFieldMixin(props, context) {
	// 注入属性或者方法 'refList', 'getFormConfig', 'getGlobalDsv', 'globalOptionData', 'globalModel', 'getOptionData'
	const refList = inject("refList", []);
	const getFormConfig = inject("getFormConfig", () => {});
	// const getGlobalDsv = inject("getGlobalDsv");
	// const globalOptionData = inject("globalOptionData");
	const globalModel = inject("globalModel") as any;
	const getOptionData = inject("getOptionData", () => {});
	const currentInstance = getCurrentInstance();
    const emitter = useEmitter(currentInstance, props)

	const { t } = useI18n();

	const data = reactive({
		fieldModel: null as any,
		oldFieldValue: null,
		fileList: [],
		rules: [],
		refList: {},
		formModel: computed({
			set() {},
			get() {
				return globalModel.formModel;
			},
		}),
	});

	const {
		field,
		parentWidget,
		subFormItemFlag,
		subFormRowIndex,
		designState,
		subFormRowId,
	} = props;

	// 封装计算属性
	const computeds = {
		formConfig: computed(() => getFormConfig()),
		widgetSize: computed(() => field.options.size || "medium"),
		subFormName: computed(() =>
			!!parentWidget ? parentWidget.options.name : ""
		),
		subFormItemFlag: computed(() =>
			!!parentWidget ? parentWidget.type === "sub-form" : false
		),
	};

	// 封装方法
	const methods = {
		getPropName() {
			if (computeds.subFormItemFlag && !designState) {
				return (
					computeds.subFormName +
					"." +
					subFormRowIndex +
					"." +
					field.options.name +
					""
				);
			} else {
				return field.options.name;
			}
		},
		initFieldModel() {
			if (!field.formItemFlag) {
				return;
			}

			if (!!subFormItemFlag && !designState) {
				//SubForm子表单组件需要特殊处理！！
				//@ts-expect-error
				let subFormData = computeds.formModel[computeds.subFormName];
				if (
					(subFormData === undefined ||
						subFormData[subFormRowIndex] === undefined ||
						subFormData[subFormRowIndex][field.options.name] === undefined) &&
					field.options.defaultValue !== undefined
				) {
					data.fieldModel = field.options.defaultValue;
					subFormData[subFormRowIndex][field.options.name] =
						field.options.defaultValue;
				} else if (
					subFormData[subFormRowIndex][field.options.name] === undefined
				) {
					data.fieldModel = null;
					subFormData[subFormRowIndex][field.options.name] = null;
				} else {
					data.fieldModel = subFormData[subFormRowIndex][field.options.name];
				}

				/* 主动触发子表单内field-widget的onChange事件！！ */
				setTimeout(() => {
					//延时触发onChange事件, 便于更新计算字段！！
					methods.handleOnChangeForSubForm(
						data.fieldModel,
						data.oldFieldValue,
						subFormData,
						subFormRowId
					);
				}, 800);
				data.oldFieldValue = deepClone(data.fieldModel);
				methods.initFileList(); //
				return;
			}
			if (
				data.formModel[field.options.name] === undefined &&
				field.options.defaultValue !== undefined
			) {
				data.fieldModel = field.options.defaultValue;
			} else if (data.formModel[field.options.name] === undefined) {
				//如果formModel为空对象，则初始化字段值为null!!
				data.formModel[field.options.name] = null;
			} else {
				data.fieldModel = data.formModel[field.options.name];
			}
			data.oldFieldValue = deepClone(data.fieldModel);
			methods.initFileList(); //
		},
		initFileList() {
			//初始化上传组件的已上传文件列表
			if (
				(field.type !== "picture-upload" && field.type !== "file-upload") ||
				designState === true
			) {
				return;
			}

			if (!!data.fieldModel) {
				if (Array.isArray(data.fieldModel)) {
					data.fileList = deepClone(data.fieldModel);
				} else {
                    // @ts-expect-error
					data.fileList.splice(0, 0, deepClone(data.fieldModel));
				}
			}
		},
		initEventHandler() {
			emitter.on$("setFormData", (newFormData) => {
				console.log(
					"formModel of globalModel----------",
					globalModel.formModel
				);
				if (!subFormItemFlag) {
					methods.setValue(newFormData[field.options.name]);
				}
			});

			emitter.on$("field-value-changed", (values) => {
				if (!!subFormItemFlag) {
					let subFormData = data.formModel[computeds.subFormName.value];
					methods.handleOnChangeForSubForm(
						values[0],
						values[1],
						subFormData,
						subFormRowId
					);
				} else {
					methods.handleOnChange(values[0], values[1]);
				}
			});

			emitter.on$("reloadOptionItems", (widgetNames) => {
				if (
					widgetNames.length === 0 ||
					widgetNames.indexOf(field.options.name) > -1
				) {
					methods.initOptionItems(true);
				}
			});
		},
		handleOnCreated() {
			if (!!field.options.onCreated) {
				let customFunc = new Function(field.options.onCreated);
				customFunc.call(this);
			}
		},

		handleOnMounted() {
			if (!!field.options.onMounted) {
				let mountFunc = new Function(field.options.onMounted);
				mountFunc.call(this);
			}
		},

		registerToRefList(oldRefName) {
			if (refList !== null && !!field.options.name) {
				if (subFormItemFlag && !designState) {
					//处理子表单元素（且非设计状态）
					if (!!oldRefName) {
						delete refList[oldRefName + "@row" + subFormRowId];
					}
					refList[field.options.name + "@row" + subFormRowId] = this;
				} else {
					if (!!oldRefName) {
						delete refList[oldRefName];
					}
					data.refList[field.options.name] = this;
				}
			}
		},
		unregisterFromRefList() {
			//销毁组件时注销组件ref
			if (refList !== null && !!field.options.name) {
				let oldRefName = field.options.name;
				if (subFormItemFlag && !designState) {
					//处理子表单元素（且非设计状态）
					delete refList[oldRefName + "@row" + subFormRowId];
				} else {
					delete refList[oldRefName];
				}
			}
		},
		initOptionItems(keepSelected) {
			if (designState) {
				return;
			}

			if (
				field.type === "radio" ||
				field.type === "checkbox" ||
				field.type === "select" ||
				field.type === "cascader"
			) {
				/* 异步更新option-data之后globalOptionData不能获取到最新值，改用provide的getOptionData()方法 */
				const newOptionItems = getOptionData() as any;
				if (
					!!newOptionItems &&
					newOptionItems.hasOwnProperty(field.options.name)
				) {
					if (!!keepSelected) {
						methods.reloadOptions(newOptionItems[field.options.name]);
					} else {
						methods.loadOptions(newOptionItems[field.options.name]);
					}
				}
			}
		},

		refreshDefaultValue() {
			if (designState === true && field.options.defaultValue !== undefined) {
				data.fieldModel = field.options.defaultValue;
			}
		},

		clearFieldRules() {
			if (!field.formItemFlag) {
				return;
			}

			data.rules.splice(0, data.rules.length); //清空已有
		},

		buildFieldRules() {
			if (!field.formItemFlag && field.options.hidden) {
				return;
			}

			data.rules.splice(0, data.rules.length); //清空已有
			if (!!field.options.required) {
				// @ts-expect-error
				data.rules.push({
					required: true,
					//trigger: ['blur', 'change'],
					trigger: [
						"blur",
					] /* 去掉change事件触发校验，change事件触发时formModel数据尚未更新，导致radio/checkbox必填校验出错！！ */,
					message: field.options.requiredHint || t("render.hint.fieldRequired"),
				});
			}

			if (!!field.options.validation) {
				let vldName = field.options.validation;
				if (!!FormValidators[vldName]) {
					// @ts-expect-error
					data.rules.push({
						validator: FormValidators[vldName],
						trigger: ["blur", "change"],
						label: field.options.label,
						errorMsg: field.options.validationHint,
					});
				} else {
					// @ts-expect-error
					data.rules.push({
						validator: FormValidators["regExp"],
						trigger: ["blur", "change"],
						regExp: vldName,
						label: field.options.label,
						errorMsg: field.options.validationHint,
					});
				}
			}

			if (!!field.options.onValidate) {
				let customFn = (rule, value, callback) => {
					let tmpFunc = new Function(
						"rule",
						"value",
						"callback",
						field.options.onValidate
					);
					return tmpFunc.call(this, rule, value, callback);
				};
				// @ts-expect-error
				data.rules.push({
					validator: customFn,
					trigger: ["blur", "change"],
					label: field.options.label,
				});
			}
		},

		/**
		 * 禁用字段值变动触发表单校验
		 */
		disableChangeValidate() {
			if (!data.rules) {
				return;
			}

			data.rules.forEach((rule: any) => {
				if (!!rule.trigger) {
					rule.trigger.splice(0, rule.trigger.length);
				}
			});
		},

		/**
		 * 启用字段值变动触发表单校验
		 */
		enableChangeValidate() {
			if (!data.rules) {
				return;
			}

			data.rules.forEach((rule: any) => {
				if (!!rule.trigger) {
					rule.trigger.push("blur");
					rule.trigger.push("change");
				}
			});
		},

		disableOptionOfList(optionList, optionValue) {
			if (!!optionList && optionList.length > 0) {
				optionList.forEach((opt) => {
					if (opt.value === optionValue) {
						opt.disabled = true;
					}
				});
			}
		},

		enableOptionOfList(optionList, optionValue) {
			if (!!optionList && optionList.length > 0) {
				optionList.forEach((opt) => {
					if (opt.value === optionValue) {
						opt.disabled = false;
					}
				});
			}
		},

		//--------------------- 组件内部方法 end ------------------//

		//--------------------- 事件处理 begin ------------------//

		emitFieldDataChange(newValue, oldValue) {
			context.emit("field-value-changed", [newValue, oldValue]);

			/* 必须用dispatch向指定父组件派发消息！！ */
			emitter.dispatch("SFormRender", "fieldChange", [
				field.options.name,
				newValue,
				oldValue,
				computeds.subFormName,
				subFormRowIndex,
			]);
		},

		syncUpdateFormModel(value) {
			if (!!designState) {
				return;
			}

			if (!!subFormItemFlag) {
				let subFormData = data.formModel[computeds.subFormName.value] || [{}];
				let subFormDataRow = subFormData[subFormRowIndex];
				if (!!subFormDataRow) {
					// 重置表单后subFormDataRow为undefined，应跳过！！
					subFormDataRow[field.options.name] = value;
				}
			} else {
				data.formModel[field.options.name] = value;
			}
		},

		handleChangeEvent(value) {
			methods.syncUpdateFormModel(value);
			methods.emitFieldDataChange(value, data.oldFieldValue);

			//number组件一般不会触发focus事件，故此处需要手工赋值oldFieldValue！！
			data.oldFieldValue =
				deepClone(
					value
				); /* oldFieldValue需要在initFieldModel()方法中赋初值!! */

			/* 主动触发表单的单个字段校验，用于清除字段可能存在的校验错误提示 */
			emitter.dispatch("SFormRender", "fieldValidation", [methods.getPropName()]);
		},

		handleFocusCustomEvent(event) {
			data.oldFieldValue = deepClone(data.fieldModel); //保存修改change之前的值

			if (!!field.options.onFocus) {
				let customFn = new Function("event", field.options.onFocus);
				customFn.call(this, event);
			}
		},

		handleBlurCustomEvent(event) {
			if (!!field.options.onBlur) {
				let customFn = new Function("event", field.options.onBlur);
				customFn.call(this, event);
			}
		},

		handleInputCustomEvent(value) {
			methods.syncUpdateFormModel(value);

			/* 主动触发表单的单个字段校验，用于清除字段可能存在的校验错误提示 */
			emitter.dispatch("SFormRender", "fieldValidation", [methods.getPropName()]);

			if (!!field.options.onInput) {
				let customFn = new Function("value", field.options.onInput);
				customFn.call(this, value);
			}
		},

		emitAppendButtonClick() {
			if (!!designState) {
				//设计状态不触发点击事件
				return;
			}

			if (!!field.options.onAppendButtonClick) {
				let customFn = new Function(field.options.onAppendButtonClick);
				customFn.call(this);
			} else {
				/* 必须调用mixins中的dispatch方法逐级向父组件发送消息！！ */
				emitter.dispatch("VFormRender", "appendButtonClick", [this]);
			}
		},

		handleOnChange(val, oldVal) {
			//自定义onChange事件
			if (!!field.options.onChange) {
				let changeFn = new Function(
					"value",
					"oldValue",
					field.options.onChange
				);
				changeFn.call(this, val, oldVal);
			}
		},

		handleOnChangeForSubForm(val, oldVal, subFormData, rowId) {
			//子表单自定义onChange事件
			if (!!field.options.onChange) {
				let changeFn = new Function(
					"value",
					"oldValue",
					"subFormData",
					"rowId",
					field.options.onChange
				);
				changeFn.call(this, val, oldVal, subFormData, rowId);
			}
		},

		handleButtonWidgetClick() {
			if (!!designState) {
				//设计状态不触发点击事件
				return;
			}

			if (!!field.options.onClick) {
				let changeFn = new Function(field.options.onClick);
				changeFn.call(this);
			} else {
				emitter.dispatch("SFormRender", "buttonClick", [this]);
			}
		},

		remoteQuery(keyword) {
			if (!!field.options.onRemoteQuery) {
				let remoteFn = new Function("keyword", field.options.onRemoteQuery);
				remoteFn.call(this, keyword);
			}
		},

		//--------------------- 事件处理 end ------------------//

		//--------------------- 以下为组件支持外部调用的API方法 begin ------------------//
		/* 提示：用户可自行扩充这些方法！！！ */

		getFormRef() {
			/* 获取VFrom引用，必须在VForm组件created之后方可调用 */
			return refList["v_form_ref"];
		},

		getWidgetRef(widgetName, showError) {
			let foundRef = refList[widgetName];
			if (!foundRef && !!showError) {
				//TODO
				// $message.error(i18nt("render.hint.refNotFound") + widgetName);
			}
			return foundRef;
		},

		getFieldEditor() {
			//获取内置的el表单组件
			return currentInstance?.refs["fieldEditor"];
		},

		/*
            注意：VFormRender的setFormData方法不会触发子表单内field-widget的setValue方法，
            因为setFormData方法调用后，子表单内所有field-widget组件已被清空，接收不到setFormData事件！！
          * */
		setValue(newValue) {
			/* if ((field.type === 'picture-upload') || (field.type === 'file-upload')) {
              fileList = newValue
            } else */ if (!!field.formItemFlag) {
				let oldValue = deepClone(data.fieldModel);
				data.fieldModel = newValue;
				methods.initFileList();

				methods.syncUpdateFormModel(newValue);
				methods.emitFieldDataChange(newValue, oldValue);
			}
		},

		getValue() {
			/* if ((field.type === 'picture-upload') || (field.type === 'file-upload')) {
              return fileList
            } else */ {
				return data.fieldModel;
			}
		},

		resetField() {
			let defaultValue = field.options.defaultValue;
			methods.setValue(defaultValue);
			nextTick(() => {
				//
			});

			//清空上传组件文件列表
			if (field.type === "picture-upload" || field.type === "file-upload") {
				// @ts-expect-error
				currentInstance?.refs["fieldEditor"].clearFiles();
				data.fileList.splice(0, data.fileList.length);
			}
		},

		setWidgetOption(optionName, optionValue) {
			//通用组件选项修改API
			if (field.options.hasOwnProperty(optionName)) {
				field.options[optionName] = optionValue;
				//TODO: 是否重新构建组件？？有些属性修改后必须重新构建组件才能生效，比如字段校验规则。
			}
		},

		setReadonly(flag) {
			field.options.readonly = flag;
		},

		setDisabled(flag) {
			field.options.disabled = flag;
		},

		setAppendButtonVisible(flag) {
			field.options.appendButton = flag;
		},

		setAppendButtonDisabled(flag) {
			field.options.appendButtonDisabled = flag;
		},

		setHidden(flag) {
			field.options.hidden = flag;

			if (!!flag) {
				//清除组件校验规则
				methods.clearFieldRules();
			} else {
				//重建组件校验规则
				methods.buildFieldRules();
			}
		},

		setRequired(flag) {
			field.options.required = flag;
			methods.buildFieldRules();
		},

		setLabel(newLabel) {
			field.options.label = newLabel;
		},

		focus() {
			//@ts-expect-error
			if (!!methods.getFieldEditor() && !!methods.getFieldEditor().focus) {
				//@ts-expect-error
				methods.getFieldEditor().focus();
			}
		},

		clearSelectedOptions() {
			//清空已选选项
			if (
				field.type !== "checkbox" &&
				field.type !== "radio" &&
				field.type !== "select"
			) {
				return;
			}

			if (
				field.type === "checkbox" ||
				(field.type === "select" && field.options.multiple)
			) {
				data.fieldModel = [];
			} else {
				data.fieldModel = "";
			}
		},

		/**
		 * 加载选项，并清空字段值
		 * @param options
		 */
		loadOptions(options) {
			field.options.optionItems = deepClone(options);
			//clearSelectedOptions()  //清空已选选项
		},

		/**
		 * 重新加载选项，不清空字段值
		 * @param options
		 */
		reloadOptions(options) {
			field.options.optionItems = deepClone(options);
		},

		disableOption(optionValue) {
			methods.disableOptionOfList(field.options.optionItems, optionValue);
		},

		enableOption(optionValue) {
			methods.enableOptionOfList(field.options.optionItems, optionValue);
		},

		/**
		 * 返回选择项
		 * @returns {*}
		 */
		getOptionItems() {
			return field.options.optionItems;
		},

		setToolbar(customToolbar) {
			customToolbar = customToolbar;
		},

		/**
		 * 是否子表单内嵌的组件
		 * @returns {boolean}
		 */
		isSubFormItem() {
			return !!parentWidget ? parentWidget.type === "sub-form" : false;
		},

		/**
		 * 动态增加自定义css样式
		 * @param className
		 */
		addCssClass(className) {
			if (!field.options.customClass) {
				field.options.customClass = [className];
			} else {
				field.options.customClass.push(className);
			}
		},

		/**
		 * 动态移除自定义css样式
		 * @param className
		 */
		removeCssClass(className) {
			if (!field.options.customClass) {
				return;
			}

			let foundIdx = -1;
			field.options.customClass.map((cc, idx) => {
				if (cc === className) {
					foundIdx = idx;
				}
			});
			if (foundIdx > -1) {
				field.options.customClass.splice(foundIdx, 1);
			}
		},
	};

	return {
		...computeds,
		...methods,
	};
}
