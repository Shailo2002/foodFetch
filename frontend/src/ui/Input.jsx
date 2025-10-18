export const Input = (props) => {
  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium  mb-1">{props.label}</label>
      <input
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        className={`bg-gray-50 border border-gray-300  text-sm rounded-lg hover:ring-[#ff4d30] hover:border-gray-500 w-full block p-1.5 focus:outline-none focus:ring-1 focus:ring-[#ff4d30] focus:border-[#ff4d30]  ${props.extraStyle}`}
      />
    </div>
  );
};


