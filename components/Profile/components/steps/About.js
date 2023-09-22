import { InputField, SelectOption } from "../InputField";
import React from "react";
import { FileUpload } from "../FileUpload";
// import { returnOnlyDigit } from '../../../../utils/utility';

export default function About({ userData, onChangeUserData, onFileChange, percentage ,temp}) {

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChangeUserData({ name, value });
  }
  var sixCharsRegEx = /^.{6,7}$/;
  sixCharsRegEx.test('1234567'); // true
  sixCharsRegEx.test('123567'); // true

  return <React.Fragment>
    {
      <div className="flex flex-col justify-around lg:flex-row my-8 w-full">
        <div className="lg:w-2/4 w-full flex md:flex-row flex-col justify-center items-center md:items-start">
          <FileUpload
            label='Profile Image'
            category='photo'
            onFileChange={onFileChange}
            file={userData['photo']}
            percentage={percentage}
            temp={temp}
          />
        </div>
        <div className="w-full flex flex-col justify-center lg:w-2/4 px-2 sm:px-5 lg:px-0">
          <small className='text-indigo-600 py-2 mt-5 lg:mt-0 lg:py-0'>All star(*) fields are required</small>
          <InputField
            handleChange={handleChange}
            userData={userData}
            //  readOnly={true}
            name='userName'
            required
            type='text'
            minLength={6}
            maxLength={18}
            onKeyPress={(e) => {
              if (!/[a-zA-Z0-9_]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            placeholder='Username *'
          />
          {/* {!/^.{6,7}$/.test(userData.userName) ? <small className='text-indigo-500'>Username must be 6-7 characters</small> : null} */}
          <InputField handleChange={handleChange} userData={userData} name='address' type='text' placeholder='Address' />
          <InputField handleChange={handleChange} userData={userData} name='country' type='text' placeholder='Country' />
          <InputField handleChange={handleChange} userData={userData} name='city' type='text' placeholder='City' />
          <InputField handleChange={handleChange} userData={userData} name='zipCode' type='text' placeholder='Zip' />
          <InputField
            handleChange={handleChange}
            userData={userData}
            name='phoneNumber'
            type='number'
            placeholder='Phone number'
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          <SelectOption
            handleChange={handleChange}
            userData={userData}
            name="gender"
            values={['Male', 'Female', 'Others']}
            placeholder="Select your Gender" />
        </div>
      </div>
    }
  </React.Fragment>
}
