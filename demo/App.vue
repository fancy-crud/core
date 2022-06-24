<template>
  <div>
    My Components
    <div>
      <vaguer-button v-model="model">
        Hello World
      </vaguer-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const model = ref('')

watch(model, () => console.log(model.value))
</script>
