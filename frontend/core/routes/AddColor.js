import axios from 'axios'
import React from 'react'
import { csrfTokenHeaders } from '../../__common/csrfToken'
import ColorForm from "./ColorForm"

export default function AddColor() {
  return (
    <ColorForm
      mutationCallback={(formData) => axios.post(`/api/v1/colors/`, formData, csrfTokenHeaders)}
    />
  )
}
