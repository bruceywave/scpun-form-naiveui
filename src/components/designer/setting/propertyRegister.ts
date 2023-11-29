/**
 * 属性编辑器注册 属性名称: 对应属性编辑器的名称
 */
const COMMON_PROPERTIES = {
	name: "NameEditor",
	label: "LabelEditor",
	labelAlign: "LabelAlignEditor",
	lablePlacement: "LabelAlignPlacement",
	defaultValue: "DefaultValueEditor",
	placeholder: "PlaceholderEditor",
	disabled: "DisabledEditor",
	clearable: "ClearableEditor",
	size: "SizeEditor",
	readonly: "ReadonlyEditor",
	hidden: "HiddenEditor",
    required: 'RequiredEditor',
    requiredHint: 'RequiredHintEditor',

	customClass: "CustomClassEditor",

	//容器
	showBlankRow: "showBlankRow-editor",
	showRowNumber: "showRowNumber-editor",
	cellWidth: "CellWidthEditor",
	cellHeight: "CellHeightEditor",
	colHeight: "ColHeightEditor",
	wordBreak: "CellWordBreakEditor",
	gutter: "GutterEditor",
	span: "SpanEditor",
	offset: "OffsetRditor",
	push: "PushEditor",
	pull: "PullEditor",
};

const ADVANCED_PROPERTIES = {
	maxlength: "MaxlengthEditor",
	minlength: "MinlengthEditor",
	min: "MinEditor",
	max: "MaxEditor",
	step: "StepEditor",
	precision: "PrecisionEditor",
	buttonPlacement: "ButtonPlacementEditor",
    showCount: "ShowCountEditor",
};

const EVENT_PROPERTIES = {
    onCreated: 'OnCreatedEditor',
    onMounted: 'OnMountedEditor',
    onClick: 'OnClickEditor',
    onInput: 'OnInputEditor',
    onChange: 'OnChangeEditor',
    onFocus: 'OnFocusEditor',
    onBlur: 'OnBlurEditor',
    onValidate: 'OnValidateEditor',
    onAppendButtonClick: ''
};

/**
 * 注册组件常见属性
 * 如属性编辑器的组件名称propEditorName设置为null，则不显示该属性编辑器！！
 * @param uniquePropName 属性名称（保证名称唯一，不跟其他组件属性冲突）
 * @param propEditorName 对应属性编辑器的组件名称
 */
export function registerCommonProperty(uniquePropName, propEditorName) {
	COMMON_PROPERTIES[uniquePropName] = propEditorName;
}

/**
 * 注册组件高级属性
 * 如属性编辑器的组件名称propEditorName设置为null，则不显示该属性编辑器！！
 * @param uniquePropName 属性名称（保证名称唯一，不跟其他组件属性冲突）
 * @param propEditorName 对应属性编辑器的组件名称
 */
export function registerAdvancedProperty(uniquePropName, propEditorName) {
	ADVANCED_PROPERTIES[uniquePropName] = propEditorName;
}

/**
 * 注册组件事件属性
 * 如属性编辑器的组件名称propEditorName设置为null，则不显示该属性编辑器！！
 * @param uniquePropName 属性名称（保证名称唯一，不跟其他组件属性冲突）
 * @param propEditorName 对应属性编辑器的组件名称
 */
export function registerEventProperty(uniquePropName, propEditorName) {
	EVENT_PROPERTIES[uniquePropName] = propEditorName;
}

/**
 * 判断属性是否已注册
 * @param uniquePropName 属性名称（保证名称唯一，不跟其他组件属性冲突）
 */
export function propertyRegistered(uniquePropName) {
	return (
		!!COMMON_PROPERTIES[uniquePropName] ||
		!!ADVANCED_PROPERTIES[uniquePropName] ||
		!!EVENT_PROPERTIES[uniquePropName]
	);
}

/**
 * 注册常见属性对应的属性编辑器
 * @param app
 * @param uniquePropName
 * @param propEditorName
 * @param editorComponent
 */
export function registerCPEditor(
	app,
	uniquePropName,
	propEditorName,
	editorComponent
) {
	app.component(propEditorName, editorComponent);
	registerCommonProperty(uniquePropName, propEditorName);
}

/**
 * 注册高级属性对应的属性编辑器
 * @param app
 * @param uniquePropName
 * @param propEditorName
 * @param editorComponent
 */
export function registerAPEditor(
	app,
	uniquePropName,
	propEditorName,
	editorComponent
) {
	app.component(propEditorName, editorComponent);
	registerAdvancedProperty(uniquePropName, propEditorName);
}

/**
 * 注册事件属性对应的属性编辑器
 * @param app
 * @param uniquePropName
 * @param propEditorName
 * @param editorComponent
 */
export function registerEPEditor(
	app,
	uniquePropName,
	propEditorName,
	editorComponent
) {
	app.component(propEditorName, editorComponent);
	registerEventProperty(uniquePropName, propEditorName);
}

export default {
	COMMON_PROPERTIES,
	ADVANCED_PROPERTIES,
	EVENT_PROPERTIES,
};
