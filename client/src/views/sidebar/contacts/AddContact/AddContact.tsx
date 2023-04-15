import React, { useState } from 'react';
import InputText from '../../../../components/Form/InputText';
import Autocomplete from "react-autocomplete";
import axios from '../../../../configuration/axios';
interface AddContactProp {
    onClose: () => void
}

const AddContact = ({ onClose }: AddContactProp) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState({
    label: '',
    value: '',
    _id: '',
  });

  const getOptions = async (value: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/user/search/${value}`)

      setOptions(response.data.map((el: any) => {
        return {
          label: `${el.firstName || ''} ${el.lastName || ''}`,
          value: el.email,
          _id: el._id
        }
      }));
      console.log("response.data", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (event: React.ChangeEvent, value: string) => {
    setValue({
      label: value,
      value: value,
      _id: "",
    })
    if (value !== '') {
      getOptions(value);
    } else {
      setOptions([]);
    }
  }

  return (
      <div className='create-group-modal'>
        <Autocomplete
          getItemValue={(item) => item.value}
          items={options}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.label}
            </div>
          }
          value={value.label}
          onChange={handleInputChange}
          onSelect={(val: any) => {
            const selected = options.filter((el: any) => el.value === val);
            setValue(selected[0]);
          }}
        />
        <div className="custom-input">
          <label htmlFor="group-desc" className='custom-input-label'>Invatation Message</label>
          <textarea 
            name="group-desc" rows={5} 
            className="group-desc"
            placeholder='Enter Description'
          >

          </textarea>
        </div>
    </div>
  );
};

export default AddContact;
