import React from 'react'
import BaseComponent from 'core/BaseComponent'
import { Component } from 'core/pageStore'

const Context = ({ context, components }) => {
  const componentsStore = Component.create({ components })
  
  return <BaseComponent $context={ context } component={componentsStore} />
}

export default Context