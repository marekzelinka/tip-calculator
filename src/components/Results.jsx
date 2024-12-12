import { useFormContext } from "react-hook-form";
import { formatCurrency } from "../utils.js";

export function Results() {
  const { watch } = useFormContext();
  const { bill, tip, customTip, peopleCount } = watch();

  const isValid = validateValues({ bill, tip, customTip, peopleCount });

  const tipPerPerson = isValid
    ? (bill * (tip || customTip / 100)) / peopleCount
    : 0;
  const totalPerPerson = isValid ? bill / peopleCount + tipPerPerson : 0;

  const stats = [
    { name: "Tip amount", value: tipPerPerson },
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

function validateValues({ bill, tip, customTip, peopleCount }) {
  const isValidBill = !isNaN(bill) && bill > 0;
  const isValidPeopleCount = !isNaN(peopleCount) && peopleCount > 0;
  const isValidTip =
    (!isNaN(tip) && tip > 0) || (!isNaN(customTip) && customTip > 0);

  return isValidBill && isValidPeopleCount && isValidTip;
}
