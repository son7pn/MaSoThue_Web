module.exports = {
  apps: [
    {
      name: 'qlgd_ee_live',
      script: './node_modules/nuxt/bin/nuxt-start',
      env: {
        HOST: '0.0.0.0',
        PORT: 5007,
        NODE_ENV: 'production'
      }
    }
  ]
}
