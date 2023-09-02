export interface Rules {
	trigger: string;
	enum: string;
	len?: number;
	max?: number;
	message: string;
	min?: number;
	pattern: string;
	required: boolean;
	type: string;
}

export interface WidgetForm {
	list: any[];
	config: {
		size: string;
		hideRequiredMark: boolean;
    inline: boolean;
		labelAlign: string;
    lableWidth: string | number | undefined;
    lablePlacement: string;
    showLabel: boolean;
	};
}

export const rules: Rules = {
	trigger: "blur",
	enum: "",
	len: undefined,
	max: undefined,
	message: "",
	min: undefined,
	pattern: "",
	required: false,
	type: "any",
};
