// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $development: {
    devtools: { enabled: true },
  },

  ssr: false,

  runtimeConfig: {
    apiBaseUrl: process.env.MICROCMS_API_BASE_URL,
    apiKey: process.env.MICROCMS_API_KEY,

    public: {
      siteTitle: process.env.PUBLIC_SITE_TITLE,
    },
  },

  css: ["~/assets/scss/main.scss"],

  modules: [
    "@nuxtjs/eslint-module",
    "@nuxt/ui",
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        display: "swap",
        families: { "Noto Sans JP": [400, 700] },
        preload: true,
      },
    ],
    [
      "dayjs-nuxt",
      {
        defaultLocale: "ja",
        defaultTimezone: "Asia/Tokyo",
        plugins: [
          "isBetween",
          "isLeapYear",
          "isSameOrAfter",
          "isSameOrBefore",
          "isToday",
          "isTomorrow",
          "isYesterday",
          "timezone",
          "utc",
        ],
      },
    ],
  ],

  typescript: {
    shim: false,
    strict: true,
    typeCheck: true, // 開発時も型チェックを実行する
    // typeCheck: false, // 型チェックは `pnpm run typecheck` を (用意して) 実行する
  },

  nitro: {
    preset: "netlify_edge",
  },
});
