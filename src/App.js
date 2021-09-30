import React, { useState, useEffect } from 'react'
import './App.css';
import CustomDropdown from './CustomDropdown';
import axios from 'axios';


function App() {

  const [selectedPosts, setSelectedPosts] = useState([]);
  const [posts, setPosts] = useState([]);


  useEffect(() => {

    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      setPosts(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className="App">
      <h3 title="Custom Dropdown">Custom Dropdown</h3>

      <CustomDropdown role="combobox" title="Data" values={selectedPosts} onChange={(v) => setSelectedPosts(v)} options={posts} />
    </div>
  );
}

export default App;
