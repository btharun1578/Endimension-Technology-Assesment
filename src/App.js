
//import 'antd/dist/antd.css';
import './App.css';
import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react"
import AddPage from './components/AddPage';
import TablePage from './components/TablePage';
import { useArrayContext } from './Context';
// import {Link, withRouter,Switch,Route,Redirect}  from 'react-router-dom'

const App = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const category= ["Books", "Clothing", "Electronics"]
  const [selectedCategory, setSelectedCategory] = useState()

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onChangeCategory = (e) => {
    setSelectedCategory(e,"eee")
  }

useEffect(() => {
  console.log(name,description,selectedCategory);
}, [name,description,selectedCategory])

  /**const doFilters = () => {
    console.log(name, description, category)
  }**/

  return (
    <div className="App">
      <div className="main-data">
        <div className="heading">
          <h1>Product Management Application</h1>
        </div>

        <div className="filter-box  ">
          <p className="filter"> Filter-</p>
          <Input className="input" onChange={onChangeName} placeholder="Name"></Input>
          <Input className="input" onChange={onChangeDescription} placeholder="Description"></Input>
          <Select className="input" onChange={onChangeCategory} placeholder="Category" value={selectedCategory}>
            {category.map((fruit, index) => {
              return <Select.Option key={index} value={fruit}>{fruit}</Select.Option>
            })}
          </Select>
          
        </div>
        <TablePage searchName={name} searchDescription={description} searchCategory={selectedCategory} />
        {/* <AddPage/> */}

      </div>
    </div>
  )
}

export default App;
