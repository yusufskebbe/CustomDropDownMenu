import React, { useEffect, useRef, useState } from 'react'

import classnames from 'classnames';


import useOnClickOutside from './hooks/useOnClickOutside';

//import onClickOutside from 'react-onclickoutside';




function CustomDropdown({ title, options, values, onChange }) {


  const [isActive, setIsactive] = useState(false)
  const [text, setText] = useState("");

  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, handleClose)

  //CustomDropdown.handleClickOutside = () => setIsactive(false);

  function handleClose() {
    setIsactive(false);

  }

  const applyChanges = (newItemId) => {

    onChange && onChange([...values, newItemId - 1])   // && bu eğer varsa devam eder  

  }

  const removeValue = (removeItemId) => {
    onChange && onChange(values.filter(i => i !== removeItemId))
  }

  useEffect(() => {

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  function listener(e) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      console.log("Enter key was pressed. Run your function.");


    }
  };
  function filter(options) {

    return options.filter(option => option.title.toLowerCase().indexOf(text.toLowerCase()) > -1)

  }




  return (
    <div className="dropdown-container">
      <label>{title}</label>
      <div className="dropdown-input">
        <span onClick={() => setIsactive(!isActive)} className="arrow-down"></span>
        <div className="dropdown-values">
          <input className="input" placeholder={" Type..."} onChange={(e) => { setText(e.target.value) }} onClick={() => setIsactive(!isActive)} ></input>
          {
            values.length ? values.map(value => <div key={value} className="dropdown-value">
              {options[value].title}
              <span onClick={() => { removeValue(value) }} className="dropdown-remove">X</span>
            </div>) : null

          }

        </div>
      </div>

      <div ref={dropdownRef} className={classnames('dropdown-options', { 'dropdown-active': isActive })}> {/* buarad isActive olursa dropdwon-active classname devreye girecek  */}
        {filter(options).filter(i => values.findIndex(value => value === i.id - 1) === -1).map(option => <div onKeyPress={(e) => e.key === 'Enter' && listener(e)} onClick={() => { applyChanges(option.id) }} key={option.id} className="dropdown-item">{option.title}

        </div>)}

      </div>
      <button className={classnames('button', { 'button-active': values.length })} onClick={() => { console.log(values) }} type="submit">Submit</button>
    </div>
  )
}

/*const ClickOutsideConfig = {
 handleClickOutside: () => CustomDropdown.handleClickOutside,
};
*/

export default CustomDropdown; // high order componenet 

