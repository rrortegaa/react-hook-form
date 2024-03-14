 'use client'

 import { useForm } from 'react-hook-form'
 import { useState } from 'react'
 import clsx from 'clsx'

 export default function AllergyForm() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [showItem, setShowItem] = useState([])

  const onSubmit = (data) => {
  // // 1. Sacar el valor (allergie) del objeto data
  // const allergie = data.allergie
  // // 2. Agregar el valor (allergie) al array del estado (showItem)
  // showItem.push(allergie)
  // // 3. Actualizar el estado (showItem) mediante su función (setShowItem)
  // setShowItem([...showItem])

    // Los 3 pasos anteriores se pueden reducir usando el spread operator:
    const allergieArray = [...showItem, data.allergie]
    setShowItem(allergieArray)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        'border border-indigo-600 rounded-md',
        'px-6 py-8',
        'w-full lg:w-1/3'
      )}
    >
      <div className='grid grid-cols-3 grid-rows-3 gap-1'>
        <label className={clsx(
          'col-span-3',
          'text-indigo-700'
        )}>
          Ingresa una a una tus alergias y haz click en agregar
        </label>
        <input
          type='text'
          className={clsx(
            'bg-white',
            'block',
            'border border-slate-300 rounded-md',
            'col-span-2 row-start-2',
            'px-3 py-2',
            'text-sm shadow-sm placeholder-slate-400',
            'focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500',
            'disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-800 disabled:shadow-none',
            'invalid:border-pink-500 invalid:text-pink-600',
            'focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
          )}
          {...register('allergie', {
            required: {value: true, message: 'Este campo es requerido'},
            maxLength: {value: 12, message: 'Ingresa 12 carácteres cómo máximo.'},
            minLength: {value: 3, message: "Ingresa 3 carácteres cómo mínimo."}
          })}
        />
        {errors.allergie?.message && 
          <span className='col-start-1 col-end-4 text-pink-600 text-xs'>
            {errors.allergie.message}
          </span>
        }
        <input
          type='submit'
          value='Agregar'
          disabled={errors.allergie?.type}
          className={clsx(
            'bg-indigo-600 hover:bg-indigo-800',
            'col-start-3 row-start-2',
            'cursor-pointer',
            'font-semibold text-white',
            'rounded-md',
            'px-3',
            'disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-800 disabled:shadow-none',
          )}
        />
      </div>
      {showItem.map((item, key) => {
        return (
          <p key={key}>{item}</p>
        )
      })}
    </form>
  )
 }