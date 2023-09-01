import { App } from 'vue';
import NaiveDesignForm from './layouts/naiveui/FormDesigner.vue';
import 'virtual:svg-icons-register';


NaiveDesignForm.install = (app: App) => {
  app.component(NaiveDesignForm.name, NaiveDesignForm)
}

const components = [
  NaiveDesignForm,
]

const install = (app: App) => {
  components.forEach(component => app.component(component.name, component))
}

export {
  NaiveDesignForm, install
};

export default {
  install,
  NaiveDesignForm,
}