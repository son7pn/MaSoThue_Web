<template>
  <div class="view-doc view-doc__footer position-abs full-width">
    <div class="view-doc__footer__wrap position-rel display-flex-center justify-content-between">
      <div class="view-doc__left display-flex-center">
        <div v-show="typeDocView === typeDocument" class="time color-light">
          Trang {{ page }}/{{ duration }}
        </div>
        <div v-show="typeDocView !== typeImg" id="progress" class="progress position-rel">
          <div class="progress__wrap">
            <input
              id="seek"
              ref="seek"
              type="range"
              class="range-time seek full-width position-abs opacity-0"
              title="duration"
              min="0"
              :max="duration"
              step="1"
              @change="changeCurrentTime"
            >
            <div id="seek-tooltip" ref="seek_tooltip" class="seek-tooltip font-size-14 border-rd-4">
              00:00
            </div>
            <div id="progress_bar" class="progress__bar border-rd-0 bg-color-audio-preview position-rel full-width border-rd-10">
              <div
                class="progress__active primary-bg-color border-rd-0 effect-transition-fast bg-color-light position-abs full-height border-rd-10"
                :style="{width: `${progressBar}%`}"
              >
                <div class="progress__active__shape position-rel full-box" />
              </div>
            </div>
          </div>
        </div>
        <div v-show="[typeAudio, typeVideo].includes(typeDocView)" class="time color-light">
          {{ durationCurr }}/{{ `${totalTime.minutes}:${totalTime.seconds}` }}
        </div>
      </div>
      <div class="view-doc__right display-flex-center justify-content-end" :class="{'type-video': [typeAudio, typeVideo].includes(typeDocView)}">
        <div v-if="typeDocView !== typeImg" class="setting position-rel color-light">
          <ViewDocActionIconSetting
            :type-doc="typeDocView"
            :is-doc="![typeAudio, typeVideo].includes(typeDocView)"
            @zoom="onZoomDoc"
            @changeTheme="onChangeTheme"
            @speedChange="onChangeSpeedMedia"
          />
        </div>
        <a href="javascript:;" class="fullscreen-button bg-transparent border-0" @click="onDownloadFile(dataSource)">
          <i class="icon-download color-light font-size-30" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
// import ClickOutside from 'vue-click-outside'
import ViewDocActionIconSetting from './ViewDocActionIconSetting'
import mixinsFile from '@/mixins/mixinsFile'
import { isAudio, isImage } from '@/helpers/functions'
// import { STORE_KEY } from '@/store/common/viewdoc/constants'

const TYPE_VIDEO = 'video'
const TYPE_DOC = 'doc'
const TYPE_AUDIO = 'audio'
const TYPE_IMG = 'img'

export default {
  name: 'ViewDocFooter',
  components: {
    ViewDocActionIconSetting
  },
  // directives: {
  //   ClickOutside
  // },
  mixins: [mixinsFile],
  props: {
    typeDisplay: {
      type: String,
      default: '' // video, audio, doc
    },
    dataSource: {
      type: Object,
      default: Object
    },
    page: {
      type: Number,
      default: Number
    },
    typeDoc: {
      type: String,
      default: ''
    },
    postId: {
      type: Number,
      default: 0
    },
    docId: {
      type: Number,
      default: 0
    },
    keyId: { // Support for don't display docCurr
      type: String,
      default: 'documentId'
    }
  },
  data () {
    return {
      duration: 0,
      volumn: 1,
      progressBar: 0,
      player: null,
      isPlay: false,
      totalTime: { minutes: '00', seconds: '00' },
      durationCurr: '00:00',
      video: null,
      typeAudio: TYPE_AUDIO,
      typeVideo: TYPE_VIDEO,
      typeDocument: TYPE_DOC,
      typeImg: TYPE_IMG,
      isOpenSliderRelate: false,
      scale: 1,
      zoomList: [
        { value: 0.5, name: '50%' },
        { value: 0.75, name: '75%' },
        { value: 1, name: '100%' },
        { value: 1.25, name: '125%' },
        { value: 1.5, name: '150%' },
        { value: 2, name: '200%' }
      ],
      isOpenViewZoom: false
    }
  },
  computed: {
    // ...mapState(STORE_KEY, ['docViewerList', 'docViewerData', 'isViewRelateFiles']),
    videoControls () {
      return document.getElementById('progress')
    },
    playButton () {
      return document.getElementById('play')
    },
    playbackIcons () {
      return document.querySelectorAll('.playback-icons use')
    },

    // progressBarTime () {
    //   // return this.$refs.progressbar
    //   return document.getElementById('progress-bar')
    // },
    seek () {
      // return this.$refs.seek
      return document.getElementById('seek')
    },
    seekTooltip () {
      // return this.$refs.seek_tooltip
      return document.getElementById('seek-tooltip')
    },
    volume () {
      // return this.$refs.volume
      return document.getElementById('volume')
    },
    timeElapsed () {
      // return this.$refs.time_elapsed
      return document.getElementById('time-elapsed')
    },
    volumeButton () {
      // return this.$refs.volume_btn
      return document.getElementById('volume-button')
    },
    volumeIcons () {
      return document.querySelectorAll('.volume-button use')
    },
    volumeMute () {
      return document.querySelector('use[href="#volume-mute"]')
    },
    volumeLow () {
      return document.querySelector('use[href="#volume-low"]')
    },
    volumeHigh () {
      return document.querySelector('use[href="#volume-high"]')
    },
    playbackAnimation () {
      // return this.$refs.playback_animation
      return document.getElementById('playback-animation')
    },
    fullscreenButton () {
      // return this.$refs.fullscreen_btn
      return document.getElementById('fullscreen-button')
    },
    videoContainer () {
      // return this.$refs.video_container
      return document.getElementById('video-container')
    },
    fullscreenIcons () {
      return document.querySelectorAll('use')
    },
    typeDocView () {
      let result = ''
      if (!this.dataSource || !this.dataSource.path) {
        return ''
      }
      if (this.isVideoType(this.dataSource.path)) {
        result = TYPE_VIDEO
      } else if (isAudio(this.dataSource.path)) {
        result = TYPE_AUDIO
      } else if (isImage(this.dataSource.path)) {
        result = TYPE_IMG
      } else if (this.isDocument(this.dataSource.path)) {
        result = TYPE_DOC
      }
      return result
    }
  },
  watch: {
    page (newVal) {
      this.progressBar = (newVal / this.duration) * 100
    }
  },
  mounted () {
    // console.log('DataSource footer:', this.dataSource)
    this.$nextTick(() => {
      this.initSettingDefault()
    })
  },
  beforeDestroy () {
    this.playButton && this.playButton.removeEventListener('click', this.playPauseAudio)
    this.seek && this.seek.removeEventListener('mousemove', this.updateSeekTooltip)
    this.seek && this.seek.removeEventListener('input', this.skipAhead)
    this.volume && this.volume.removeEventListener('input', this.updateVolume)
    this.player = null
    this.video = null
    this.fullscreenButton && this.fullscreenButton.removeEventListener('click', this.toggleFullScreen)
    document.removeEventListener('keyup', this.keyboardShortcuts)
  },
  methods: {
    // ...mapActions(STORE_KEY, ['acTogglePreviewRelateFiles']),

    classBtnPlay () {
      return (this.typeDocView === this.typeAudio && this.player && (this.player.paused || this.player.ended)) || (this.typeDocView === this.typeVideo && this.video && (this.video.paused || this.video.ended)) ? 'icon-play' : 'icon-pause-icon'
    },

    initSettingDefault () {
      switch (this.typeDocView) {
        case TYPE_AUDIO:
          this.initAudio()
          break
        case TYPE_VIDEO:
          this.initVideo()
          break
        case TYPE_DOC:
          this.initSettingDoc()
          break
      }
    },

    /***
     * Document
     */
    initSettingDoc () {
      this.duration = this.dataSource.totalPage
      this.progressBar = (1 / this.duration) * 100
    },
    onDownloadFile (data) {
      if (!data || !data.path) {
        this.$toast.error('Tài liệu hiện không thể tải xuống')
        return
      }
      const nameFile = data.fileName ? data.fileName : data.name ? data.name : 'document'
      const formatFile = data.path ? data.path.split('.').pop() : ''
      const nameDoc = nameFile + `.${formatFile}`
      this.downloadDocs(data.path, nameDoc)
    },
    // updateTimeElapsed indicates how far through the video
    // the current playback is by updating the timeElapsed element
    // updateProgress indicates how far through the video
    // the current playback is by updating the progress bar
    updateProgress () {
      this.seek.value = Math.ceil(this.video.currentTime)
      // this.progressBar.value = Math.floor(this.video.currentTime)
      this.progressBar = Math.ceil((this.video.currentTime / this.duration) * 100)
      if (this.video.ended) {
        this.progressBar = 100
        this.$emit('ended', true)
      }
    },

    // updateSeekTooltip uses the position of the mouse on the progress bar to
    // roughly work out what point in the video the user will skip to if
    // the progress bar is clicked at that point
    updateSeekTooltip (event) {
      const skipTo = Math.round(
        (event.offsetX / event.target.clientWidth) *
          parseInt(event.target.getAttribute('max'), 10)
      )
      this.seek.setAttribute('data-seek', skipTo)
      const t = this.formatTime(skipTo)
      this.seekTooltip.textContent = `${t.minutes}:${t.seconds}`
      // const rect = this.video.getBoundingClientRect()
      this.seekTooltip.style.left = `${event.pageX}px`
      // this.seekTooltip.style.left = `${event.pageX - rect.left}px`
    },

    // skipAhead jumps to a different point in the video when the progress bar
    // is clicked
    skipAhead (event) {
      const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value
      switch (this.typeDocView) {
        case TYPE_AUDIO:
          this.player.currentTime = skipTo
          break
        case TYPE_VIDEO:
          this.video.currentTime = skipTo
          break
      }
      // this.progressBar.value = skipTo
      this.progressBar = skipTo
      this.seek.value = skipTo
    },

    // updateVolume updates the video's volume
    // and disables the muted state if active
    // args val for parent component handle
    updateVolume (val = null) {
      switch (this.typeDocView) {
        case TYPE_VIDEO:
          this.updateVolVideo()
          break
        case TYPE_AUDIO:
          this.updateVolumeAudio()
          break
      }
    },

    // updateVolumeIcon updates the volume icon so that it correctly reflects
    // the volume of the video
    updateVolumeIcon () {
      // console.log('ClassLIST VL: ', this.volumeIcons)
      this.volumeIcons.forEach((icon) => {
        // icon.classList.add('hidden')
      })

      this.volumeButton.setAttribute('data-title', 'Mute (m)')

      if (this.video.muted || this.video.volume === 0) {
        // this.volumeMute.classList.remove('hidden')
        this.volumeButton.setAttribute('data-title', 'Unmute (m)')
      } else if (this.video.volume > 0 && this.video.volume <= 0.5) {
        // this.volumeLow.classList.remove('hidden')
      } else {
        // this.volumeHigh.classList.remove('hidden')
      }
    },

    // toggleMute mutes or unmutes the video when executed
    // When the video is unmuted, the volume is returned to the value
    // it was set to before the video was muted
    toggleMute () {
      this.video.muted = !this.video.muted

      if (this.video.muted) {
        this.volume.setAttribute('data-volume', this.volume.value)
        this.volume.value = 0
      } else {
        this.volume.value = this.volume.dataset.volume
      }
    },

    // animatePlayback displays an animation when
    // the video is played or paused
    animatePlayback () {
      this.playbackAnimation.animate(
        [
          {
            opacity: 1,
            transform: 'scale(1)'
          },
          {
            opacity: 0,
            transform: 'scale(1.3)'
          }
        ],
        {
          duration: 500
        }
      )
    },

    // toggleFullScreen toggles the full screen state of the video
    // If the browser is currently in fullscreen mode,
    // then it should exit and vice versa.
    toggleFullScreen () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    },

    // updateFullscreenButton changes the icon of the full screen button
    // and tooltip to reflect the current full screen state of the video
    updateFullscreenButton () {
      // this.fullscreenIcons.forEach(icon => icon.classList.toggle('hidden'))
      if (document.fullscreenElement) {
        this.fullscreenButton.setAttribute('data-title', 'Exit full screen (f)')
      } else {
        this.fullscreenButton.setAttribute('data-title', 'Full screen (f)')
      }
    },

    // togglePip toggles Picture-in-Picture mode on the video
    async togglePip () {
      try {
        if (this.video !== document.pictureInPictureElement) {
          this.pipButton.disabled = true
          await this.video.requestPictureInPicture()
        } else {
          await document.exitPictureInPicture()
        }
      } catch (error) {
        // console.error(error)
      } finally {
        this.pipButton.disabled = false
      }
    },

    // keyboardShortcuts executes the relevant functions for
    // each supported shortcut key
    keyboardShortcuts (event) {
      const { key } = event
      const self = this
      switch (key) {
        case 'k':
          self.togglePlay()
          self.animatePlayback()
          break
        case 'm':
          self.toggleMute()
          break
        case 'f':
          self.toggleFullScreen()
          break
        // case 'p':
        //   self.togglePip()
        //   break
      }
    },

    /****
     * Audio
     */
    initAudio () {
      this.player = document.getElementById('audio__file')
      this.getDurationAudio()
      this.handleEvtsAudio()
      // this.playPauseAudio()
    },
    getDurationAudio () {
      setTimeout(() => {
        if (this.player) {
          this.duration = this.player.duration
        }
      }, 500)
    },

    handleTimeUpdate () {
      this.progressBar = Math.floor((100 / this.player.duration) * this.player.currentTime)
      if (this.player.ended) {
        this.isPlay = false
        this.$emit('ended', true)
      }
    },

    replayAudio () {
      this.resetPlayer()
      this.player.play()
    },

    playPauseAudio () {
      if (this.player.paused || this.player.ended) {
        this.player.play()
        this.isPlay = true
      } else {
        this.player.pause()
        this.isPlay = false
      }
    },

    updatePlayButton () {
      if (!this.playbackIcons || !this.playButton) {
        return
      }
      // this.playbackIcons.forEach(icon => icon.classList.toggle('hidden'))

      if (this.player.paused) {
        this.playButton.setAttribute('data-title', 'Pause (k)')
        this.$emit('audioPlay', 'pause')
      } else {
        this.playButton.setAttribute('data-title', 'Play (k)')
        this.$emit('audioPlay', 'play')
      }
    },

    stopAudio () {
      this.player.pause()
      if (this.player.currentTime) {
        this.player.currentTime = 0
      }
    },

    muteVolume () {
      this.player.muted = !this.player.muted
    },

    resetPlayer () {
      this.progressBar = 0
      this.player.currentTime = 0
    },

    changeVolumn (evt) {
      this.volume = parseInt(evt.target.value)
    },

    changeCurrentTime (evt) {
      if (this.typeDocView === TYPE_AUDIO) {
        this.player.currentTime = parseInt(evt.target.value)
        this.progressBar = parseInt(evt.target.value)

        if (this.player.ended) {
          this.playButton.setAttribute('data-title', 'Pause (k)')
          // this.$emit('audioPlay', 'pause')
        }
      }
    },

    formatTime (timeInSeconds) {
      const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8)

      return {
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2)
      }
    },

    // skipAhead (event) {
    //   const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value
    //   this.player.currentTime = skipTo
    //   this.progressBarTime.value = skipTo
    //   this.seek.value = skipTo
    // },

    initializeAudio () {
      const audioDuration = Math.round(this.player.duration)
      this.seek.setAttribute('max', audioDuration)
      // this.progressBarTime.setAttribute('max', audioDuration)
      this.totalTime = this.formatTime(audioDuration)
      // const time = this.formatTime(audioDuration)
      // this.duration.innerText = `${time.minutes}:${time.seconds}`
      // this.duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
    },

    updateProgressAudio () {
      this.seek.value = Math.ceil(this.player.currentTime)
      // this.progressBarTime.value = Math.ceil(this.player.currentTime)
      this.progressBar = Math.ceil((this.player.currentTime / this.duration) * 100)
      const timeCurr = this.formatTime(this.player.currentTime)
      this.durationCurr = `${timeCurr.minutes}:${timeCurr.seconds}`
      // this.progressBar.value = Math.floor(this.player.currentTime)
    },

    // updateSeekTooltipAudio uses the position of the mouse on the progress bar to
    // roughly work out what point in the video the user will skip to if
    // the progress bar is clicked at that point
    updateSeekTooltipAudio (event) {
      const skipTo = Math.round(
        (event.offsetX / event.target.clientWidth) *
          parseInt(event.target.getAttribute('max'), 10)
      )
      this.seek.setAttribute('data-seek', skipTo)
      const t = this.formatTime(skipTo)
      this.seekTooltip.textContent = `${t.minutes}:${t.seconds}`
      // const rect = this.player.getBoundingClientRect()
      // this.seekTooltip.style.left = `${event.pageX - rect.left}px`
      this.seekTooltip.style.left = `${event.pageX}px`
    },

    // updateVolumeAudio updates the video's volume
    // and disables the muted state if active
    // args val for parent component handle
    updateVolumeAudio (val = null) {
      if (this.player.muted) {
        this.player.muted = false
      }
      if (val) {
        this.player.volume = val.target ? val.target.value : val
        this.volume.value = val.target ? val.target.value : val
      } else {
        this.player.volume = this.volume.value
      }
    },

    updateVolVideo (val) {
      if (this.video.muted) {
        this.video.muted = false
      }
      if (val) {
        this.video.volume = val
        this.volume.value = val
      } else {
        this.video.volume = this.volume.value
      }
    },

    toggleFilesRelate () {
      this.acTogglePreviewRelateFiles(!this.isViewRelateFiles)
    },

    onZoomDoc (value) {
      this.$emit('zoom', value)
    },

    /**
     * Light / Dark
     */
    onChangeTheme (value) {
      this.$emit('changeTheme', value)
    },
    onChangeDisplayDoc (value) {
      this.$emit('changeDisplayDoc', value)
    },

    onChangeSpeedMedia (val) {
      if (this.typeDocView === TYPE_AUDIO) {
        // this.player.defaultPlaybackRate = val
        this.player.playbackRate = val
        this.player.play()
      } else if (this.typeDocView === TYPE_VIDEO) {
        // this.video.defaultPlaybackRate = val
        this.video.playbackRate = val
        this.video.play()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view-doc {

  &__left {
    width: 84%;
  }
  &__right {
    width: 14%;
    margin-left: 2%;

    // &.type-video {
    //   width: 21%;
    // }

    >* {
      &:not(:first-child) {
        margin-left: 1.2rem;
      }
    }
  }

  &__footer {
    bottom: 0;
    z-index: 2;
    padding: 1rem 2.3%;
    background: rgba($color_dark, .4);

    .play {
      width: 2.5rem;
      height: 2.5rem;
    }
    .time {
      width: 5.75rem;
    }

    .seek {
      // position: absolute;
      // top: 0;
      width: 98%;
      cursor: pointer;
      // margin: 0;
    }

    .seek:hover+.seek-tooltip {
      display: block;
    }

    .seek-tooltip {
      display: none;
      position: absolute;
      top: -1.5rem;
      margin-left: -4.5rem;
      padding: 3px;
      // content: attr(data-title);
      font-weight: bold;
      color: $color_dark;
      background: $color_light;
    }

    .progress {
      width: calc(100% - 7.75rem);
      padding: 0 0.8rem 0 0.5rem;

      input {
        height: 8px;
        z-index: 2;
      }

      &__bar {
        height: 8px;
      }

      &__active {

        &__shape {
          &:before {
            content: '';
            width: 1rem;
            height: 1rem;
            position: absolute;
            z-index: 1;
            right: -2px;
            top: -0.2rem;
            background: $color_light;
            border-radius: 50%;
          }
        }
      }
    }

    button {
      background: transparent;
      border: 0;
    }

    .volume-controls {
      &__popup {
        position: absolute;
        bottom: 100%;
        left: -50px;
        padding: 10px;
        display: none;
      }

      &:hover {
        .volume-controls__popup {
          display: block;
        }
      }
    }
  }

  @media screen and ( min-width: 992px ) and ( max-width: 1199px ) {
    &__left {
      width: 75%;
    }
    &__right {
      width: 25%;
    }
  }
  @media screen and ( min-width: 768px ) and ( max-width: 991px ) {
    &__left {
      width: 72%;
    }
    &__right {
      width: 28%;
    }
  }
  @media screen and ( min-width: 576px ) and ( max-width: 767px ) {
    &__left {
      width: 68%;
    }
    &__right {
      width: 32%;
    }
  }

  @media screen and ( max-width: 575px ) {
    &__left {
      width: 65%;
    }
    &__right {
      width: 35%;

      >* {
        &:not(:first-child) {
          margin-left: 0.5rem;
        }
      }
    }

    &__footer {
      .font-size-30 {
        font-size: 1.2rem;
      }
    }
  }
}
.disabled {
  opacity: 0.3;
}
</style>
