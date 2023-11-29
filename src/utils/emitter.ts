export const useEmitter = function (currentInstance, props) {
	const data = reactive({
		vfEvents: {},
		currentInstance: currentInstance,
	});

	const { widgetRefList, refList } = props;
	const methods = {
		emit$(eventName, data) {
			if (data.vfEvents[eventName]) {
				data.vfEvents[eventName].forEach((fn) => {
					fn(data);
				});
			}
		},
		on$(eventName, fn) {
			data.vfEvents[eventName] = data.vfEvents[eventName] || [];
			data.vfEvents[eventName].push(fn);
		},
		off$(eventName, fn) {
			if (data.vfEvents[eventName]) {
				if (fn === undefined || fn === null) {
					data.vfEvents[eventName].length = 0;
					return;
				}

				for (let i = 0; i < data.vfEvents[eventName].length; i++) {
					if (data.vfEvents[eventName][i] === fn) {
						data.vfEvents[eventName].splice(i, 1);
						break;
					}
				}
			}
		},
		dispatch: function dispatch(componentName, eventName, params) {
			let parent = currentInstance.parent || currentInstance.root;
			let name = parent.$options.componentName;

			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent;

				if (parent) {
					name = parent.$options.componentName;
				}
			}
			if (parent) {
				if (!!parent.emit$) {
					parent.emit$.call(parent, eventName, params);

					if (componentName === "VFormRender") {
						parent.$emit(eventName, ...params); //执行原生$emit，以便可以用@进行声明式事件处理！！
					}
				}
			}
		},
		broadcast: function broadcast(componentName, eventName, params) {
			/* Vue3移除了$children属性，_broadcast方法已不能使用！！ */
			//_broadcast.call(this, componentName, eventName, params);

			if (!!widgetRefList) {
				//FormRender只需遍历自身的widgetRefList属性
				Object.keys(widgetRefList).forEach((refName) => {
					let cmpName = widgetRefList[refName].$options.componentName;
					if (cmpName === componentName) {
						let foundRef = widgetRefList[refName];
						foundRef.emit$.call(foundRef, eventName, params);
					}
				});
			}

			if (!!refList) {
				//其他组件遍历inject的refList属性
				Object.keys(refList).forEach((refName) => {
					let cmpName = refList[refName].$options.componentName;
					if (cmpName === componentName) {
						let foundRef = refList[refName];
						foundRef.emit$.call(foundRef, eventName, params);
					}
				});
			}
		},
	};

	return {
		...methods,
	};
};
