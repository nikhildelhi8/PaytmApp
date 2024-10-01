export const Input = ({ label , placeholder , onChange }) => {
  return (
    // <div className="flex flex-col px-6 py-10">
    //   <label className="text-left font-semibold text-xl pb-3">{label}</label>
    //   <input
    //     placeholder={"Enter " + label}
    //     className="hover: shadow-xl bg-white border border-gray-300 p-2"
    //   ></input>
    // </div>

    <div className="flex flex-col justify-center px-6 py-3 bg-gray-100">
      <label className="text-left font-bold text-xl pb-3">{label}</label>
      <input
        placeholder={placeholder} 
        onChange={onChange}
        className="shadow-2xl bg-white border border-gray-300 p-3 rounded"
      />
    </div>
  );
};
