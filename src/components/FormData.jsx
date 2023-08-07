import React, { useState } from 'react'
import './Form.css';

const FormData = () => {

  const [input, setInput] = useState('');
  const [items, setItems] = useState([ ]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editItems, setEditItems] = useState(null);


  const addData = (e) => {
    e.preventDefault();
    if(!input){
      alert('Please Fill The Data');
    }else if(input && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if(elem.id === editItems){
            return {...elem, name:input};
          }
          return elem;
        })
      )
    }
    else{
      const allInputData = { id: new Date().getTime().toString(), name:input}
      setItems([...items, allInputData])
      setInput('');
    }

  }

  const deleteData = (id) => {
    let updatedItems = items.filter((elem) => {
      return elem.id !== id;
    })
    setItems(updatedItems);
  }

  const editData = (id) => {
    let newEditData = items.find((elem) => {
      return elem.id === id;
    })
    console.log(newEditData);
    setToggleSubmit(false);

    setInput(newEditData.name);
    setEditItems(id); 
  }

  const removeData = () => {
    setItems([])
  }

  return (
    <div>
      <form action="" >
        <div className='container'>
            <div >
                <label htmlFor="">Enter Name</label>
                <input type="text" value={input} placeholder='enter name' onChange={(e) => setInput(e.target.value)} />
                
            </div>
            <div>
              {
                toggleSubmit ? <button  onClick={addData} className='addData' >Add</button> : <button  onClick={addData} className='addData' >Edit</button>
              }
                
                <button className='addData' onClick={removeData} >Remove All</button>
            </div>
        </div>

      </form>
      <div className='showData'>
          {
            items.map( (elem) => {
              return(
                <div className='perdata-list' key={elem.id}>
                    <h3 className='h-data'>{elem.name} 
                      <span className='deleteData' onClick={() => editData(elem.id)}>Edit User</span>
                      <span className='deleteData' onClick={() => deleteData(elem.id)}>Delete User</span>
                    </h3>
                  </div>
              )
            } )
            }
      </div>
    </div>
  )
}

export default FormData;
