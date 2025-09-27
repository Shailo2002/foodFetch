export const Input = (props) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium  mb-1">
        {props.label}
      </label>
      <input
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        type={props.type}
        className="bg-gray-50 border border-gray-300  text-sm rounded-lg hover:ring-[#ff4d30] hover:border-gray-500 block w-full p-2 mx-2 ml-0 focus:outline-none focus:ring-1 focus:ring-[#ff4d30] focus:border-[#ff4d30]"
      />
    </div>
  );
};
