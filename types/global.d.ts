import type {
	ComponentRenderProxy,
	VNode,
	VNodeChild,
	ComponentPublicInstance,
	FunctionalComponent,
} from "vue";

import type { LoadingBarProviderInst } from 'naive-ui';

declare global {
	const __APP_INFO__: {
		pkg: {
			name: string;
			version: string;
			dependencies: Recordable<string>;
			devDependencies: Recordable<string>;
		};
		lastBuildTime: string;
	};

  // vue
  declare type VueNode = VNodeChild | JSX.Element;

	declare interface Window {
		$loadingBar: LoadingBarProviderInst;
	}

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NullUndefable<T> = T | null | undefined;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  declare interface WheelEvent {
    path?: EventTarget[];
  }

  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

	declare interface ViteEnv {
		VITE_PORT: number;
		VITE_PUBLIC_PATH: string;
		VITE_PROXY: [string, string][];
		VITE_GLOB_APP_TITLE: string;
		VITE_GLOB_APP_SHORT_NAME: string;
    VITE_DROP_CONSOLE: boolean;
	}
}

declare module "vue" {
	export type JSXComponent<Props = any> =
		| { new (): ComponentPublicInstance<Props> }
		| FunctionalComponent<Props>;
}
