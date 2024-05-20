<script setup>
import { ref, watch } from 'vue'

// Prop recibida por el componente
const props = defineProps({
  RFC: String
})

// Variables reactivas
const inputValue = ref(props.RFC || '')
const isValid = ref(true)
const rfcType = ref('')

// Función para validar el RFC
function validateRFC() {
  const rfcPhysicalPattern = /^[A-ZÑ&]{4}\d{6}[A-Z\d]{3}$/i
  const rfcMoralPattern = /^[A-ZÑ&]{3}\d{6}[A-Z\d]{3}$/i

  if (rfcPhysicalPattern.test(inputValue.value)) {
    rfcType.value = 'Physical'
    isValid.value = true
  } else if (rfcMoralPattern.test(inputValue.value)) {
    rfcType.value = 'Moral'
    isValid.value = true
  } else {
    isValid.value = false
    rfcType.value = ''
  }
  console.log(isValid.value, rfcType.value)
}

// Observador para cambiar el estado de validez cuando el valor del RFC cambia
watch(
  () => props.RFC,
  (newValue) => {
    inputValue.value = newValue
    validateRFC()
  }
)

watch(inputValue, validateRFC)
</script>

<style scoped>
.invalid {
  color: red;
}
</style>

<template>
  <div>
    <input v-model="inputValue" @input="validateRFC" placeholder="Enter RFC" />
    <p class="invalid" v-if="!isValid">RFC NO</p>
  </div>
</template>
