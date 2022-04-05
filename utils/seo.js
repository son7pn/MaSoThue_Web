import { APP_CONFIG } from './env'

export const createSEOMeta = (title, description, image, url = '', type = 'article') => [
  {
    hid: 'robots',
    property: 'robots',
    content: 'index,follow,noodp'
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Liber'
  },
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'vi_VN'
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: type
  },
  {
    hid: 'fb:app_id',
    property: 'fb:app_id',
    content: APP_CONFIG.appIdFB
  },
  {
    hid: 'fb:pages',
    property: 'fb:pages',
    content: APP_CONFIG.fanPageId
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: title
  },
  {
    hid: 'description',
    name: 'description',
    content: description
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: description
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: APP_CONFIG.cdnImageUrl + image
  },
  {
    hid: 'og:image:width',
    property: 'og:image:width',
    content: '534'
  },
  {
    hid: 'og:image:height',
    property: 'og:image:height',
    content: '280'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: url || APP_CONFIG.baseUrl
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: title
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: description
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: image
  }
]
