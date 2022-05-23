module.exports = {
  apps: [
    {
      name: 'ma_so_thue_live',
      script: './node_modules/nuxt/bin/nuxt-start',
      env: {
        HOST: '0.0.0.0',
        PORT: 5010,
        NODE_ENV: 'production'
      }
    }
  ]
}
