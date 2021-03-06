import defaults from 'lodash/defaults'

import * as actions from './actions'
import * as constants from './constants'
import * as selectors from './selectors'
import container from './container'

import systemConfig from '$trood/config'


const {
  TROOD_PERSONAL_ACCOUNT_PAGE_ID,
  TROOD_PERSONAL_ACCOUNT_PAGE_DEFAULT_TITLE,
  TROOD_PERSONAL_ACCOUNT_PAGE_DEFAULT_ICON,
} = constants

export * from './constants'

const getModelIdSelector = () => selectors.getProfileId
const getModelType = () => ((systemConfig.services || {}).auth || {}).profile
const getPageId = () => TROOD_PERSONAL_ACCOUNT_PAGE_ID
const getPageConfig = (pageConfig) => {
  const profile = getModelType()
  let resultConfig = pageConfig
  if (profile && !pageConfig.components && !pageConfig.pages) {
    resultConfig = defaults(resultConfig, systemConfig.entityPages[profile])
  }
  return { ...resultConfig, id: getPageId() }
}
const getPageContainer = (pageConfig, entityPageName, defaultLayout) => {
  const profile = getModelType()
  const idSelector = getModelIdSelector()
  if (profile && !pageConfig.components && !pageConfig.pages) {
    return defaultLayout.getPageContainer(systemConfig.entityPages[profile], profile, idSelector)
  }
  return defaultLayout.getPageContainer(pageConfig, profile, idSelector)
}
const getPageHeaderRendererConfig = page => ({
  label: page.title || TROOD_PERSONAL_ACCOUNT_PAGE_DEFAULT_TITLE,
  iconType: page.icon || TROOD_PERSONAL_ACCOUNT_PAGE_DEFAULT_ICON,
  localeMessageId: getPageId(),
})

export default {
  actions,
  constants,
  selectors,
  container,
  getPageConfig,
  getPageContainer,
  getPageId,
  getPageHeaderRendererConfig,
  getModelType,
  getModelIdSelector,
}
