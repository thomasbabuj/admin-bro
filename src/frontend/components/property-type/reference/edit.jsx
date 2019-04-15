import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select/lib/Async'

import ApiClient from '../../../utils/api-client'
import PropertyInEdit from '../../layout/property-in-edit'
import selectStyles from '../../../styles/select-styles'
import { propertyType, recordType } from '../../../types'

export default class Edit extends React.Component {
  handleChange(selected) {
    const { onChange, property } = this.props
    onChange(property.name, selected.value)
  }

  async loadOptions(inputValue) {
    const { property } = this.props
    const api = new ApiClient()

    const records = await api.searchRecords({
      resourceId: property.reference,
      query: inputValue,
    })
    return records.map(r => ({ value: r.id, label: r.title }))
  }

  render() {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]

    return (
      <PropertyInEdit property={property} error={error}>
        <Select
          cacheOptions
          styles={selectStyles}
          defaultOptions
          loadOptions={this.loadOptions.bind(this)}
          onChange={this.handleChange.bind(this)}
        />
      </PropertyInEdit>
    )
  }
}

Edit.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
  onChange: PropTypes.func.isRequired,
}