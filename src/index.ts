import { App } from 'vue';
import NaiveDesignForm from './layouts/naiveui/FormDesigner.vue';
import 'virtual:svg-icons-register';

import SFormDesigner from '/@/components/designer/index.vue'

SFormDesigner.install = (app: App) => {
    app.component(SFormDesigner.name, SFormDesigner)
}


NaiveDesignForm.install = (app: App) => {
  app.component(NaiveDesignForm.name, NaiveDesignForm)
}

const components = [
  NaiveDesignForm,
  SFormDesigner
]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export {
  NaiveDesignForm, SFormDesigner, install
};

export default {
  install,
  NaiveDesignForm,
  SFormDesigner,
}