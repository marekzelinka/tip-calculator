import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "./components/Form.jsx";
import { Results } from "./components/Results.jsx";
import { tipOptions } from "./utils.js";

function App() {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      bill: "",
      tip: tipOptions[3].value,
      customTip: "",
      peopleCount: "",
    },
  });

  const tipFormRef = useRef(null);

  const handleReset = () => {
    methods.reset();
    tipFormRef.current?.focusBillInput();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-balance text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Tip Calculator
        </h1>
        <p className="mt-2 text-pretty text-center text-sm/6 text-gray-500">
          Split your expenses with your{" "}
          <span className="font-semibold text-teal-600">
            friends & colleagues
          </span>
        </p>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] lg:max-w-4xl">
        <div className="bg-white p-2 shadow sm:rounded-lg lg:flex">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <FormProvider {...methods}>
              <Form ref={tipFormRef} />
            </FormProvider>
          </div>
          <div className="p-2 max-lg:-mt-2 lg:w-full lg:max-w-md lg:flex-none">
            <div className="rounded-md bg-gray-50 p-6 ring-1 ring-inset ring-gray-900/5 lg:flex lg:h-full lg:flex-col">
              <FormProvider {...methods}>
                <Results />
              </FormProvider>
              <div className="mt-10 flex flex-col lg:mt-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!methods.formState.isValid}
                  className="relative inline-flex items-center justify-center gap-x-1.5 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-gray-600 disabled:pointer-events-none disabled:opacity-50"
                >
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    aria-hidden
                  >
                    <ArrowPathIcon className="size-5 text-gray-400" />
                  </div>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
