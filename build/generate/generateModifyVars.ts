import { useThemeVars } from 'naive-ui';

/**
 * less global variable
 */
export function generateModifyVars() {
  const themeVars = useThemeVars()
  return {
    // hack: `true;@import (reference) "${resolve('src/design/config.less')}";`,
    ...themeVars
  };
}
