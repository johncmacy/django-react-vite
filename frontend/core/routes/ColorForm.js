import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({

  name: Yup.string().required().max(20, 'Too long'),

  is_primary: Yup.boolean(),

  red: Yup.number('Not a valid number')
    .required('Required')
    .min(0, 'Must be in the range of 0 to 255')
    .max(255, 'Must be in the range of 0 to 255'),

  green: Yup.number('Not a valid number')
    .required('Required')
    .min(0, 'Must be in the range of 0 to 255')
    .max(255, 'Must be in the range of 0 to 255'),

  blue: Yup.number('Not a valid number')
    .required('Required')
    .min(0, 'Must be in the range of 0 to 255')
    .max(255, 'Must be in the range of 0 to 255'),

})

export default function ColorForm({ initialValues = {}, mutationCallback }) {
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const mutation = useMutation(
    mutationCallback,
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={mutation.mutate}
    >

      {({ values, errors, dirty, isSubmitting, ...props }) => (
        <Form>

          <fieldset
            disabled={isSubmitting}
            style={{
              display: 'grid',
              gridAutoFlow: 'column',
              gridTemplateRows: 'auto auto',
              gap: '1em',
            }}>

            <label>Name</label>
            <Field
              name="name"
              placeholder="Gold"
            />

            <label>Is Primary Color?</label>
            <Field
              name="is_primary"
              type="checkbox"
            />

            <label>Red</label>
            <Field
              name="red"
              type="number"
              min="0"
              max="255"
              placeholder="255"
            />

            <label>Green</label>
            <Field
              name="green"
              type="number"
              min="0"
              max="255"
              placeholder="215"
            />

            <label>Blue</label>
            <Field
              name="blue"
              type="number"
              min="0"
              max="255"
              placeholder="0"
            />
          </fieldset>

          <div className="mt-8 flex justify-end" style={{ gap: '0.5em' }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={Object.keys(errors).length || !dirty}
            >
              Add color
            </button>
            <Link to="/" className="btn btn-outline-primary">Cancel</Link>
          </div>

          {/* <pre>{JSON.stringify({ values, errors, ...props }, null, 2)}</pre> */}
        </Form>
      )}

    </Formik>
  )
}
