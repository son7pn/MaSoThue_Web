import Common from './common/Common'
import CommentRespository from './CommentRespository'
export default ($axios) => {
  return {
    common: Common($axios),
    commentApi: CommentRespository($axios)
  }
}
