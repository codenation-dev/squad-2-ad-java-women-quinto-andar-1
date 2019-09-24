import React from 'react';
import './Select.css';

const Select = ({ name, options, ...props }) => (
   <select name={name} {...props}>
    {options.map((option, index) =>
      <option 
        key={`${name}-option-${index}`}
        value={option.value}
      >
        {option.display}
      </option>
    )}
   </select>
)

Select.defaultProps = {
   placeholder: 'Selecione',
   showPlaceholder: true,
}

export default Select;