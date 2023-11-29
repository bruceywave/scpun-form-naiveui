<template>
    <n-form-item label="onChange" label-width="150">
        <n-button type="default" ghost>
            <template #icon>
                <n-icon>
                    <EditOutlined />
                </n-icon>
            </template>
            {{t('designer.setting.addEventHandler')}}
        </n-button>
    </n-form-item>
</template>

<script lang="ts">
import { EditOutlined } from "@vicons/antd";
import { useI18n } from "/@/locale/useI18n";

export default defineComponent({
    name: "OnChangeEditor",
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
    setup() {
        const { t } = useI18n();
        return {
            t,
        };
    },
    components: { EditOutlined }
})
</script>
  
<style scoped></style>