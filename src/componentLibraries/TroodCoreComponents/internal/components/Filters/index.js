import React from 'react'
import PeriodSelector from '$trood/components/PeriodSelector'
import TButton, { BUTTON_TYPES } from '$trood/components/TButton'
import { camelToLowerSnake, snakeToCamel } from '$trood/helpers/namingNotation'
import DropdownFilter from './DropdownFilter'
import NumberFilter from './NumberFilter'
import BoolFilter from './BoolFilter'
import { getInterval } from '$trood/helpers/dateTime'
import localeService, { intlObject } from '$trood/localeService'
import basePageLayout from '$trood/styles/basePageLayout.css'
import style from './style.css'

const Filters = ({ filters, config, form, formActions, entities, PageChildContainer }) => {
  const getLabel = (fieldName) => {
    return entities
      ? intlObject.intl.formatMessage(localeService.entityMessages[entities.modelType][fieldName])
      : fieldName
  }

  const resetFilters = () => {
    const value = {}
    filters.forEach((fieldName) => {
      value[camelToLowerSnake(fieldName)] = null
    })
    formActions.changeSomeFields(value)
  }
  if (!form.isFiltersOpen) return null
  return (
    <div className={basePageLayout.blockHeaderSubContainer}>
      <div className={basePageLayout.blockFiltersContainer}>
        {filters
          .map((fieldName) => {
            const fieldNameSnake = camelToLowerSnake(fieldName)
            const field = config.meta[fieldName]
            if (!field) {
              console.warn(`Filter field '${fieldName}' is not exists in model`)
              return null
            }
            if (field.type === 'string') return null
            const value = form[fieldNameSnake]
            const onChange = (val) => formActions.changeField(fieldNameSnake, val)
            const label = getLabel(fieldName)
            if (field.linkType) {
              const linkName = snakeToCamel(field.linkMeta)
              return (
                <DropdownFilter
                  {...{
                    key: fieldName,
                    value,
                    fieldName,
                    onChange,
                    linkName,
                    label,
                    PageChildContainer,
                  }}
                />
              )
            }
            if (field.type === 'datetime') {
              const periodValue = value || {}
              return (
                <PeriodSelector
                  {...{
                    key: fieldName,
                    label,
                    periodType: periodValue.periodType,
                    startDate: periodValue.startDate,
                    endDate: periodValue.endDate,
                    onSubmit: ({ startDate, endDate, periodType }) =>
                      onChange({
                        startDate,
                        endDate,
                        periodType: periodType || periodValue.periodType,
                        interval: getInterval(startDate, endDate),
                      }),
                  }}
                />
              )
            }
            if (field.type === 'number') {
              return <NumberFilter {...{ key: fieldName, value, label, onChange }} />
            }
            if (field.type === 'bool') return <BoolFilter {...{ key: fieldName, value, label, onChange }} />
            return null
          })
          .filter((v) => v)}
        <TButton
          {...{
            className: style.resetButton,
            label: intlObject.intl.formatMessage(localeService.generalMessages.reset),
            onClick: resetFilters,
            type: BUTTON_TYPES.text,
          }}
        />
      </div>
    </div>
  )
}

export default Filters
