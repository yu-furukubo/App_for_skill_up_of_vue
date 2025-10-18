export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,            // ← これがユニバーサル（デフォルトtrue）
  future: { typescriptBundlerResolution: true }
})