import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { csrfTokenHeaders } from '../../__common/csrfToken'
import useColors from '../../__common/queries/useColors'
import ColorForm from "./ColorForm"

export default function EditColor() {
  const { colorId: id } = useParams()

  const { detail } = useColors()
  const { data: color } = detail(id)

  return color ?
    <>
      <ColorForm
        initialValues={color}
        mutationCallback={(formData) => axios.put(`/api/v1/colors/${color.id}/`, formData, csrfTokenHeaders)}
      />

      <DeleteButton color={color} />
    </>
    : null
}

function DeleteButton({ color }) {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const mutation = useMutation(
    () => axios.delete(`/api/v1/colors/${color.id}/`, csrfTokenHeaders),
    {
      onError: ({ response: { status, statusText, data: { detail } } }) => {
        alert(`${status} ${statusText}: ${detail}`)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['colors'])
        navigate('/')
      },
    }
  )

  function handleClick(e) {
    if (confirm(`Are you sure you want to delete the color ${color.name}?`)) {
      mutation.mutate()
    }
  }

  return (
    <button
      type="button"
      className="btn btn-outline-danger"
      onClick={handleClick}>
      Delete
    </button>
  )
}
