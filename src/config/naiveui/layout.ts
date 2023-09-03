// 布局组件
export const layoutComponents = [
	{
		label: "栅格布局",
		type: "grid",
		columns: [
			{
				span: 12,
				list: [],
                offset: 0
			},
			{
				span: 12,
				list: [],
                offset: 0
			},
		],
		options: {
            cols: 24,
            collapsed: false,
            collapsedRows: 1,
            responsive: 'self',
            itemResponsive: false,
			xGap: 0,
            yGap: 0,
		},
	},
];
