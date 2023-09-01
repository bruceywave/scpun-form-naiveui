import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from "path";

export function createSvgIconPlugin() {
  return createSvgIconsPlugin({
   // 指定需要缓存的图标文件夹
   iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
   // 指定symbolId格式 icon-[dir]-[name]
   symbolId: 'icon-[name]'
  })
}
