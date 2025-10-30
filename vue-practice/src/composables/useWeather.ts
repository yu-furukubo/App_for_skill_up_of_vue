import { ref } from 'vue'

export function useWeather(latitude: number, longitude: number) {
  const data = ref<any>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  async function fetchWeather() {
    loading.value = true
    error.value = null
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const json = await res.json()
      data.value = json.current_weather
    } catch (e: any) {
      error.value = e.message || 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  fetchWeather()

  return {
    data,
    error,
    loading,
    refresh: fetchWeather
  }
}