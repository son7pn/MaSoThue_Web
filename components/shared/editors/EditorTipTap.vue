<template>
  <div id="editor_tiptap" class="position-rel">
    <div class="editor posiiton-rel">
      <editor-menu-bubble v-if="isShowMenu" v-slot="{ commands, isActive, menu }" :editor="editor" :keep-in-bounds="keepInBounds">
        <div
          class="menububble bg-color-dark"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; top: ${menu.top}px;`"
        >
          <a href="javascript:;" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
            B
          </a>
          <a href="javascript:;" class="font-italic" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
            I
          </a>
          <a href="javascript:;" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
            U
          </a>
          <a href="javascript:;" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
            S
          </a>
        </div>
      </editor-menu-bubble>
      <editor-content class="editor__content" :editor="editor" />
    </div>
    <!-- <div
      v-if="tagUserCurr && Object.keys(tagUserCurr).length"
      class="editor-users bg-color-light border-rd-8"
      :class="{'absolute': isModuleComment}"
      :style="{left: isModuleComment ? 0 : '2rem', top: isModuleComment ? '100%' : `${offsetYTags}px`}"
    >
      `${offsetXTags}rem`
      <UserListEditor :keyword="tagUserCurr.keyword" @created="handleTagUser" />
    </div> -->
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
import {
  // Blockquote,
  // BulletList,
  // CodeBlock,
  // HardBreak,
  // Heading,
  // ListItem,
  // OrderedList,
  // TodoItem,
  // TodoList,
  Bold,
  // Code,
  Italic,
  Link,
  Strike,
  Underline,
  Placeholder,
  Image
  // History
} from 'tiptap-extensions'
// import { STORE_KEY as STORE_KEY_NEWSFEED, KEY_TAG_USER_CONTENT, KEY_TAG_USER_CONTENT_COMMENT } from '@/store/common/newFeed/constants'
// import UserListEditor from './UserList'

export default {
  name: 'EditorBubble',
  components: {
    EditorContent,
    EditorMenuBubble
    // UserListEditor
  },
  props: {
    linkImg: {
      type: String,
      default: ''
    },
    valueContent: {
      type: String,
      default: ''
    },
    isShowMenu: {
      type: Boolean,
      default: true
    },
    isModuleComment: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    isComment: {
      type: Boolean,
      default: false
    },
    listUserTags: {
      type: Array,
      default: Array
    }
  },
  data () {
    const self = this
    return {
      keepInBounds: true,
      tagUserCurr: {},
      offsetYRem: 1.1,
      offsetXTags: 0,
      offsetYTags: 1.1,
      editor: new Editor({
        extensions: [
          // new Blockquote(),
          // new BulletList(),
          // new CodeBlock(),
          // new HardBreak(),
          // new Heading({ levels: [1, 2, 3] }),
          // new ListItem(),
          // new OrderedList(),
          // new TodoItem(),
          // new TodoList(),
          new Link(),
          new Bold(),
          new Image(),
          // new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: this.placeholder || 'Viết bài tại đây',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true
          })
        ],
        content: '',
        onUpdate: (evt) => {
          self.handleChangeContent(evt.getHTML())
        }
      })
    }
  },
  computed: {
    // ...mapState(STORE_KEY_NEWSFEED, ['refForm', 'newsPostData']),
    screenWidth () {
      return window.innerWidth
    },
    headerModal () {
      const elmModalHead = document.getElementById('modalTitle')
      return elmModalHead ? elmModalHead.clientHeight : 0
    }
  },
  watch: {
    'editor.content': 'handleChangeContent',
    linkImg (newVal) {
      newVal && this.insertImg(newVal)
    }
    // refForm () {
    //   if (this.refForm) {
    //     // console.log('ReForm: ', this.editor.getHTML())
    //     // this.editor.setContent('')
    //     this.acRefreshForm(this.refForm = false)
    //   }
    // }
    // valueContent (newVal) {
    //   if (newVal !== this.editor.getHTML()) {
    //     this.handleConvertContentHasTag(newVal)
    //   }
    //   // console.log('content chaneg', newVal, this.editor.getHTML())
    // }
  },
  mounted () {
    this.linkImg && this.editor && this.insertImg(this.linkImg)
    // this.valueContent && this.handleConvertContentHasTag(this.valueContent)
    document.addEventListener('keydown', this.handleKeyUp)
    this.valueContent && this.handleChangeContent(this.valueContent)
  },
  beforeDestroy () {
    this.editor.destroy()
    this.tagUserCurr = {}
    document.removeEventListener('keydown', this.handleKeyUp)
  },
  methods: {
    // ...mapActions('newFeed', ['acRefreshForm']),

    handleKeyUp (evt) {
      const keyCode = evt.keyCode
      // console.log('Key up: ', evt.keyCode)
      // Enter: 13
      // set offsetHeight
      this.offsetYTags = evt.target.offsetHeight + this.headerModal + 15 // space bottom: 15px
      if ([40, 38, 13].includes(evt.keyCode) && this.tagUserCurr && Object.keys(this.tagUserCurr).length) {
        evt.preventDefault()
      } else if (keyCode === 13 && this.isModuleComment) {
        evt.preventDefault()
        this.$emit('onSubmitComment')
      }
    },

    // handleConvertContentHasTag (content) {
    //   // if (!this.newsPostData || !this.newsPostData.listUserContent || this.newsPostData.listUserContent.length === 0) {
    //   //   this.editor.setContent(content)
    //   // } else
    //   if (this.isComment && this.listUserTags && this.listUserTags.length) {
    //     // eslint-disable-next-line array-callback-return
    //     this.listUserTags.map((us) => {
    //       content = this.convertContentLinkEditor(content, us)
    //     })
    //   } else if (this.newsPostData.listUserContent && this.newsPostData.listUserContent.length) {
    //     // eslint-disable-next-line array-callback-return
    //     this.newsPostData.listUserContent.map((us) => {
    //       content = this.convertContentLinkEditor(content, us)
    //     })
    //   }
    //   this.editor.setContent(content)
    // },

    // convertContentLinkEditor (content, user, keyChange) {
    //   const { userId, fullName } = user
    //   const keyReplace = `${keyChange}${userId}`
    //   const contentReplace = `<a href="${userId}" rel="noopener noreferrer nofollow">${fullName}</a>`
    //   user.html = contentReplace
    //   return content.replace(keyReplace, contentReplace)
    // },

    async handleChangeContent (val) {
      const links = await this.getPermalinkOnContent(val)
      this.getSpecialTag(val)
      const link = links[links.length - 1]
      this.$emit('change', val, link)
    },

    /*
     * Function support detect meta tag display preview
     * @ data String html
     * @ result Array permarlink
    */
    getPermalinkOnContent (data) {
      if (!data) {
        return
      }

      const regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig
      let link
      const result = []
      while ((link = regex.exec(data)) !== null) {
        result.push(link[2])
      }
      return result
    },

    getSpecialTag (content) {
      const self = this
      if (!content) {
        return
      }

      // const regex = /[\s$]@(\w*)/g
      // eslint-disable-next-line no-useless-escape
      const regex = /(^|[^\w])@([\w\_\.]+)/g
      let tag
      const result = []
      while ((tag = regex.exec(content)) !== null) {
        if (!tag.input.includes(`${tag[0]} `)) {
          // char key for breakline: eg: '>'...
          result.push({ content: tag[0], keyword: tag[2], char: tag[1], index: tag.index })
        } else {
          self.tagUserCurr = {}
        }
      }
      self.handleSetListUser(result, content)
    },

    handleSetListUser (tags, content) {
      if (!tags || tags.length === 0) {
        this.tagUserCurr = {}
        return
      }
      const lengthTags = tags.length
      this.tagUserCurr = tags[lengthTags - 1]
      // this.setOffsetTag()
    },

    // setOffsetTag () {
    //   const elm = document.getElementById('editor_tiptap')
    //   // const elmModalHead = document.getElementById('modalTitle')
    //   if (!elm) {
    //     return
    //   }
    //   let fontSize = 20
    //   let widthEml = elm.clientWidth // px

    //   if (this.screenWidth > 1441 && this.screenWidth < 1680) {
    //     fontSize = 17
    //   } else if (this.screenWidth > 1280 && this.screenWidth < 1440) {
    //     fontSize = 15
    //   } else if (this.screenWidth > 1024 && this.screenWidth < 1281) {
    //     fontSize = 14
    //   } else if (this.screenWidth > 992 && this.screenWidth < 1025) {
    //     fontSize = 16
    //   } else if (this.screenWidth > 768 && this.screenWidth < 991) {
    //     fontSize = 15
    //   } else if (this.screenWidth < 767) {
    //     fontSize = 14
    //   }
    //   // Convert px to rem
    //   widthEml /= fontSize
    //   const charOffsetX = 0.45 // rem
    //   // 1 row = ? index
    //   const allIndexInRow = widthEml / charOffsetX
    //   const offsetXCurr = this.tagUserCurr.index > allIndexInRow ? this.tagUserCurr.index % allIndexInRow : this.tagUserCurr.index
    //   // const offsetYCurr = this.tagUserCurr.index > allIndexInRow ? this.tagUserCurr.index / allIndexInRow : 1
    //   // const rowOffsetY = 1.1 // rem
    //   // const tagElm = document.getElementsByClassName('tag_find')
    //   this.offsetXTags = offsetXCurr * charOffsetX
    //   // this.offsetYTags = (offsetYCurr + heightHeadModal) * charOffsetY
    //   // console.log('Tag elm: ', this.tagUserCurr.index, allIndexInRow, this.editor)
    // },

    // handleTagUser (user) {
    //   if (!user) {
    //     return
    //   }
    //   const contentCurr = this.editor.getHTML()
    //   // console.log('Tag User: ', user, this.editor.getHTML(), this.tagUserCurr.content)
    //   const contentReplace = `<a href="${user.userId}" rel="noopener noreferrer nofollow">${user.fullName}</a>`
    //   // const contentNew = contentCurr.replace(this.tagUserCurr.content, `<a href="${window.location.origin}/personal-page/information/${user.userId}">${user.fullName}</a> `)
    //   const contentNew = contentCurr.replace(this.tagUserCurr.content, this.tagUserCurr.char + contentReplace)
    //   this.editor.setContent(contentNew)

    //   this.$emit('change', contentNew)
    //   this.$emit('tagUser', { ...user, html: contentReplace })
    //   this.tagUserCurr = {}
    // },

    insertImg (src) {
      if (!src) {
        return
      }
      this.editor.commands.image({ src })
    }
  }
}
</script>
<style lang="scss" scoped>
.menububble {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 20;
  border-radius: 5px;
  padding: .3rem;
  margin-bottom: .5rem;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity .2s,visibility .2s;
  transition: opacity .2s,visibility .2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  a {
    color: $color_light;
    padding: 2px 8px;

    &:hover {
      cursor: pointer;
      background-color: $color_light_gray;
    }

    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>
<style lang="scss">
.editor__content {
  .is-editor-empty {
    &:first-child {
      &::before {
        content: attr(data-empty-text);
        float: left;
        color: $secondary_color_txt;
        pointer-events: none;
        height: 0;
      }
    }
  }
}
.editor-users {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  // border: 1px solid $color_border;
  // box-shadow: 1px 1px 10px rgba($color_dark, 0.2);
  // -webkit-box-shadow: 1px 1px 10px rgba($color_dark, 0.2);
  z-index: 2;

  &.absolute {
    position: absolute;
    top: 100%;
    left: 0;
  }
}
</style>
