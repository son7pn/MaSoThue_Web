import Common from './common/common'
export default ($axios) => {
  return {
    common: Common($axios)
  }
}
