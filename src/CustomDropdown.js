import React, { useEffect, /*useRef*/ useState } from 'react'

import classnames from 'classnames';

import onClickOutside from 'react-onclickoutside';




function CustomDropdown({ title, options, values, onChange }) {


  const [isActive, setIsactive] = useState(false)

  //const ref = useRef(null);

  CustomDropdown.handleClickOutside = () => setIsactive(false);

  const applyChanges = (newItem) => {

    onChange && onChange([...values, newItem])   // && bu eğer varsa devam eder  

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


  // useEffect(() => {
  //   document.addEventListener("click", toggle)
  //   return () => document.removeEventListener("click", toggle)
  // }, [])

  // function toggle(e) {
  //   console.dir([e.target, ref.current]);
  //   setIsactive(e && e.target === ref.current);

  // }



  return (
    <div className="dropdown-container">
      <label>{title}</label>
      <div className="dropdown-input">
        <span onClick={() => setIsactive(!isActive)} className="arrow-down"></span>
        <div className="dropdown-values">
          {
            values.length ? values.map(value => <div key={value} className="dropdown-value">
              {options[value].title} <span onClick={() => { removeValue(value) }} className="dropdown-remove">X</span>
            </div>) : <div className="dropdown-placeholder">Select an item</div>

          }

        </div>
      </div>

      <div className={classnames('dropdown-options', { 'dropdown-active': isActive })}> {/* buarad isActive olursa dropdwon-active classname devreye girecek  */}
        {options.filter(i => values.findIndex(value => value === i.id) === -1).map(option => <div onKeyPress={(e) => e.key === 'Enter' && listener(e)} onClick={() => { applyChanges(option.id) }} key={option.id} className="dropdown-item">{option.title}

        </div>)}

      </div>
      <button className={classnames('button', { 'button-active': values.length })} onClick={() => { console.log(values) }} type="submit">Submit</button>
    </div>
  )
}

const ClickOutsideConfig = {
  handleClickOutside: () => CustomDropdown.handleClickOutside,
};

export default onClickOutside(CustomDropdown, ClickOutsideConfig); // high order componenet 

