// https://github.com/antfu/unocss
// see unocss.config.ts for config
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueMacros from 'unplugin-vue-macros/vite'
import type { Plugin, PluginOption } from 'vite'
import { splitVendorChunkPlugin } from 'vite'
import { configAutoImportPlugin } from './autoImport'
import { configComponentsPlugin } from './components'
import { configHtmlPlugin } from './html'
import { createSvgIconPlugin } from './svgicon'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[] | PluginOption[])[] = [
    vueMacros(), // must be before Vue plugin!
    vue({ reactivityTransform: true }),
    splitVendorChunkPlugin(),
    vueJsx(),
    configComponentsPlugin(),
    configAutoImportPlugin(),
    configHtmlPlugin(viteEnv, isBuild),
    createSvgIconPlugin()
  ]

  return vitePlugins
}
