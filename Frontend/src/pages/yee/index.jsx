import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const cities = [
  {
    id: 1,
    name: "臺北",
  },
  {
    id: 2,
    name: "新北",
  },
  {
    id: 3,
    name: "基隆",
  },
  {
    id: 4,
    name: "新竹",
  },
  {
    id: 5,
    name: "桃園",
  },
  {
    id: 6,
    name: "宜蘭",
  },
  {
    id: 7,
    name: "臺中",
  },
  {
    id: 8,
    name: "苗栗",
  },
  {
    id: 9,
    name: "彰化",
  },
  {
    id: 10,
    name: "南投",
  },
  {
    id: 11,
    name: "雲林",
  },
  {
    id: 12,
    name: "高雄",
  },
  {
    id: 13,
    name: "臺南",
  },
  {
    id: 14,
    name: "嘉義",
  },
  {
    id: 15,
    name: "屏東",
  },
  {
    id: 16,
    name: "澎湖",
  },
  {
    id: 17,
    name: "花蓮",
  },
  {
    id: 18,
    name: "臺東",
  },
  {
    id: 19,
    name: "金門",
  },
  {
    id: 20,
    name: "連江",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [selected, setSelected] = useState("");

  const show = (option) => {
    console.log(option);
  };

  return (
    <div className="w-3/6">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              Location
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="h-10 relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">請選擇縣市</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {cities.map((city) => (
                    <Listbox.Option
                      key={city.id}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={city}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {city.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                          {selected && show(city.name)}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
