import { useFormContext } from "react-hook-form";
import { formatCurrency } from "../utils.js";

export function Results() {
  const {
    watch,
    formState: { isValid },
  } = useFormContext();
  const { bill, tip, peopleCount } = watch();

  const tipPerPerson = isValid ? (bill * tip) / peopleCount : 0;
  const totalPerPerson = isValid ? bill / peopleCount + tipPerPerson : 0;

  const stats = [
    { name: "Tip", value: tipPerPerson },
    { name: "Total", value: totalPerPerson },
  ];

  return (
    <dl className="space-y-6">
      {stats.map((stat) => {
        const disabled = stat.value === 0 ? "" : undefined;

        return (
          <div key={stat.name} data-disabled={disabled}>
            <dt
              className="text-sm/6 font-medium text-gray-500 data-[disabled]:opacity-50"
              data-disabled={disabled}
            >
              {stat.name}
            </dt>
            <dd className="mt-2 flex items-baseline gap-2">
              <span
                className="text-3xl/10 font-medium tracking-tight text-gray-900 data-[disabled]:opacity-50"
                data-disabled={disabled}
              >
                {formatCurrency(stat.value)}
              </span>
              <span
                className="text-xs font-medium text-gray-700 data-[disabled]:opacity-50"
                data-disabled={disabled}
              >
                / person
              </span>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
