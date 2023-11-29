<template>
    <div class="scpun-designer-form-prop ">
        <n-form :model="formConfig" size="small" :show-feedback="false" label-placement="left" :label-width="100" label-align="left" class="setting-form" @submit.prevent>
            <n-collapse arrow-placement="right" :default-expanded-names="expandedPanels">
                <n-collapse-item name="1" :title="t('designer.setting.basicSetting')">
                    <n-form-item :label="t('designer.setting.inline')">
                        <n-radio-group v-model:value="formConfig.inline">
                            <n-radio-button :value="true">
                                是
                            </n-radio-button>
                            <n-radio-button :value="false">
                                否
                            </n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.formSize')">
                        <n-select v-model:value="formConfig.size" :options="formSizeOptions" placeholder="请选择组件尺寸" />
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.labelPosition')">
                        <n-radio-group v-model:value="formConfig.labelPlacement">
                            <n-radio-button value="top">
                                顶部
                            </n-radio-button>
                            <n-radio-button value="left">
                                左边
                            </n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.labelAlign')">
                        <n-radio-group v-model:value="formConfig.labelAlign">
                            <n-radio-button value="left">
                                左边
                            </n-radio-button>
                            <n-radio-button value="right">
                                右边
                            </n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.showLabel')">
                        <n-radio-group v-model:value="formConfig.showLabel">
                            <n-radio-button :value="true">
                                显示
                            </n-radio-button>
                            <n-radio-button :value="false">
                                隐藏
                            </n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.showFeedback')">
                        <n-radio-group v-model:value="formConfig.showFeedback">
                            <n-radio-button :value="true">
                                显示
                            </n-radio-button>
                            <n-radio-button :value="false">
                                隐藏
                            </n-radio-button>
                        </n-radio-group>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.showRequireMark')">
                        <n-radio-group v-model:value="formConfig.showRequireMark">
                            <n-radio-button :value="true">
                                显示
                            </n-radio-button>
                            <n-radio-button :value="false">
                                隐藏
                            </n-radio-button>
                        </n-radio-group>
                    </n-form-item>

                    <n-form-item :label="t('designer.setting.labelWidth')">
                        <n-input-number v-model:value="formConfig.labelWidth" :min="0" placeholder="默认auto"/>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.formCss')">
                        <n-button type="default" ghost>
                            <template #icon>
                                <n-icon>
                                    <EditOutlined />
                                </n-icon>
                            </template>
                            {{t('designer.setting.addCss')}}
                        </n-button>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.globalFunctions')">
                        <n-button type="default" ghost>
                            <template #icon>
                                <n-icon>
                                    <EditOutlined />
                                </n-icon>
                            </template>
                            {{t('designer.setting.addEventHandler')}}
                        </n-button>
                    </n-form-item>
                    <n-form-item label-width="0">
                        <n-divider> {{ t('designer.setting.formSFCSetting') }} </n-divider>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.modelName')">
                        <n-input v-model:value="formConfig.modelName" :min="0" placeholder="请输入数据对象名称"/>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.formRefName')">
                        <n-input v-model:value="formConfig.refName" :min="0" placeholder="请输入引用名称"/>
                    </n-form-item>
                    <n-form-item :label="t('designer.setting.formRulesName')">
                        <n-input v-model:value="formConfig.rulesName" :min="0" placeholder="请输入验证规则名称"/>
                    </n-form-item>
                    
                </n-collapse-item>

                <n-collapse-item name="2" :title="t('designer.setting.eventSetting')">
                    <n-form-item label="onFormCreated" label-width="150">
                        <n-button type="default" ghost>
                            <template #icon>
                                <n-icon>
                                    <EditOutlined />
                                </n-icon>
                            </template>
                            {{t('designer.setting.addEventHandler')}}
                        </n-button>
                    </n-form-item>
                    <n-form-item label="onFormMounted" label-width="150">
                        <n-button type="default" ghost>
                            <template #icon>
                                <n-icon>
                                    <EditOutlined />
                                </n-icon>
                            </template>
                            {{t('designer.setting.addEventHandler')}}
                        </n-button>
                    </n-form-item>
                    <n-form-item label="onFormDataChange" label-width="150">
                        <n-button type="default" ghost>
                            <template #icon>
                                <n-icon>
                                    <EditOutlined />
                                </n-icon>
                            </template>
                            {{t('designer.setting.addEventHandler')}}
                        </n-button>
                    </n-form-item>
                </n-collapse-item>
            </n-collapse>
        </n-form>
    </div>
</template>

<script lang="ts">
import { useI18n } from '/@/locale/useI18n';
import {EditOutlined} from '@vicons/antd'


export default defineComponent({
    name: 'SFormPropertySetting',
    components: {
        EditOutlined
    },
    props: {
        designer: {
            type: Object,
            required: true
        },
        formConfig: {
            type: Object,
            required: true
        }
    },
    setup(_props, _context) {
        const {t} = useI18n()
        const data = reactive({
            expandedPanels: ['1', '2'],
            formSizeOptions: [
                {value: 'small', label: '小尺寸'},
                {value: 'medium', label: '中等尺寸'},
                {value: 'large', label: '大尺寸'}
            ]
        })

        const {print} = renderMixin.methods
       
        print()
        
        return {
            ...toRefs(data),
            t
        }
    }
})

const renderMixin = {
  methods: {
    print() {
        console.log(this)
    }
  }
}
</script>

<style lang="less" scoped>
.scpun-designer-form-prop {

  :deep(.n-tabs-rail) {
    border-bottom: 1px solid var(--n-border-color);
  }

  :deep(.n-form-item) {
		padding-bottom: 10px !important;
    }

    .n-divider:not(.n-divider--vertical) {
        margin: 0
    }

  :deep(.n-collapse-item) {
    margin: 0;

    .n-collapse-item__header {
      padding-top: 5px !important;
    }

    .n-collapse-item__header-main {
      justify-content: space-between;
      padding-left: 5px;
      padding-right: 5px;
      line-height: 30px;
      font-weight: 800 !important;
    }


    .n-collapse-item__content-inner {
      padding-top: 0 !important;
    }
  }

}
</style>