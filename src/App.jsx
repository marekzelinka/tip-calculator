import { Button } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Results } from "./components/Results.jsx";
import { TipForm } from "./components/TipForm.jsx";
import { tipOptions } from "./utils.js";

function App() {
  const methods = useForm({
    mode: "onChange",
    defaultValues: { bill: "", tip: tipOptions[3].value, peopleCount: "" },
  });

  const tipFormRef = useRef(null);

  const handleReset = () => {
    methods.reset();
    tipFormRef.current?.focusBillInput();
  };

  return (
    <main className="isolate flex min-h-svh flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-balance text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Tip Calculator
        </h1>
        <p className="mt-2 text-pretty text-center text-sm/6 text-gray-600">
          Split your expenses with your{" "}
          <span className="font-semibold text-emerald-600">
            friends & colleagues
          </span>
        </p>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] lg:max-w-4xl">
        <div className="bg-white p-2 shadow sm:rounded-lg lg:flex">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <FormProvider {...methods}>
              <TipForm ref={tipFormRef} />
            </FormProvider>
          </div>
          <div className="p-2 max-lg:-mt-2 lg:w-full lg:max-w-md lg:flex-none">
            <div className="rounded-md bg-gray-50 p-6 ring-1 ring-inset ring-gray-900/5 lg:flex lg:h-full lg:flex-col">
              <FormProvider {...methods}>
                <Results />
              </FormProvider>
              <div className="mt-10 flex flex-col lg:mt-auto">
                <Button
                  type="button"
                  onClick={handleReset}
                  disabled={!methods.formState.isValid}
                  className="relative rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm data-[disabled]:pointer-events-none data-[hover]:bg-gray-700 data-[disabled]:opacity-50 data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-gray-900"
                >
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    aria-hidden
                  >
                    <ArrowPathIcon className="size-4 text-gray-400" />
                  </div>
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
