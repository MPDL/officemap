"use client"

interface Props {
  name : string,
  state: boolean,
  onChange: () => void,
  color: string,
};

const Toggle = ({name, state, onChange, color} : Props) => {
  return (
    <div className="flex flex-row mb-1.5">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked={state} onChange={onChange}/>
        <div className={`w-11 h-6 bg-gray-200 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-${color}-400`}>
        </div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{name}</span>
      </label>
    </div>
  )
}

export default Toggle
