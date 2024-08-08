import { FormProvider, useForm } from 'react-hook-form'
import { Results } from './components/Results.jsx'
import { TipForm } from './components/TipForm.jsx'
import { tipOptions } from './utils.js'

function App() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: { bill: '', tip: tipOptions[3].value, peopleCount: '' },
  })

  return (
    <main className="isolate flex min-h-svh flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-8 text-balance text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Split your expenses with your{' '}
          <span className="text-emerald-600">friends & colleagues</span>
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] lg:max-w-4xl">
        <div className="bg-white p-2 shadow sm:rounded-lg lg:flex">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <FormProvider {...methods}>
              <TipForm />
            </FormProvider>
          </div>
          <div className="p-2 max-lg:-mt-2 lg:w-full lg:max-w-md lg:flex-none">
            <div className="rounded-md bg-gray-50 p-6 ring-1 ring-inset ring-gray-900/5 lg:flex lg:h-full lg:flex-col">
              <FormProvider {...methods}>
                <Results />
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
