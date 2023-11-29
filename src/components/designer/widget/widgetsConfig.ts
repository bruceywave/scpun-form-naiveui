export interface BaseConfig {
	id?: string;
	type: string;
	icon: string;
	options: Object;
}

export interface FieldConfig extends BaseConfig {
	formItemFlag: boolean;
}

export interface ContainerConfig extends BaseConfig {
	internal: boolean;
	category: string;
}

export interface GridWidgetConfig extends ContainerConfig {
	cols: WidgetConfig[];
}

export interface TableWidgetConfig extends ContainerConfig {
	rows: WidgetConfig[];
}

export interface TabsWidgetConfig extends ContainerConfig {
	tabs: WidgetConfig[];
	displayType: string;
}

export interface WidgetListConfig extends ContainerConfig {
	widgetList: [];
}

export interface TableCellWidgetListConfig extends WidgetListConfig {
	merged: boolean;
}

export type WidgetConfig =
	| BaseConfig
	| ContainerConfig
	| GridWidgetConfig
	| TableWidgetConfig
	| TabsWidgetConfig
	| WidgetListConfig
	| TableCellWidgetListConfig;

/** 公共字段属性配置，也就是配置FormItem的属性 */
export const commonFieldOptions = {
	name: "",
	label: undefined, //标签信息
	first: false, //是否只展示首个出错信息
	labelAlign: undefined, // 标签对齐方式
	lablePlacement: undefined, //标签位置
	labelWidth: undefined, //标签宽度
	showLabel: true,
	showFeedback: true,
	showRequireMask: true,
	requireMarkPlacement: "right",
	size: "medium",
	required: false,
	requiredHint: "",
	hidden: false,
};
export const containers: WidgetConfig[] = [
	{
		type: "grid",
		category: "container",
		icon: "grid",
		cols: [],
		options: {
			name: "",
			hidden: false,
			gutter: 12,
			colHeight: null, //栅格列统一高度属性，用于解决栅格列设置响应式布局浮动后被挂住的问题！！
			customClass: "", //自定义css类名
		},
	},

	{
		type: "table",
		category: "container",
		icon: "table",
		rows: [],
		options: {
			name: "",
			hidden: false,
			customClass: "", //自定义css类名
		},
	},

	{
		type: "tab",
		category: "container",
		icon: "tab",
		displayType: "border-card",
		tabs: [],
		options: {
			name: "",
			hidden: false,
			customClass: "", //自定义css类名
		},
	},

	{
		type: "grid-col",
		category: "container",
		icon: "grid-col",
		internal: true,
		widgetList: [],
		options: {
			name: "",
			hidden: false,
			span: 12,
			offset: 0,
			push: 0,
			pull: 0,
			customClass: "", //自定义css类名
		},
	},

	{
		type: "table-cell",
		category: "container",
		icon: "table-cell",
		internal: true,
		widgetList: [],
		merged: false,
		options: {
			name: "",
			cellWidth: "",
			cellHeight: "",
			colspan: 1,
			rowspan: 1,
			wordBreak: false, //是否自动换行
			customClass: "", //自定义css类名
		},
	},

	{
		type: "tab-pane",
		category: "container",
		icon: "tab-pane",
		internal: true,
		widgetList: [],
		options: {
			name: "",
			label: "",
			hidden: false,
			active: false,
			disabled: false,
			customClass: "", //自定义css类名
		},
	},
];

export const basicFields: FieldConfig[] = [
	{
		type: "input",
		icon: "input",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "文本框",
			clearable: true,
			defaultValue: "",
			readonly: false,
			disabled: false,
			placeholder: "请输入",
			showCount: false,
			maxlength: undefined,
			minlength: undefined,
            onCreated: '',
            onMounted: '',
            onInput: '',
            onChange: '',
            onFocus: '',
            onBlur: '',
            onValidate: '',
            onAppendButtonClick: '',
        },
	},
	{
		type: "textarea",
		icon: "textarea",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "文本域",
			clearable: true,
			defaultValue: "",
			readonly: false,
			disabled: false,
			placeholder: "请输入",
			showCount: false,
			rows: 3,
			maxlength: undefined,
			minlength: undefined,
            onCreated: '',
            onMounted: '',
            onInput: '',
            onChange: '',
            onFocus: '',
            onBlur: '',
            onValidate: '',
            onAppendButtonClick: '',
		},
	},
	{
		type: "number",
		icon: "number",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "计数器",
			disabled: false,
			size: "medium",
			clearable: true,
			placeholder: "请输入",
			showButton: true,
			buttonPlacement: "right",
			step: 1,
			min: undefined,
			max: undefined,
			precision: undefined,
		},
	},
	{
		type: "radio",
		icon: "radio",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "单选",
			defaultValue: "",
			buttonStyle: true,
			disabled: false,
			size: "medium",
			optionItems: [
				{ label: "radio 1", value: 1 },
				{ label: "radio 2", value: 2 },
				{ label: "radio 3", value: 3 },
			],
		},
	},
	{
		type: "checkbox",
		icon: "checkbox",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "多选",
			defaultValue: "",
			disabled: false,
			min: undefined,
			max: undefined,
			checkedValue: undefined,
			uncheckedValue: undefined,
			optionItems: [
				{ label: "check 1", value: 1 },
				{ label: "check 2", value: 2 },
				{ label: "check 3", value: 3 },
			],
		},
	},
	{
		type: "select",
		icon: "select",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "下拉选项",
			filterable: false,
			remote: false,
			multiple: false,
			maxTagCount: undefined,
			childrenField: "children",
			labelField: "label",
			valueField: "value",
			optionItems: [
				{ label: "select 1", value: 1 },
				{ label: "select 2", value: 2 },
				{ label: "select 3", value: 3 },
			],
			show: false, // 是否展示菜单
			showArrow: true, //是否展示箭头
			showCheckmark: true, //是否展示对勾
		},
	},
	{
		type: "time",
		icon: "time",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "时间",
			format: "HH:mm:ss",
			hours: undefined,
			minutes: undefined,
			seconds: undefined,
			readonly: false,
			use12Hours: false,
			timeZone: undefined,
			actions: ["now", "confirm"],
		},
	},
	{
		type: "time-range",
		icon: "time-range",
		formItemFlag: true,
		options: {},
	},
	{
		type: "date",
		icon: "date",
		formItemFlag: true,
		options: {},
	},
	{
		type: "date-range",
		icon: "date-range",
		formItemFlag: true,
		options: {},
	},
	{
		type: "switch",
		icon: "switch",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "开关",
			checkedValue: true,
			uncheckedValue: false,
			defaultValue: false,
			disabled: false,
			round: true,
			rubberBand: true,
		},
	},
	{
		type: "rate",
		icon: "rate",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			lable: "评分",
			allowHalf: false,
			clearable: false,
			color: undefined,
			count: 5,
			defaultValue: null,
			readonly: false,
		},
	},
	{
		type: "color",
		icon: "color",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			defaultShow: undefined,
			defaultValue: undefined,
			modes: ["rgb", "hex", "hsl"],
			placement: "bottom-start",
			show: false,
			showAlpha: true,
			showPreview: false,
			disabled: false,
			swatches: undefined,
			actions: null,
		},
	},
	{
		type: "slider",
		icon: "slider",
		formItemFlag: true,
		options: {
			...commonFieldOptions,
			label: "滑动选择",
			defaultValue: null,
			disabled: false,
			keyboard: true,
			marks: undefined,
			max: 100,
			min: 0,
			placement: undefined,
			range: false,
			reverse: false,
			showTooltip: false,
			step: 1,
			tooltip: true,
			vertical: false,
		},
	},
	{
		type: "static-text",
		icon: "static-text",
		formItemFlag: true,
		options: {},
	},
	{
		type: "html-text",
		icon: "html-text",
		formItemFlag: true,
		options: {},
	},
	{
		type: "button",
		icon: "button",
		formItemFlag: true,
		options: {
			name: "",
			label: "按钮", //标签信息
			hidden: false,
			attrType: "button", //'button' | 'submit' | 'reset'
			block: false,
			bordered: true,
			circle: false,
			color: undefined,
			dashed: false,
			disabled: false,
			focusable: true,
			ghost: false, //是否透明
			iconPlacement: "left",
			keyboard: true,
			quaternary: false,
			round: false,
			size: "medium",
			secondary: false,
			strong: false,
			tertiary: false,
			text: false,
			textColor: undefined,
			type: "default",
		},
	},
	{
		type: "divider",
		icon: "divider",
		formItemFlag: true,
		options: {
			name: "",
			label: "分割线", //标签信息
			hidden: false,
			dashed: false,
			titlePlacement: "center",
			vertical: false,
		},
	},
];

export const advancedFields: FieldConfig[] = [
	{
		type: "picture-upload",
		icon: "picture-upload",
		formItemFlag: true,
		options: {},
	},
	{
		type: "file-upload",
		icon: "file-upload",
		formItemFlag: true,
		options: {},
	},
	{
		type: "rich-editor",
		icon: "rich-editor",
		formItemFlag: true,
		options: {},
	},
	{
		type: "cascader",
		icon: "cascader",
		formItemFlag: true,
		options: {},
	},
];

export const customFields: any[] = [];

export function addContainerWidgetSchema(containerSchema) {
	containers.push(containerSchema);
}

export function addBasicFieldSchema(fieldSchema) {
	basicFields.push(fieldSchema);
}

export function addAdvancedFieldSchema(fieldSchema) {
	advancedFields.push(fieldSchema);
}

export function addCustomWidgetSchema(widgetSchema) {
	customFields.push(widgetSchema);
}
