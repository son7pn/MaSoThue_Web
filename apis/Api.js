import Common from './common/Common'
import CommentRespository from './CommentRespository'
import CompanyRespository from './CompanyRespository'

export default ($axios) => {
  return {
    common: Common($axios),
    commentApi: CommentRespository($axios),
    companyApi: CompanyRespository($axios)
  }
}
