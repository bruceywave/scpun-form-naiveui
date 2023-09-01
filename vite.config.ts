import moment from "moment";
import { ConfigEnv, UserConfig, loadEnv } from "vite";

import { resolve } from "path";
import { wrapperEnv } from "./build/utils";

import { useThemeVars } from "naive-ui";
import { OUTPUT_DIR } from './build/constant';
import { createVitePlugins } from "./build/vite/plugin";
import { createProxy } from './build/vite/proxy';
import pkg from "./package.json";

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, name, version },
	lastBuildTime: moment().format("yyyy-MM-dd HH:mm:ss"),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);
	const { VITE_PUBLIC_PATH, VITE_PORT, VITE_DROP_CONSOLE, VITE_PROXY } = viteEnv;

	const isBuild = command === "build";

	return {
		base: VITE_PUBLIC_PATH,
		root,
		resolve: {
			alias: {
				root: resolve(__dirname, "./"),
				"/@": resolve(__dirname, "src"),
				"/#": resolve(__dirname, "types"),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
			},
		},
		plugins: createVitePlugins(viteEnv, isBuild),
		server: {
			// Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
		},
		esbuild: {
			pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
		},
    build: {
      target: 'es2020',
      cssTarget: 'chrome95',
      outDir: OUTPUT_DIR,
      sourcemap: false,
      manifest: true,
      chunkSizeWarningLimit: 2000,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'FormDesigner',
        fileName: 'form-designer'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
        input: {
          main: resolve(__dirname, 'example/index.html'),
        }
      }
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: useThemeVars(),
          javascriptEnabled: true,
        }
      }
    },
    optimizeDeps: {
      include: []
    }
	};
};
