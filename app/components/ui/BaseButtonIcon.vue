<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    :to="to"
    class="button-icon"
    :type="to ? undefined : 'button'"
    @click="handleClick"
  >
    <img :src="src" :alt="type" />
  </component>
</template>
<script setup lang="ts">
import createIcon from "@/assets/actions/create.svg";
import editIcon from "@/assets/actions/edit.svg";
import deleteIcon from "@/assets/actions/delete.svg";

const props = defineProps<{
  to?: string;
  type: "create" | "edit" | "delete";
}>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.to) {
    emit("click", event);
  }
};

const src = computed(() => {
  switch (props.type) {
    case "create":
      return createIcon;
    case "edit":
      return editIcon;
    case "delete":
      return deleteIcon;
    default:
      return "";
  }
});
</script>

<style scoped>
.button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
}

.button-icon img {
  width: 24px;
  height: 24px;
}
</style>
