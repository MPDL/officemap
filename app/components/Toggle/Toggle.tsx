"use client"

interface Props {
  name : string,
  state: boolean,
  onChange: () => void,
  color: string,
  symbol: string,
};

const Toggle = ({name, state, onChange, color, symbol} : Props) => {
	const colorVariant: {[index: string]: string} = {
		blue: "bg-officemap-blue-400",
		brown: "bg-officemap-brown-400",
		green: "bg-officemap-green-400", 
	}

	const symbolVariant: {[index: string]: string} = {
		person: "after:content-['person']",
		room: "after:content-['meeting\\_room']",
		printer: "after:content-['print']",
		i: "after:content-['meeting\_room']",
	}

	const col = state ? color : "grey";


  return (
    <div className="flex flex-row mb-1.5">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked={state} onChange={onChange}/>
        <div className={`w-11 h-6 gray-200 rounded-full peer peer-checked:after:translate-x-full ${symbolVariant[symbol]} font-normal symbol after:content-center after:text-center after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all`}
					style={{background: col}}>
        </div>
        <span className="ms-3 text-gray-900 dark:text-gray-300">{name}</span>
      </label>
    </div>
  )
}

export default Toggle
