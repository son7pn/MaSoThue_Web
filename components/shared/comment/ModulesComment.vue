<template>
  <div class="home-comment feedback">
    <CommentDetail v-if="isCreateComment=true" @created="handleAddComment" />
    <div class="home-comment__list-cmt">
      <template v-for="(item, index) of listCommentPost">
        <div :key="index" class="home-comment__item position-rel">
          <ItemComment
            :data-source="item"
            :position="index"
            :focus-index="childCommentOpen"
            :is-create-comment="isCreateComment"
            @toggleChildComment="toggleChildComment"
            @replyComment="handleReplyComment(index)"
          />
          <!-- <div v-if="childCommentOpen === index" class="comment-child">
            <template v-for="(child, pos) of item.lstComment">
              <div :key="pos" class="position-rel">
                <ItemComment
                  :data-source="child"
                  :position="pos"
                  :parent-index="index"
                  :focus-index-child="parentChildCommentOpen"
                  :is-create-comment="isCreateComment"
                  :is-child-comment="true"
                  @updated="hadleCommentUpdated"
                  @toggleChildComment="toggleParentChildComment"
                  @replyComment="handleReplyParentComment(pos, true)"
                  @deleted="handleRemoveComment"
                  @onLike="handleLikeComment"
                />
                <div v-if="parentChildCommentOpen === pos" class="comment-child comment-parent-child">
                  <ItemComment
                    v-for="(child2, pos2) of child.lstComment"
                    :key="pos2"
                    :data-source="child2"
                    :position="pos2"
                    :parent-index="pos"
                    :is-create-comment="isCreateComment"
                    @updated="hadleCommentUpdated"
                    @replyComment="handleReplyParentComment(pos, true)"
                    @deleted="handleRemoveComment"
                    @onLike="handleLikeComment"
                  />
                  <CommentDetail
                    v-if="isCreateComment"
                    :parent-id="child.id"
                    :user-name="child.fullName"
                    :user-id="child.createBy"
                    :position="pos"
                    @created="handleAddComment"
                  />
                </div>
              </div>
            </template>
            <CommentDetail
              v-if="isCreateComment"
              :parent-id="item.id"
              :user-name="item.fullName"
              :user-id="item.createBy"
              :focus-index="childCommentOpen"
              :position="index"
              @created="handleAddComment"
            />
          </div> -->
        </div>
      </template>
      <Pagination
        :total-records="totalRecordsComment"
        :total-page="(Math.floor(totalRecordsComment/10) + (totalRecordsComment % 10 == 0 ? 0 : 1 ))"
        @change="changPage"
      />
    </div>
    <ModalConfirmInfoComment v-if="(!authInfo || (authInfo && authInfo.articleId !== articleId)) && isShowConfirmInfo" @closeModal="closeModal" @submit="handleCreateComment" />
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import ClickOutside from 'vue-click-outside'
import CommentDetail from './CommentDetail'
import ItemComment from './ItemComment'
import ModalConfirmInfoComment from './ModalConfirmInfoComment.vue'
import { APP_CONFIG } from '@/utils/env'
import { COOKIE_USER } from '@/store/auth/constants'
import Pagination from '@/components/shared/Pagination.vue'
import mixinsFile from '@/mixins/mixinsFile'

export default {
  components: {
    CommentDetail,
    ItemComment,
    ModalConfirmInfoComment,
    Pagination
  },
  directives: {
    ClickOutside
  },
  mixins: [mixinsFile],
  props: {
    listCommentPost: {
      type: Array,
      default: Array
    },
    articleId: {
      type: Number,
      default: Number
    },
    postStatusFileId: {
      type: Number,
      default: Number
    },
    listObjLibrary: {
      type: Array,
      default: Array
    },
    module: {
      type: String,
      default: ''
    },
    infoNewsfeed: {
      type: Object,
      default: Object
    }
  },
  data () {
    return {
      isShowCommentReply: Number,
      actionComment: Number,
      actionCommentReply: Number,
      isShowReply: true,
      libraryFileId: 0,
      apiUrl: APP_CONFIG.cdnImageUrl,
      listComment: [],
      listChildComment: [],
      windowWidth: 0,
      cmtDocumentId: 0,
      cmtFileUrl: '',
      objCreateComment: {
        commentParentId: 0,
        postStatusId: 0,
        contentComment: '',
        postStatusFileId: 0,
        documentId: 0,
        fileUrl: ''
      },
      objCreateCommentChild: {
        commentParentId: 0,
        postStatusId: 0,
        ContentComment: '',
        postStatusFileId: 0
      },
      objCreateCommentLibrary: {
        CommentParentId: 0,
        LibraryFileId: 0,
        ContentComment: ''
      },
      childCommentOpen: -1,
      parentChildCommentOpen: -1,
      isShowConfirmInfo: false,
      authInfo: {},
      contentFirtComment: {}
    }
  },
  computed: {
    ...mapState('common', ['totalRecordsComment'])
    // isCreateComment () {
    //   if (!this.infoNewsfeed || Object.keys(this.infoNewsfeed).length === 0) {
    //     return false
    //   }
    //   return !this.infoNewsfeed.isCommentId || [EVERY_BODY, FOLLOWERS].includes(this.infoNewsfeed.isCommentId)
    // }
    // eslint-disable-next-line vue/return-in-computed-property
  },
  watch: {
    // authInfo (newVal) {
    //   console.log('newVal: ', newVal)
    // }
  },
  mounted () {
    this.authInfo = JSON.parse(localStorage.getItem(COOKIE_USER))
    this.windowWidth = window.innerWidth
  },
  methods: {
    ...mapActions('common', ['acCreateComment', 'acGetListComment', 'acGetRateArticles']),
    // handleRemoveComment (id) {
    //   console.log('val: ', id)
    // },

    toggleChildComment (index) {
      this.childCommentOpen = this.childCommentOpen === index ? -1 : index
    },
    toggleParentChildComment (index) {
      this.parentChildCommentOpen = this.parentChildCommentOpen === index ? -1 : index
    },
    handleReplyComment (index, isChild) {
      // console.log('index: ', index)
      this.childCommentOpen = index
    },
    handleReplyParentComment (index) {
      this.parentChildCommentOpen = index
    },
    async handleAddComment (val) {
      // console.log('aaaaaaaa: ', (this.authInfo && this.authInfo.articleId !== this.articleId))
      if (!this.authInfo || (this.authInfo && this.authInfo.articleId !== this.articleId)) {
        this.isShowConfirmInfo = true
        this.contentFirtComment = val
      } else {
        const payloadCreate = { ...val, articleId: this.articleId, email: this.authInfo.email, fullName: this.authInfo.name, phoneNumber: this.authInfo.phoneNumber, rate: this.authInfo.articleId === this.articleId ? { rating: -1 } : { rating: this.authInfo.rating } }
        const data = await this.acCreateComment(payloadCreate)
        // console.log('data: ', data)
        if (!data) {
          return
        }
        this.$toast.success('Bình luận thành công!')
        this.$emit('created')
        // eslint-disable-next-line vue/no-mutating-props
        this.listCommentPost.unshift(data)
      }
      // await console.log('val: ', val)
      // console.log('this.authInfo: ', this.authInfo)
    },
    async handleCreateComment (val) {
      if (!this.authInfo || (this.authInfo && this.authInfo.articleId !== this.articleId)) {
        localStorage.setItem(COOKIE_USER, JSON.stringify({ ...val, articleId: this.articleId }))
        this.authInfo = JSON.parse(localStorage.getItem(COOKIE_USER))
        const payloadCreate = { ...this.contentFirtComment, articleId: this.articleId, email: this.authInfo.email, fullName: this.authInfo.name, phoneNumber: this.authInfo.phoneNumber, rate: { rating: this.authInfo.rate.rating } }
        const data = await this.acCreateComment(payloadCreate)
        // console.log('data: ', data)
        if (!data) {
          return
        }
        this.$toast.success('Bình luận thành công!')
        this.$emit('created')
        // eslint-disable-next-line vue/no-mutating-props
        this.listCommentPost.unshift(data)
        this.acGetRateArticles(this.articleId)
      }
      // console.log('this.authInfo: ', this.authInfo)
    },
    // hadleCommentUpdated (val) {
    //   await console.log('val: ', val)
    // },
    closeModal () {
      this.isShowConfirmInfo = false
    },
    changPage (page) {
      this.acGetListComment({ articleId: this.articleId, pageIndex: page.page, pageSize: 10 })
    }
    // handleLikeComment (val) {
    //   console.log('val: ', val)
    // }
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
  margin-top: 10px;
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
.home-comment{
  margin-top: 24px;
  &__list-cmt {
    margin-top: 1.5rem;
  }
  &__write-cmt{
    padding-bottom: 20px;
    &__img-user{
      img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
    &__input{
      background: $color_background;
      width: 95%;
      margin-left: 10px;
      padding: 16px;
      padding-top: 8px;
      min-height: 55px;
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
  &__item {
    margin-bottom: 1.5rem;
    .comment-child {
      padding-left: 3rem;
      &::before {
        content: '';
        height: 100%;
        border-left: 1px solid #e1e7ed;
        display: block;
        position: absolute;
        left: 1rem;
        top: 0px;
      }
    }
  }
}
@media(max-width: 425px) {
  .home-comment__item-cmt__feedback .left .menu {
    margin-right: 0;
    li {
      margin-right: 0;
    }
  }
}
</style>
