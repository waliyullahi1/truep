import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormStore = defineStore('form', () => {
  const form = ref({
    fullname: '',
    email: '',
    phone: '',
    message: ''
  })

  const trademarkData = ref({
    markname: '',
    logo: false,
    slogan: false,
    slogan_name: '',
    business_name: '',
    business_industry: '',
    business_description: '',
    trademarkCategory: ''
  })

  const setFormData = (data) => {
    form.value = {
      ...form.value,
      ...data
    }
  }

  const setTrademarkData = (data) => {
    trademarkData.value = {
      ...trademarkData.value,
      ...data
    }
  }

  return { form, setFormData, trademarkData, setTrademarkData }
})
