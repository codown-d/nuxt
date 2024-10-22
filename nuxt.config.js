const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [{
      src: '/support-three.js', type: 'text/javascript'
    },{
      src: '/stats.min.js', type: 'text/javascript'
    }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '~/plugins/axios',
    {src: '~plugins/lodash.js', ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://127.0.0.1:3000',
    browserBaseURL: 'http://127.0.0.1:3000',
    progress: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, {isDev, isClient}) {
      config.performance.hints=process.env.NODE_ENV === 'production' ? false : 'warning'
      config.output.publicPath= './_nuxt/'
      // config.output.publicPath= 'https://callmezhang.github.io/'
      console.log(isDev, isClient)
      if (isDev && isClient) {
        // config.module.rules.push({
        //   test: /\.gltf$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {name: '[path][name].[ext]'}
        //     }
        //   ]
        // })
      }
    }
  }
}
