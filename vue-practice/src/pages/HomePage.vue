<template>
  <div>
    <h1>Home</h1>
    <p>Todoアプリ（仮）へようこそ</p>
  </div>

  <div>
    <h4>現在の気温・風速（和歌山市）</h4>
    <div v-if="loading">読み込み中…</div>
    <div v-else-if="error">エラー: {{ error }}</div>
    <div v-else-if="weather">
      <p>気温: {{ weather.temperature }}°C</p>
      <p>風速: {{ weather.windspeed }} m/s</p>
      <button @click="refresh">再取得</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeather } from '@/composables/useWeather'

const { data: weather, error, loading, refresh } = useWeather(34.23, 135.17)

</script>