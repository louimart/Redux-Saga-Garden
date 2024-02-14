import React, { useState }from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({name: '', });

    const handleNameChange = (event) => {
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, name: event.target.value})
    }

    const addNewPlant = event => {
        event.preventDefault();
        // dispatch({ type: 'ADD_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        // setPlant({id:newPlant.id + 1, name: ''})
        
        dispatch({ type: 'POST_PLANTS', payload: newPlant});
    }
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <input type='text' value={newPlant.name} placeholder='name' onChange={handleNameChange} />
                <input type='text' value={newPlant.kingdom} placeholder='kingdom' onChange={handleNameChange} />
                <input type='text' value={newPlant.clade} placeholder='clade' onChange={handleNameChange} />
                <input type='text' value={newPlant.order} placeholder='order' onChange={handleNameChange} />
                <input type='text' value={newPlant.family} placeholder='family' onChange={handleNameChange} />
                <input type='text' value={newPlant.subfamily} placeholder='subfamily' onChange={handleNameChange} />
                <input type='text' value={newPlant.genus} placeholder='genus' onChange={handleNameChange} />
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default PlantForm;
