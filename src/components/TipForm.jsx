import { Input, Radio, RadioGroup } from "@headlessui/react";
import { BanknotesIcon, UsersIcon } from "@heroicons/react/16/solid";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { tipOptions } from "../utils.js";

export const TipForm = forwardRef((_props, ref) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const selectedTip = watch("tip");

  const billInputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focusBillInput: () => billInputRef.current?.focus(),
    };
  }, []);

  const { ref: registerBillRef, ...registerBillProps } = register("bill", {
    min: { value: 0.01, message: "Must be greater than 0" },
    required: { value: true, message: "Required" },
    valueAsNumber: true,
  });

  // eslint-disable-next-line no-unused-vars
  const { onChange: _onChange, ...registerTipProps } = register("tip", {
    valueAsNumber: true,
  });

  return (
    <form>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label
            htmlFor="bill"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Bill
          </label>
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden
            >
              <BanknotesIcon className="size-4 text-gray-400" />
            </div>
            <Input
              ref={(ref) => {
                billInputRef.current = ref;
                registerBillRef(ref);
              }}
              type="number"
              id="bill"
              step={0.01}
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 data-[invalid]:text-red-900 data-[focus]:ring-2 data-[focus]:ring-inset data-[focus]:ring-emerald-600 data-[invalid]:data-[focus]:ring-red-500 data-[invalid]:ring-red-300 data-[invalid]:placeholder:text-red-300 sm:text-sm/6"
              placeholder="0.00"
              data-invalid={errors.bill ? true : undefined}
              aria-invalid={errors.bill ? true : undefined}
              aria-describedby="bill-error"
              {...registerBillProps}
            />
          </div>
          {errors.bill ? (
            <p id="bill-error" className="text-sm text-red-600">
              {errors.bill.message?.toString()}
            </p>
          ) : null}
        </div>
        <fieldset className="grid gap-2" aria-label="Choose a tip">
          <div className="text-sm/6 font-medium text-gray-900">Tip %</div>
          <RadioGroup
            name="tip"
            defaultValue={selectedTip}
            className="grid grid-cols-3 gap-3"
            onChange={(option) => setValue("tip", option)}
            {...registerTipProps}
          >
            {tipOptions.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                className="inline-flex cursor-pointer items-center justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold uppercase text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none data-[checked]:bg-emerald-600 data-[checked]:text-white data-[checked]:ring-0 data-[focus]:data-[checked]:ring-2 data-[focus]:ring-2 data-[focus]:ring-emerald-600 data-[focus]:ring-offset-2 data-[checked]:hover:bg-emerald-500 sm:flex-1 [&:not([data-focus])]:[&:not([data-checked])]:ring-inset"
              >
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
        </fieldset>
        <div className="grid gap-2">
          <label
            htmlFor="peopleCount"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Number of people
          </label>
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden
            >
              <UsersIcon className="size-4 text-gray-400" />
            </div>
            <Input
              type="number"
              id="peopleCount"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 data-[invalid]:text-red-900 data-[focus]:ring-2 data-[focus]:ring-inset data-[focus]:ring-emerald-600 data-[invalid]:data-[focus]:ring-red-500 data-[invalid]:ring-red-300 data-[invalid]:placeholder:text-red-300 sm:text-sm/6"
              data-invalid={errors.peopleCount ? true : undefined}
              aria-invalid={errors.peopleCount ? true : undefined}
              aria-describedby="peopleCount-error"
              placeholder="0"
              {...register("peopleCount", {
                min: { value: 1, message: "Must be greater than 0" },
                required: { value: true, message: "Required" },
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.peopleCount ? (
            <p id="peopleCount-error" className="text-sm text-red-600">
              {errors.peopleCount.message?.toString()}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
});
TipForm.displayName = "TipForm";
