<template>
  <div id="translationField">
    <label :for="`${name}-title`">{{ label }}</label>
      <input :id="`${name}-title`" type="text" v-model="formData.translations[lang].title" :required="required">
      <label :for="`${name}-message`">{{ messageLabel }}</label>
      <textarea :id="`${name}-message`" type="text" v-model="formData.translations[lang].message" cols="10" rows="2" :required="required"></textarea>
  </div>
</template>

<script>
export default {
  name: 'TranslationField',
  props: {
    label: String,
    messageLabel: String,
    required: Boolean,
    lang: {
      type: String,
      required: true,
      validator: (value) => ['nl', 'en', 'fr'].includes(value)
    },
    name: {
      type: String,
      required: true
    },
    formData: {
      type: Object,
      required: true
    },
    value:  {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>


</style>
