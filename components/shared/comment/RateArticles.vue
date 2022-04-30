<template>
  <div class="rate-article">
    <div class="header display-flex-center mg-b-24r">
      <fieldset class="star-rating border-none disabled">
        <template v-for="(item, index) in 6" class="item-star">
          <input
            :id="`rating${index}`"
            :key="index"
            :checked="((rating) ? index===rating : index==0) ? true : false"
            name="rating"
            :value="index"
            type="radio"
          >
          <label :key="index" :for="`rating${index}`" class="cursor-pointer text-center">
            <span role="presentation" class="star"><i v-if="index>0" class="icon-Star display-inline-block" :class="index <= rating && index > 0 ? 'third-color' : 'color-img'" /></span>
          </label>
        </template>
      </fieldset>
      <span class="font-size-20 mg-l-16r">{{ rateArticles.totalRow ? rateArticles.totalRow : 0 }} đánh giá</span>
    </div>
    <div>
      <div v-for="(itemRate, indexRate) of rateArticles.list" :key="indexRate" class="display-flex-center mg-b-16">
        <div class="font-size-20 color-img display-flex-center">
          <span class="font-size-24 primary-color-txt">{{ itemRate.ratingType }}</span> <i class="icon-Star third-color font-size-16 mg-lr-5" />
        </div>
        <div class="use position-rel full-width border-rd-4 bg-color-background overflow-hidden">
          <div
            id="used"
            class="used position-abs border-rd-4 bg-green"
            :style="{ background: '#ffa958', width: `${parseInt(itemRate.percent)}%`, height: '100%' }"
          />
        </div>
        <div>
          <span class="primary-color font-size-20">
            {{ parseInt(itemRate.percent) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { STORE_KEY } from '@/store/company/constants'
export default {
  name: 'RateArticles',
  data () {
    return {
      rating: 3.7
    }
  },
  computed: {
    ...mapState('common', ['rateArticles']),
    ...mapState(STORE_KEY, ['detailCompanyByTax'])
  },
  mounted () {
    this.acGetRateArticles(this.detailCompanyByTax.id)
  },
  methods: {
    ...mapActions('common', ['acGetRateArticles'])
  }
}
</script>

<style lang="scss" scoped>
.rate-article {
  width: 25%;
  margin-bottom: 3rem;
}
.mg-b-16 {
  margin-bottom: 0.4rem;
}
.mg-lr-5 {
  margin-left: 0.2rem;
  margin-right: 0.5rem;
}
.hide-visually, .star-rating>input {
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
  clip: rect(1px, 1px, 1px, 1px); /*maybe deprecated but we need to support legacy browsers */
  clip-path: inset(50%); /*modern browsers, clip-path works inwards from each corner*/
  white-space: nowrap; /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
}

.star-rating {
  display: inline-flex;
  padding: 0;
}

.star-rating label {
  line-height: 1em;
}
.star-rating span.star i {
  margin-right: 8px;
  font-size: 20px;
}
.use {
  height: 0.4rem;
  margin-right: 0.8rem;
  .used {
    content: '';
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
