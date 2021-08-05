import React, { useState, useEffect } from 'react'
import './App.css';
import CustomDropdown from './CustomDropdown';
import axios from 'axios';

/*const languages = [

  {
    id: 0,
    label: 'javascript',
  },
  {
    id: 1,
    label: 'PHP',
  },

  {
    id: 2,
    label: 'Python',
  },
  {
    id: 3,
    label: 'Go',
  },
  {
    id: 4,
    label: 'C#',
  },

]
*/
function App() {

  const [selectedLanguages, setSelectedLanguges] = useState([]);
  const [posts, setPosts] = useState([]);


  useEffect(() => {

    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      console.log(res.data)
      setPosts(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      <h3>Custom Dropdown</h3>
      <CustomDropdown title="Data" values={selectedLanguages} onChange={(v) => setSelectedLanguges(v)} options={posts} />
    </div>
  );
}

export default App;
