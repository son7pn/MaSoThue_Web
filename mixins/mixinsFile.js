/* eslint-disable prefer-regex-literals */
import { isPdf, isWord, isPowerpoint, isAudio, isVideo, isExcel } from '@/helpers/functions'
import { APP_CONFIG } from '@/utils/env'
// const imgWord = require('@/assets/images/icon/document.svg')
// const imgPdf = require('@/assets/images/icon/pdf.svg')
// const imgPptx = require('@/assets/images/icon/powerpoint.svg')
// const imgAudio = require('@/assets/images/icon/audio.svg')
// const imgExcel = require('@/assets/images/icon/excel.svg')
// const imageDoc = require('@/assets/images/frontend/logo/logo-header.png')

export default {
  data () {
    return {
      timeOut: null
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeOut)
  },
  methods: {
    // renderImg (link) {
    //   if (isWord(link) || isPdf(link) || isPowerpoint(link) || isExcel(link)) {
    //     return imageDoc
    //   } else if (isAudio(link)) {
    //     return imgAudio
    //   } else if (isZip(link)) {
    //     return imgWord
    //   } else if (link) {
    //     return APP_CONFIG.cdnImageUrl + link
    //   }
    //   // if (isWord(link)) {
    //   //   return imageDoc
    //   // } else if (isPdf(link)) {
    //   //   return imageDoc
    //   // } else if (isPowerpoint(link)) {
    //   //   return imageDoc
    //   // } else if (isAudio(link)) {
    //   //   return imgAudio
    //   // } else if (isExcel(link)) {
    //   //   return imageDoc
    //   // } else if (link) {
    //   //   return APP_CONFIG.cdnImageUrl + link
    //   // }
    // },

    renderIconType (link) {
      if (isAudio(link)) {
        return 'icon-audio'
      } else if (isVideo(link)) {
        return 'icon-play'
      } else {
        return 'icon-image'
      }
    },

    renderDocPreview (pathView) {
      if (!pathView) {
        return
      }
      return `${APP_CONFIG.cdnDocMediumUrl}${pathView}-1.jpg`
    },

    isDocument (link) {
      return link && (isWord(link) || isPdf(link) || isPowerpoint(link) || isExcel(link))
    },

    isVideoType (link) {
      return link && isVideo(link)
    },

    isZip (link) {
      if (!link) {
        return
      }
      const regexCheckZip = new RegExp('^.*.(zip|ZIP)$')
      return link.match(regexCheckZip)
    },

    doesFileExist (urlToFile) {
      const xhr = new XMLHttpRequest()
      xhr.open('HEAD', urlToFile, false)
      xhr.send()
      // console.log('File exits: ', xhr.status)
      // return xhr.status === '404' ? false : true
    },

    copyToClipboard () {
      const copyText = document.getElementById('copy_clipboard')
      copyText.focus()
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      const successful = document.execCommand('copy')
      successful && this.$toast.success('Copy thành công!')
      !successful && this.$toast.eror('Copy thất bại!')
    },

    downloadDocs (link, name, isZip = false) {
      const self = this
      self.$nuxt.$loading.start()
      // link = link.replace('Uploads/', 'uploads/')
      self.$axios({
        url: isZip ? APP_CONFIG.apiUrl + link : APP_CONFIG.cdnImageUrl + link,
        method: 'GET',
        responseType: 'blob'
        // headers: {
        //   Authorization: `Bearer ${JWT.getAccessToken()}`
        // }
      }).then(async (response) => {
        const fileURL = await window.URL.createObjectURL(new Blob([response.data]))
        const fileLink = document.createElement('a')
        // console.log('nameL ', `[liber.edu.vn]_${name}`)
        fileLink.href = fileURL
        fileLink.setAttribute('download', `[masothue]_${name}`)
        document.body.appendChild(fileLink)

        fileLink.click()
      }).catch(() => self.$toast.error('File hiện tại không thể tải về!')).finally(() => { self.$nuxt.$loading.finish() })
    },

    async exportFileExams (response, name, typeExportFile, fileExtension) {
      // console.log('response: ', response)
      const fileURL = await window.URL.createObjectURL(new Blob([response.data], { type: typeExportFile }))
      const fileLink = document.createElement('a')

      fileLink.href = fileURL
      fileLink.setAttribute('download', name + fileExtension)
      document.body.appendChild(fileLink)

      fileLink.click()
    },

    // renderIconDoc (link, isExam = false) {
    //   if (isExam) {
    //     return require('@/assets/images/frontend/icon/icon-exam.png')
    //   } else if (this.isDocument(link)) {
    //     return require('@/assets/images/frontend/icon/icon-pdf.png')
    //   } else if (isVideo(link)) {
    //     return require('@/assets/images/frontend/icon/icon-video.png')
    //   }
    // },

    checkAspectImg (link) {
      const img = new Image()
      img.src = link
      // Because img await img created -> use settimout
      this.timeOut = setTimeout(async () => {
        const { naturalWidth, naturalHeight } = await img
        const aspect = await (naturalHeight / naturalWidth)
        // Aspect >= 1 img -> verticle
        return !aspect || aspect < 1
      }, 400)
    }
  }
}
