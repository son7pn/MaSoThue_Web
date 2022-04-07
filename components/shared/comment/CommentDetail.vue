<template>
  <div class="comment-add home-comment__write-cmt display-flex">
    <div v-if="!isEdit" class="box-avatar border-rd-50">
      <figure v-show="!dataCommentUpdate || Object.keys(dataCommentUpdate).length === 0" class="home-comment__write-cmt__img-user aspect-ratio aspect-ratio--1-1 border-rd-50">
        <img
          v-lazy-load
          loading="lazy"
          :data-src="avatarDefault"
          alt="avatar"
          class="full-box"
        >
      </figure>
    </div>
    <div class="home-comment__write-cmt__input border-rd-6" :class="{'edit': isEdit}">
      <div class="display-flex align-items-baseline">
        <form class="full-width">
          <client-only>
            <EditorBubble
              :ref="`comment_focus_${isEdit ? 'edit_' + position : position}`"
              :value-content="contentComment"
              :is-show-menu="false"
              :is-module-comment="true"
              :placeholder="'Viết bình luận tại đây ...'"
              :is-comment="true"
              :list-user-tags="dataSource.listUser"
              @change="editorChange"
              @tagUser="handleTagUser"
            />
          </client-only>
          <input ref="input_comment_parent" type="hidden" name="commentParentId" :value="parentId">
          <span v-if="invalid" class="display-block color-err mr-t-5 text-left">Vui lòng điền nội dung</span>
        </form>
        <div class="position-rel">
          <a href="javascript:;" @click="saveComment">
            <i class="fa fa-paper-plane font-size-30 primary-color-txt" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
// import { APP_CONFIG } from '@/utils/env'
import mixinsFile from '@/mixins/mixinsFile'
import EditorBubble from '@/components/shared/editors/EditorTipTap.vue'
// import mixinsPreviewLink from '@/mixins/mixinsPreviewLink'
/**
 * getPermalinkOnContent
 * previewHtml: data mixins
 * linkCurrInput: data mixins
 */
// import WritePreviewLinkWeb from '@/components/message/write/WritePreviewLinkWeb'

const avatarDefault = require('@/assets/images/logo/avatar-user.png')

export default {
  name: 'CommentDetail',
  components: {
    // CommentDisplayFile,
    EditorBubble
    // WritePreviewLinkWeb
  },
  mixins: [mixinsFile, validationMixin],
  props: {
    parentId: {
      type: Number,
      default: 0
    },
    userName: {
      type: String,
      default: ''
    },
    userId: {
      type: Number,
      default: 0
    },
    focusIndex: {
      type: Number,
      default: -1
    },
    position: {
      type: Number,
      default: -1
    },
    dataSource: {
      type: Object,
      default: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // cdnUrl: APP_CONFIG.cdnImageUrl,
      contentComment: '',
      submitForm: false,
      dataFile: {
        fileUrl: '',
        name: '',
        documentId: 0,
        commentParentId: 0
      },
      dataCommentUpdate: {},
      invalid: false,
      avatarDefault,
      tagUserCurr: {},
      listUserContent: [],
      listUserContentTag: []
    }
  },
  validations: {
    contentComment: {
      required
    }
  },
  computed: {
  },
  watch: {
    // focusIndex (newVal) {
    //   console.log('New val index focus: ', newVal)
    //   if (!this.$refs[`comment_focus_${newVal}`]) {
    //     return
    //   }
    //   if (this.userId && this.userName && this.authInfo.userId !== this.userId) {
    //     this.contentComment = `@${this.userName}`
    //   }
    //   this.$refs[`comment_focus_${newVal}`].focus()
    // }
  },
  mounted () {
    this.setDataEditInit()
    this.$nextTick(function () {
      this.setFocusInputEdit()
    })
  },
  methods: {
    setFocusInputEdit () {
      if (!this.isEdit && this.focusIndex > -1 && this.authInfo.userId !== this.userId) {
        const html = `<a href="${this.userId}" rel="noopener noreferrer nofollow">${this.userName}</a>`
        this.contentComment = `<a href="${this.userId}" rel="noopener noreferrer nofollow">${this.userName}</a>`
        this.handleTagUser({ fullName: this.userName, userId: this.userId, html })
      }
      // this.isEdit && this.focusIndex > -1 && this.$refs[`comment_focus_edit_${this.focusIndex}`] && this.$refs[`comment_focus_edit_${this.focusIndex}`].focus()
    },

    setDataEditInit () {
      this.dataCommentUpdate = this.dataSource
      const { contentComment, documentId, fileName, path, pathView } = this.dataSource
      this.contentComment = contentComment
      this.dataFile = { documentId, fileName, path, pathView, commentParentId: this.parentId ? this.parentId : 0 }
    },

    async onChangeFileComment (e) {
      const file = await this.uploadFile2CDN(e)
      if (!file) {
        return
      }
      const { documentId, fileName, path, pathView } = file.data
      this.dataFile = { ...this.dataFile, documentId, fileName, path, pathView }
    },

    saveComment (e) {
      this.submitForm = true
      console.log('Content comment: ', this.contentComment)
      if (!this.contentComment) {
        return
      }
      // if (this.contentComment) {
      const check = this.contentComment.split('<p>').join('').split('</p>').join('').trim()

      if (!check && !this.dataFile.documentId) {
        this.invalid = true
        return
      }
      const payload = {
        contentComment: this.contentComment,
        ...this.dataFile,
        commentParentId: parseInt(this.$refs.input_comment_parent.value)
      }

      // Add preview html into content
      if (this.previewHtml && this.previewHtml.length > 0) {
        payload.contentComment += this.previewHtml.join(' ')
      }
      // console.log('Saved comment: ', this.previewHtml, payload)
      // console.log('Payload comment: ', payload, this.listUserContent, userTagged)
      if (!this.dataCommentUpdate || Object.keys(this.dataCommentUpdate).length === 0) {
        this.$emit('created', payload)
      } else {
        const dataUpdate = { ...this.dataCommentUpdate, ...payload }
        this.$emit('updated', dataUpdate)
      }
      // Reset form
      this.contentComment = ''
      this.handleRemoveFileComment()
      this.submitForm = false
      this.invalid = false
      this.listUserContent = []
      this.previewHtml = []
    },

    handleRemoveFileComment () {
      this.dataFile = { ...this.dataFile, documentId: 0, fileName: '', path: '', pathView: '' }
    },

    handleInputComment (evt) {
      const content = evt.target.value
      content && this.getSpecialTag(content)
      // console.log('Evt: ', evt.target.value)
    },

    async editorChange (val, link = null) {
      this.contentComment = val
      const content = val
      if (!content || !link || link === this.linkCurrInput) {
        return
      }
      // Params 2: GET HTML: True || Array html: False - previewHtml key - mixinPreviewHtml
      // await this.getPermalinkOnContent(content, false)
      await this.getPreviewByOnlyLink(content, link)
      if (this.previewHtml.length) {
        // Variable: linkCurrInput from mixins data
        const contentBefore = `<a href="${this.linkCurrInput}" rel="noopener noreferrer nofollow">${this.linkCurrInput}</a>`

        this.contentComment = content.replace(contentBefore, '')
        // this.$refs.chat_message.value = content.replace(this.linkCurrInput, '')
        // this.renderStyleBody()
      }

      // console.log('Previe:', this.previewHtml, this.linkCurrInput, this.contentComment)
      // if (link && link !== this.linkGetMetaTag) {
      //   this.acGetHtmlLink(link).then((res) => {
      //     if (res) {
      //       this.acSetNewPostData({
      //         ...this.newsPostData,
      //         imageUrlRef: res.imageUrl,
      //         titleRef: res.title,
      //         descriptionRef: res.description,
      //         webUrl: link
      //       })
      //       this.linkGetMetaTag = link
      //     }
      //   })
      // } else if (!link && this.linkGetMetaTag) {
      //   this.delImageUrlRef()
      //   this.linkGetMetaTag = ''
      // }
    },

    removePreviewLink (index) {
      this.previewHtml.splice(index, 1)
      // if (this.previewHtml.length === 0) {
      //   setTimeout(() => {
      //     this.renderStyleBody()
      //   }, 500)
      // }
    },

    handleTagUser (user) {
      if (!this.listUserContent) {
        this.listUserContent = [user]
        return
      }
      this.listUserContent.push(user)
    }
  }
}
</script>

<style lang="scss" scoped>
.active-cmt{
  color: $primary_color;
}
.input-upload{
  position: absolute;
  top: 10%;
  display: block;
  opacity: 0;
  width: 100%;
}
.pd-r-5{
  padding-right: 5px;
}
.item {
  // margin-top: 10px;
  .del-image {
    i {
      top: 6px;
      right: 23px;
      opacity: 0;
      cursor: pointer;
    }
  }
  &:hover {
    .del-image i {
      opacity: 1;
    }
    .item-image {
      opacity: 0.6;
    }
  }
}
.aspect-ratio::before {
    background: $color_background;
}
.menu-comment{
  right: 0;
  padding: 5px;
  width: 130px;
  box-shadow: 1px -1px 12px rgba(0,0,0,.3);
  transition: opacity .2s ease;
  animation: fade-in 2s;
  li{
    padding: 5px;
    border-radius: 5px;
    &:hover{
      background: $color_light_gray;
      a{
        color: $primary_color;
      }
    }
  }
}
.home-comment{
  margin-top: 24px;
  &__write-cmt{
    // margin-bottom: 32px;
    &__input{
      background: $color_background;
      padding-top: 8px;
      min-height: 55px;
      &:not(.edit) {
      margin-left: 12px;
      width: 95%;
      padding: 16px;

      }
      &.edit {
        width: 100%;
        padding: 8px 16px;
      }
      input{
        background: $color_background;
        line-height: 1;
        border: none;
        width: 100%;
      }
    }
  }
  &__item-cmt{
    margin-bottom: 8px 16px;
    &__img-user{
      img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
    &__content-cmt{
      width: 95%;
      margin-left: 10px;
    }
    &__container{
      background: $color_background;
      padding: 8px 16px;
    }
    &__head{
      margin-bottom: 16px;
    }
    &__feedback{
      padding: 10px 10px 0 10px;
      .left{
        .menu{
          margin-right: 8px;
          li{
            margin-right: 8px;
            display: inline-block;
            // border-radius: 50%;
          }
        }
      }
      .right{
        .menu{
          li{
            &:hover{
              a{
                color: $primary_color;
              }
            }
            display: inline-block;
            padding:  5px;
          }
        }
      }
    }
    &__rep-cmt{
      .rep-cmt{
        cursor: pointer;
      }
      &__item-reply{
        margin: 10px 0;
      }
      &__img-user{
        img{
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
      }
      &__content-reply{
        width: 95%;
        margin-left: 10px;
      }
      &__container{
        padding: 8px 16px;
        background: $color_background;
      }
      &__head{
        margin-bottom: 16px;
      }
      &__feedback{
        padding: 10px 10px 0 10px;
        .left{
          .menu{
            margin-right: 8px;
            li{
              margin-right: 8px;
              display: inline-block;
            }
          }
        }
        .right{
          .menu{
            li{
              &:hover{
                a{
                  color: $primary_color;
                }
              }
              display: inline-block;
              padding:  5px;
              i{
                font-size: 20px;
              }
            }
          }
        }
      }
      &__write-reply{
        &__img-user{
          img{
            width: 24px;
            height: 24px;
            border-radius: 50%;
          }
        }
        &__input{
          background: $color_background;
          width: 95%;
          margin-left: 10px;
          padding: 8px 16px;
          min-height: 40px;
          input{
            background: $color_background;
            line-height: 1;
            border: none;
            width: 100%;
          }
        }
      }
    }
  }
}
@media(max-width: 425px) {
  .home-comment__write-cmt__input {
    padding: 10px;
    margin-left: 5px;
  }
  .home-comment__item-cmt__feedback .left .menu {
    margin-right: 0;
    li {
      margin-right: 0;
    }
  }
}
</style>
