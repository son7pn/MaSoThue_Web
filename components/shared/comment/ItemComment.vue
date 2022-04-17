/* eslint-disable vue/no-mutating-props */
<template>
  <div class="comment-item home-comment__item-cmt display-flex" @keydown.esc="handleCloseEdit">
    <div class="home-comment__item-cmt__img-user box-avatar z-index-1">
      <nuxt-link :to="`/profile/${dataSource.createBy}/new-feed/`" class="cursor-pointer">
        <figure class="aspect-ratio aspect-ratio--1-1 border-rd-50">
          <img
            v-lazy-load
            loading="lazy"
            :data-src="dataSource.avatar ? cdnUrl + dataSource.avatar : avatarDefault"
            :alt="dataSource.fullName"
            class="img-fit"
          >
        </figure>
      </nuxt-link>
    </div>
    <div class="comment-item__content">
      <div class="home-comment__item-cmt__container border-rd-6">
        <div class="home-comment__item-cmt__head display-flex-center justify-content-between">
          <h4 class=" font-sanpro-semibold primary-color-txt">
            <nuxt-link :to="`/profile/${dataSource.createBy}/new-feed/`" class="cursor-pointer primary-color-txt">
              {{ dataSource.fullName }}
            </nuxt-link>
          </h4>
          <div class="position-rel display-flex">
            <span class="date font-primary secondary-color-txt font-size-14">{{ $dayjs(dataSource.createdDate).format('DD/MM/YYYY') }}</span>
          </div>
        </div>
        <div class="home-comment__item-cmt__descriptions">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p class="font-primary primary-color-txt word-break-all" v-html="replaceDescription(dataSource, 'body', true)" />
        </div>
        <CommentDetail
          v-if="isOpenEditForm"
          :data-source="dataSource"
          :is-edit="true"
          :position="position"
          :focus-index="position"
          @updated="handleCommentUpdated"
        />
      </div>
      <div class="home-comment__item-cmt__feedback justify-content-between display-flex">
        <div class="left display-flex-center">
          <span class="display-inline-block font-primary secondary-color-txt font-size-16">
            {{ dataSource.countComment ? dataSource.countComment : 0 }} Trả lời
          </span>
        </div>
        <ul class="right list-style-none menu font-size-24 display-flex">
          <!-- eslint-disable-next-line vue/no-mutating-props -->
          <!-- <ActionLikes :data-source="dataSource" :type="'comment'" @onChange="($event) => dataSource = handleLikePost($event, dataSource.commentId, dataSource)" /> -->
          <li v-if="hasComment">
            <a class="secondary-color-txt display-flex" href="javascript:;" @click="replyComment(position)">
              <i class="fa fa-comments font-size-30 primary-color-txt" aria-hidden="true" />
              <!-- <img loading="lazy" src="@/assets/images/frontend/icon/icon-messages.png" alt="icon-mess" class="height-24"> -->
            </a>
          </li>
        </ul>
      </div>
      <div class="home-comment__item-cmt__repcmt">
        <a
          v-if="dataSource.lstComment && dataSource.lstComment.length > 0"
          href="javascript:;"
          class="font-primary primary-color rep-cmt"
          @click="toggleCommentReply(position)"
        >
          {{ isOpenChildComment && ((!isChildComment && focusIndex === position) || (isChildComment && focusIndexChild === position)) ? 'Ẩn' : 'Hiển thị' }} {{ dataSource.countComment }} phản hồi
        </a>
      </div>
    </div>
    <!-- <ConfirmModal v-if="idModalConfirmDel > 0" @onCancle="closeModalConfirm" @onOk="handleRemoveComment">
      <template #content>
        <p class="margin-0">
          Bạn chắc chắn muốn <b>xóa</b> bình luận này?
        </p>
      </template>
    </ConfirmModal> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ClickOutside from 'vue-click-outside'
import CommentDetail from './CommentDetail'
// import ActionLikes from './ActionLikes'
// import { APP_CONFIG } from '@/utils/env'
import mixinsFile from '@/mixins/mixinsFile'
// import ConfirmModal from '@/components/modal/ConfirmModal'
/**
 * replaceDescription method
 */
const avatarDefault = require('@/assets/images/logo/avatar-user.png')

export default {
  name: 'CommentItem',
  components: {
    CommentDetail
    // ActionLikes,
    // ConfirmModal
  },
  directives: {
    ClickOutside
  },
  mixins: [mixinsFile],
  props: {
    dataSource: {
      type: Object,
      default: Object
    },
    position: {
      type: Number,
      default: 0
    },
    parentIndex: {
      type: Number,
      default: -1
    },
    focusIndex: {
      type: Number,
      default: -1
    },
    keyComment: {
      type: String,
      default: ''
    },
    isCreateComment: {
      type: Boolean,
      default: true
    },
    isChildComment: {
      type: Boolean,
      default: false
    },
    focusIndexChild: {
      type: Number,
      default: -1
    },
    hasComment: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // cdnUrl: APP_CONFIG.cdnImageUrl,
      isOpenChildComment: false,
      isOpenEditForm: false,
      idModalConfirmDel: 0,
      avatarDefault
    }
  },
  methods: {
    ...mapActions('newFeed', ['acCreatePostStatusActive']),

    deleteComment (id) {
      this.idModalConfirmDel = id
    },

    closeModalConfirm () {
      this.idModalConfirmDel = 0
    },
    replaceDescription (data, key, isComment = false) {
      if (!data) {
        return
      }
      let contentCurr = data[key] ? data[key] : ''
      // if (!data.listUserContent || data.listUserContent.length === 0) {
      //   return contentCurr
      // }
      // console.log('Data convert', data)
      if (isComment) {
        // eslint-disable-next-line array-callback-return
        data.listUser && data.listUser.length > 0 && data.listUser.map((user) => {
          contentCurr = this.changeContent(contentCurr, isComment, user)
          // const contentLinkUser = `<a id="user_${user.userId}" href="${APP_CONFIG.baseUrl}/profile/${user.userId}/new-feed" class="primary-color cursor-pointer" target="_blank">@${user.fullName}</a>`
          // const contentNoLink = `<a href="javascript:;" rel="noopener noreferrer nofollow" data-niw-user="${user.userId}">${user.fullName}</a>`
          // user.html = contentNoLink
          // contentCurr = contentCurr.replace(`${isComment ? KEY_TAG_USER_CONTENT_COMMENT : KEY_TAG_USER_CONTENT}${user.userId}`, contentLinkUser)
        })
      } else {
        // eslint-disable-next-line array-callback-return
        data.listUserContent && data.listUserContent.length > 0 && data.listUserContent.map((user) => {
          contentCurr = this.changeContent(contentCurr, isComment, user)
          // const contentLinkUser = `<a id="user_${user.userId}" href="${APP_CONFIG.baseUrl}/profile/${user.userId}/new-feed" class="primary-color cursor-pointer" target="_blank">@${user.fullName}</a>`
          // const contentNoLink = `<a href="javascript:;" rel="noopener noreferrer nofollow" data-niw-user="${user.userId}">${user.fullName}</a>`
          // user.html = contentNoLink
          // contentCurr = contentCurr.replace(`${isComment ? KEY_TAG_USER_CONTENT_COMMENT : KEY_TAG_USER_CONTENT}${user.userId}`, contentLinkUser)
        })
      }
      return contentCurr
      // })
    },
    handleRemoveComment () {
      this.$emit('deleted', this.idModalConfirmDel)
      this.closeModalConfirm()
      // this.$respositories.commentRespository.deleteComment(this.idModalConfirmDel).then((res) => {
      //   this.$emit('deleted', this.idModalConfirmDel)
      // })
    },

    editComment (val) {
      this.isOpenEditForm = true
    },
    toggleCommentReply (index) {
      this.isOpenChildComment = !this.isOpenChildComment
      this.$emit('toggleChildComment', index)
    },

    replyComment (index) {
      this.isOpenChildComment = true
      this.$emit('replyComment', index)
    },

    handleCloseEdit () {
      this.isOpenEditForm = false
    },

    handleCommentUpdated (val) {
      this.handleCloseEdit()
      this.$emit('updated', val)
    }

    // handleLikePost (evt, id, dataComment) {
    //   const self = this
    //   const acLikePayload = {
    //     commentId: id,
    //     commentLibraryId: dataComment.commentLibraryId,
    //     typeId: evt.typeId
    //   }
    //   switch (evt.typeId) {
    //     case TYPE_ACTION_DISLIKE:
    //       // if (dataComment.activeTypeId !== TYPE_ACTION_DISLIKE) {
    //       dataComment = self.handleChooseDisLikeBtn(dataComment)
    //       self.$emit('onLike', acLikePayload)
    //       // }
    //       break
    //     case TYPE_ACTION_LOVE:
    //       // if (dataComment.activeTypeId !== TYPE_ACTION_LOVE) {
    //       dataComment = self.handleChooseLoveBtn(dataComment)
    //       self.$emit('onLike', acLikePayload)
    //       // }
    //       break
    //     default:
    //       // if (dataComment.activeTypeId !== TYPE_ACTION_LIKE) {
    //       dataComment = self.handleChooseLikeBtn(dataComment)
    //       self.$emit('onLike', acLikePayload)
    //       // }
    //       break
    //   }
    //   return dataComment
    // }
  }
}
</script>

<style lang="scss" scoped>
.comment-item {
  &__content {
    width: 95%;
    margin-left: 12px;
  }
}
.home-comment__item-cmt {
  &__container {
    background: $color_background;
    padding: 8px 16px;
    .date {
      padding-right: 35px;
    }
    &.edit {
      padding: 0;
    }
  }
  &__feedback {
    padding-top: 8px;
    padding-left: 16px;
    .left {
      &__icons {
        margin-right: 8px;
        a {
          margin-right: 5px;
        }
      }
    }
  }
  &__repcmt {
    margin-bottom: 16px;
    padding-left: 16px;
  }
}
@media (max-width: 425px) {
  .comment-item__content {
    margin-left: 5px;
  }
  .home-comment__item-cmt {
    &__container {
      padding-left: 10px;
      .date {
        padding-right: 25px;
      }
    }
    &__feedback {
      .left {
        &__icons {
          a {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
