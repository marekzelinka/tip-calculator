import { UsersIcon } from '@heroicons/react/20/solid'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { tipOptions } from '../utils.js'

export const TipForm = forwardRef((_props, ref) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const { ref: registerBillRef, ...registerBillProps } = register('bill')

  const billInputRef = useRef(null)

  useImperativeHandle(ref, () => {
    return {
      focusBillInput: () => billInputRef.current?.focus(),
    }
  }, [])

  return (
    <form>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="bill"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Bill
          </label>
          <div className="relative mt-2">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden
            >
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              ref={(ref) => {
                billInputRef.current = ref
                registerBillRef(ref)
              }}
              type="number"
              id="bill"
              step={0.01}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 aria-[invalid]:text-red-900 aria-[invalid]:ring-red-300 aria-[invalid]:placeholder:text-red-300 aria-[invalid]:focus:ring-red-500 sm:text-sm/6"
              placeholder="0.00"
              aria-invalid={errors.bill ? true : undefined}
              aria-describedby="bill-error"
              {...registerBillProps}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
              aria-hidden
            >
              <span id="bill-currency" className="text-gray-500 sm:text-sm">
                USD
              </span>
            </div>
          </div>
          {errors.bill ? (
            <p id="bill-error" className="mt-2 text-sm text-red-600">
              {errors.bill.message?.toString()}
            </p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="tip"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Select tip %
          </label>
          <div className="mt-2">
            <select
              id="tip"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 aria-[invalid]:text-red-900 aria-[invalid]:ring-red-300 aria-[invalid]:placeholder:text-red-300 aria-[invalid]:focus:ring-red-500 sm:text-sm/6"
              aria-invalid={errors.tip ? true : undefined}
              aria-describedby="tip-error"
              {...register('tip', {
                required: { value: true, message: 'Required' },
                valueAsNumber: true,
              })}
            >
              {tipOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {errors.tip ? (
            <p id="tip-error" className="mt-2 text-sm text-red-600">
              {errors.tip.message?.toString()}
            </p>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="peopleCount"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Number of people
          </label>
          <div className="relative mt-2">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden
            >
              <UsersIcon className="size-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="peopleCount"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 aria-[invalid]:text-red-900 aria-[invalid]:ring-red-300 aria-[invalid]:placeholder:text-red-300 aria-[invalid]:focus:ring-red-500 sm:text-sm/6"
              aria-invalid={errors.peopleCount ? true : undefined}
              aria-describedby="peopleCount-error"
              placeholder="0"
              {...register('peopleCount', {
                min: { value: 1, message: 'Must be greater than 0' },
                required: { value: true, message: 'Required' },
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.peopleCount ? (
            <p id="peopleCount-error" className="mt-2 text-sm text-red-600">
              {errors.peopleCount.message?.toString()}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  )
})
TipForm.displayName = 'TipForm'
