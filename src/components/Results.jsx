import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { formatCurrency } from '../utils.js'

export function Results() {
  const {
    watch,
    formState: { isValid },
  } = useFormContext()
  const { bill, tip, peopleCount } = watch()

  const tipPerPerson = isValid ? (bill * tip) / peopleCount : 0
  const totalPerPerson = isValid ? bill / peopleCount + tipPerPerson : 0

  return (
    <dl className="space-y-6">
      <div>
        <dt className="text-sm/6 font-medium text-gray-600">Tip</dt>
        <dd
          className={clsx(
            'mt-2 flex items-baseline gap-x-2 text-4xl font-semibold tracking-tight',
            tipPerPerson === 0 ? 'text-gray-500' : 'text-emerald-600',
          )}
        >
          {formatCurrency(tipPerPerson)}
          <span className="text-sm text-gray-500">/ person</span>
        </dd>
      </div>
      <div>
        <dt className="text-sm/6 font-medium text-gray-600">Total</dt>
        <dd
          className={clsx(
            'mt-2 flex items-baseline gap-x-2 text-4xl font-semibold tracking-tight',
            totalPerPerson === 0 ? 'text-gray-500' : 'text-emerald-600',
          )}
        >
          {formatCurrency(totalPerPerson)}
          <span className="text-sm text-gray-500">/ person</span>
        </dd>
      </div>
    </dl>
  )
}
