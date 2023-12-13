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
        <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-['person'] after:font-['icon'] after:content-center after:text-center after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400`}>
        </div>
        <span className="ms-3 text-gray-900 dark:text-gray-300">{name}</span>
      </label>
    </div>
  )
}

export default Toggle
