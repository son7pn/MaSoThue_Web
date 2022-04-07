/* eslint-disable prefer-regex-literals */
export const getLanguage = (cname) => {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const isVideo = (link) => {
  if (!link) {
    return null
  }
  const regexCheckVideo = new RegExp('^.*.(webm|mp4|m4p|m4v|flv|mkv|vob|ogv|ogg|drc|avi|mpg|mpeg|mpe|mpv|mov)$')
  return link.match(regexCheckVideo)
}
export const isPdf = (link) => {
  if (!link) {
    return
  }
  const regexCheckPdf = new RegExp('^.*.(pdf|PDF)$')
  return link.match(regexCheckPdf)
}
export const isWord = (link) => {
  if (!link) {
    return
  }
  const regexCheckDoc = new RegExp('^.*.(doc|docx|DOC|DOCX)$')
  return link.match(regexCheckDoc)
}
export const isPowerpoint = (link) => {
  if (!link) {
    return
  }
  const regexCheckPpt = new RegExp('^.*.(ppt|pptx|PPT|PPTX)$')
  return link.match(regexCheckPpt)
}
export const isExcel = (link) => {
  if (!link) {
    return
  }
  const regexCheckExcel = new RegExp('^.*.(xls|xlsx|XLS|XLSX)$')
  return link.match(regexCheckExcel)
}
export const isAudio = (link) => {
  if (!link) {
    return
  }
  const regexCheckAudio = new RegExp('^.*.(mp3|MP3|ogg|OGG|WAV|wav)$')
  return link.match(regexCheckAudio)
}
export const isImage = (link) => {
  if (!link) {
    return
  }
  const regexCheckImg = new RegExp('^.*.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|jfif)$')
  return link.match(regexCheckImg)
}
export const isDocument = (link) => {
  return link && (isWord(link) || isPdf(link) || isPowerpoint(link) || isExcel(link))
}

export const isZip = (link) => {
  if (!link) {
    return
  }
  const regexCheckZip = new RegExp('^.*.(zip|rar)$')
  return link.match(regexCheckZip)
}

export const chunkFileUpload = (targetFile, sizeChunk = 16) => {
  const fileChunk = []
  // the file object itself that we will work with
  // var file = targetFile;
  // set up other initial vars
  const maxFileSizeMB = sizeChunk
  const bufferChunkSize = maxFileSizeMB * (1024 * 1024)
  const readBufferSize = 1024
  let fileStreamPos = 0
  // set the initial chunk length
  let endPos = bufferChunkSize
  const size = targetFile.size

  // add to the fileChunk array until we get to the end of the file
  while (fileStreamPos < size) {
    // "slice" the file from the starting position/offset, to  the required length
    fileChunk.push(targetFile.slice(fileStreamPos, endPos))
    fileStreamPos = endPos // jump by the amount read
    endPos = fileStreamPos + readBufferSize // set next chunk length
  }
  return fileChunk
}

export const removeKeyEmptyObj = (obj) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    }
  }
  return obj
}
export const convertColorHexToRGBA = (colorHex, opacity = 1) => {
  const color = colorHex.replace('#', '')
  const aRgbHex = color.match(/.{1,2}/g)
  return `rgba(${parseInt(aRgbHex[0], 16)}, ${parseInt(aRgbHex[1], 16)}, ${parseInt(aRgbHex[2], 16)}, ${opacity})`
}
export const TYPE_USER_STUDENT = 1
export const isUserStudent = (userType) => {
  return userType === TYPE_USER_STUDENT
}
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}
export const scrollTo = (element, to, duration) => {
  const start = element.scrollTop
  const change = to - start
  const increment = 20
  let currentTime = 0

  const animateScroll = () => {
    currentTime += increment
    // const val = Math.easeInOutQuad(currentTime, start, change, duration)
    const val = easeInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}

/*
  * Function support detect meta tag display preview
  * @ data String html
  * @ result Array permarlink
*/
export const getPermalinkOnContent = (data) => {
  if (!data) {
    return
  }

  const regex = /http[s]?:\/\/(www\.)?(.*)?\/?(.)*/ig
  let link
  const result = []
  while ((link = regex.exec(data)) !== null) {
    result.push(link[2])
  }
  // console.log('hahaha', result)
  return result
}

/**
 * Highlight text dont render html tag
 * @param {*} content: String<HTML>
 * @param {*} keyword: String
 * @returns: String
 */
export const replaceContentHighLight = (content, keyword) => {
  if (!keyword) {
    return content
  }
  // Remove all tag html
  const contentLowercase = content.toLowerCase().replace(/(<([^>]+)>)/ig, '')
  return contentLowercase.replaceAll(keyword, `<span class="highlight">${keyword}</span>`)
}

export const makeId = (length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const isEmptyData = (data) => {
  if (data && Array.isArray(data) && data.length > 0) {
    return false
  } else if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    return false
  } else if (data && typeof data === 'string' && data.length > 0) {
    return false
  } else if (data) {
    return false
  }
  return true
}
