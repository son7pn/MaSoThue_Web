<template>
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
        <span role="presentation" class="star"><i v-if="index>0" class="icon-Star display-inline-block" :class="index <= rating && index > 0 ? 'yellow-color' : 'color-img'" /></span>
      </label>
    </template>
  </fieldset>
</template>

<script>
export default {
  name: 'RateStar',
  props: {
    rating: {
      type: Number,
      default: Number
    }
  }
}
</script>

<style lang="scss" scoped>
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

// .star-rating input:checked~label>span.star>i,
// .star-rating>label:hover~input~label>span.star>i {
//   color: $color_background_image;
// }

// .star-rating span.star i,
// .star-rating:hover>input+label>span.star>i,
// .star-rating>input:checked+label>span.star>i,
// .star-rating>input~label:hover>span.star>i {
//   color: $yellow_color;
// }
.star-rating span.star i {
  margin-right: 8px;
  font-size: 12px;
}
// .star-rating>input~label:hover>span.star>i {
//   color: $third_color;
// }
</style>
