import { BanknotesIcon, UsersIcon } from "@heroicons/react/16/solid";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { tipOptions } from "../utils";

export const Form = forwardRef((_props, ref) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    resetField,
  } = useFormContext();

  // Used to focus bill input after reset
  const billInputRef = useRef(null);

  // Extract the ref, because we need to also attach the `billInputRef`
  const { ref: registerBillRef, ...registerBillProps } = register("bill", {
    min: { value: 0.01, message: "Must be greater than 0" },
    required: { value: true, message: "Required" },
    valueAsNumber: true,
  });

  useImperativeHandle(ref, () => {
    return {
      focusBillInput: () => billInputRef.current?.focus(),
    };
  }, []);

  // Needed to set the default value for <RadioGroup />
  const tip = watch("tip");

  return (
    <form className="space-y-6">
      <div>
        <label
          htmlFor="bill"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Bill
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            ref={(ref) => {
              billInputRef.current = ref;
              registerBillRef(ref);
            }}
            id="bill"
            type="number"
            step={0.01}
            placeholder="0.00"
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 aria-invalid:text-red-900 aria-invalid:outline-red-300 aria-invalid:placeholder:text-red-300 aria-invalid:focus:outline-red-600 sm:pl-9 sm:text-sm/6"
            aria-invalid={errors.bill ? true : undefined}
            aria-describedby="bill-error"
            {...registerBillProps}
          />
          <BanknotesIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4" />
        </div>
        {errors.bill ? (
          <p id="bill-error" className="mt-2 text-sm text-red-600">
            {errors.bill.message?.toString()}
          </p>
        ) : null}
      </div>
      <fieldset>
        <legend className="block text-sm/6 font-medium text-gray-900">
          Tip %
        </legend>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {tipOptions.map((option) => (
            <div key={option.value}>
              <input
                id={option.value}
                type="radio"
                value={option.value}
                defaultChecked={option.value === tip}
                className="peer hidden"
                {...register("tip", {
                  valueAsNumber: true,
                  onChange: () => {
                    resetField("customTip");
                  },
                })}
              />
              <label
                htmlFor={option.value}
                className="flex cursor-pointer items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 uppercase ring-1 ring-gray-300 not-peer-focus:not-peer-checked:ring-inset peer-checked:bg-teal-600 peer-checked:text-white peer-checked:ring-0 peer-focus:ring-2 peer-focus:ring-teal-600 peer-focus:ring-offset-2 peer-focus:peer-checked:ring-2 hover:bg-gray-50 peer-checked:hover:bg-teal-500 focus:outline-hidden sm:flex-1"
              >
                {option.label}
              </label>
            </div>
          ))}
          <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-teal-600 has-aria-invalid:outline-red-300 focus-within:has-aria-invalid:outline-red-600">
            <input
              type="number"
              placeholder="75%"
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none aria-invalid:text-red-900 aria-invalid:placeholder:text-red-300 sm:text-sm/6"
              aria-label="Custom tip"
              aria-invalid={errors.customTip ? true : undefined}
              aria-describedby="customTip-error"
              {...register("customTip", {
                min: {
                  value: 0,
                  message: "Custom tip must be 0 or more",
                },
                valueAsNumber: true,
                onChange: () => {
                  setValue("tip", "");
                },
              })}
            />
            <div
              className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
              aria-hidden
            >
              %
            </div>
          </div>
        </div>
        {errors.customTip ? (
          <p id="customTip-error" className="mt-2 text-sm text-red-600">
            {errors.customTip.message?.toString()}
          </p>
        ) : null}
      </fieldset>
      <div>
        <label
          htmlFor="peopleCount"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Number of people
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            id="peopleCount"
            type="number"
            placeholder="0"
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-3 pl-10 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 aria-invalid:text-red-900 aria-invalid:outline-red-300 aria-invalid:placeholder:text-red-300 aria-invalid:focus:outline-red-600 sm:pl-9 sm:text-sm/6"
            aria-invalid={errors.peopleCount ? true : undefined}
            aria-describedby="peopleCount-error"
            {...register("peopleCount", {
              min: { value: 1, message: "Must be greater than 0" },
              required: { value: true, message: "Required" },
              valueAsNumber: true,
            })}
          />
          <UsersIcon className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4" />
        </div>
        {errors.peopleCount ? (
          <p id="peopleCount-error" className="mt-2 text-sm text-red-600">
            {errors.peopleCount.message?.toString()}
          </p>
        ) : null}
      </div>
    </form>
  );
});
Form.displayName = "Form";
