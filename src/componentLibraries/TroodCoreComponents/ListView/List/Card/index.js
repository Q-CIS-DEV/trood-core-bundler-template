import React from 'react'
import localeService, { intlObject } from '$trood/localeService'
import { EntityPageLink } from '$trood/pageManager'
import { templateApplyValues } from '$trood/helpers/templates'
import TIcon, { ICONS_TYPES } from '$trood/components/TIcon'
import getDataComponent from '$trood/componentLibraries/TroodCoreComponents/internal/helpers/getDataComponent'
import style from './style.css'

const Card = React.memo(
  ({ item, config, fieldList, modelType, hideView, listEditorActions, editable }) => {
    const viewTemplate = config.views.tableCell || config.views.default || `${modelType}/{${config.idField}}`
    const viewLine = hideView
      ? []
      : [
        {
          fieldName: config.idField + 'view',
          fieldLabel: intlObject.intl.formatMessage(localeService.entityMessages[modelType]._objectView),
          component: <EntityPageLink model={item}>{templateApplyValues(viewTemplate, item)}</EntityPageLink>,
        },
      ]

    const lines = fieldList
      .map((fieldName) => {
        return {
          fieldName,
          fieldLabel: intlObject.intl.formatMessage(localeService.entityMessages[modelType][fieldName]),
          component: getDataComponent({ fieldName, config, item }),
        }
      })
      .filter(({ component }) => component)
    return (
      <div className={style.root}>
        {editable && (
          <TIcon
            {...{
              size: 24,
              type: ICONS_TYPES.edit,
              className: style.editIcon,
              onClick: () => listEditorActions.editEntity(item),
            }}
          />
        )}
        {[...viewLine, ...lines].map(({ fieldName, component, fieldLabel }) => (
          <div key={fieldName} className={style.fieldContainer}>
            <div className={style.fieldLabel}>{fieldLabel}</div>
            <div className={style.fieldValue}>{component}</div>
          </div>
        ))}
      </div>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.item[prevProps.config.idField] === nextProps.item[nextProps.config.idField]
  },
)

export default Card
