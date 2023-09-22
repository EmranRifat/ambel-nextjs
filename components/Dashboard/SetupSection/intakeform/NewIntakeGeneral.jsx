import React from "react";

const NewIntakeGeneral = (props) => {
  const { data, setdata } = props;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  return (
    <>
      <div className="bg-white flex flex-col rounded-md shadow-md mt-2">
        {/* div1 */}
        <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
          <span className="text-[16px] text-[#5B5B5B]">
            Name of the form<b className="text-rose-600">*</b>
          </span>
          <input
            type="text"
            required
            placeholder="Circle Studio"
            className={`w-[240px] outline-none rounded-[8px] border-2 py-2 px-4 ${data.name.length === 0 && 'border-[0.5px] border-red-500'}`}
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        {/* div2 */}
        <div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Automatic and manual<b className="text-rose-600">*</b>
            </span>
            <select
              className="w-[240px] outline-none rounded-[8px] border-2 p-3"
              name="automatic"
              onChange={handleChange}
            >
              <option
                selected={data.automatic === "Automatically prompt"}
                value="Automatically prompt"
              >
                Automatically prompt
              </option>
              <option
                selected={data.automatic === "Manually send"}
                value="Manually send"
              >
                Manually send
              </option>
            </select>
          </div>
        </div>
        {/* div3 */}
        <div>
          <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
            <span className="text-[16px] text-[#5B5B5B]">
              Require for new & existing patients to this date
            </span>
            <select
              className="w-[240px] outline-none rounded-[8px] border-2 p-3"
              name="require"
              onChange={handleChange}
            >
              <option
                selected={data.require === "All customers"}
                value="All customers"
              >
                All customers
              </option>
              <option
                selected={data.require === "Only new customers"}
                value="Only new customers"
              >
                Only new customers
              </option>
              <option
                selected={data.require === "Before this date"}
                value="Before this date"
              >
                Before this date
              </option>
              <option
                selected={data.require === "After this date"}
                value="After this date"
              >
                After this date
              </option>
              <option
                selected={data.require === "Specific date range"}
                value="Specific date range"
              >
                Specific date range
              </option>
            </select>
          </div>
        </div>
        {/* div4 */}
        <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
          <span className="text-[16px] text-[#5B5B5B]">Valid for</span>
          <input
            type="text"
            required
            placeholder="Circle Studio"
            name="validFor"
            onChange={handleChange}
            value={data.validFor}
            className={`w-[240px] outline-none rounded-[8px] border-2 py-2 px-4 ${data.validFor.length === 0 && 'border-[0.5px] border-red-500'}`}
          />
        </div>
        {/* div5 */}
        <div className="flex justify-between items-center px-8 py-4 border-b-[2px] border-gray-300">
          <span className="text-[16px] text-[#5B5B5B]">Description</span>
          <textarea
            required
            className={`w-[240px] outline-none rounded-[8px] border-2 py-2 px-2 ${data.description.length === 0 && 'border-[0.5px] border-red-500'}`}
            name="description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
        {/* div6 */}
        <div className="w-full flex justify-end items-end px-3 py-5">
          <button
            className="w-[122px] h-[49px] text-[20px] text-[#5B5B5B] border-2 border-gray-500 bg-white rounded-[8px] mr-4 flex justify-center items-center font-bold">
            Cancel
          </button>
          <button
            className="w-[194px] h-[49px] text-[20px] bg-[#1A535B] rounded-[8px] text-white"
            onClick={() => {
              const a = JSON.stringify(data);
              localStorage.setItem("newIntakeGeneral", a);
              props.handleNext("General");
            }}
          >
            Save and Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NewIntakeGeneral;
