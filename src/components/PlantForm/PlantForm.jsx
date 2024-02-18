import React, { useState }from 'react';
import { useDispatch } from 'react-redux';

const PlantForm = () => {
    const dispatch = useDispatch();

    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({ name: '', kingdom: '', clade: '', order: '', family: '', subfamily: '', genus: '' });

    const handleNameChange = (event) => {
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        // setPlant({...newPlant, name: event.target.value})
        setPlant({...newPlant, name: event.target.value})
    }
    const handleKingdomChange = (event) => {
        setPlant({...newPlant, kingdom: event.target.value})
    }
    const handleCladeChange = (event) => {
        setPlant({...newPlant, clade: event.target.value})
    }
    const handleOrderChange = (event) => {
        setPlant({...newPlant, order: event.target.value})
    }
    const handleFamilyChange = (event) => {
        setPlant({...newPlant, family: event.target.value})
    }
    const handleSubfamilyChange = (event) => {
        setPlant({...newPlant, subfamily: event.target.value})
    }
    const handleGenusChange = (event) => {
        setPlant({...newPlant, genus: event.target.value})
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
            {/* <h3>This is the form</h3>
            <pre>Name: {JSON.stringify(newPlant.name)}</pre>
            <pre>Kingdom: {JSON.stringify(newPlant.kingdom)}</pre>
            <pre>Clade: {JSON.stringify(newPlant.clade)}</pre>
            <pre>Family: {JSON.stringify(newPlant.family)}</pre>
            <pre>Subfamily: {JSON.stringify(newPlant.subfamily)}</pre>
            <pre>Genus: {JSON.stringify(newPlant.genus)}</pre> */}
            <form onSubmit={addNewPlant}>
              <label>Name: </label>
                <input type='text' value={newPlant.name} placeholder='name' onChange={handleNameChange} />
                <br/>
                <label>Kingdom: </label>
                <input type='text' value={newPlant.kingdom} placeholder='kingdom' onChange={handleKingdomChange} />
                <br/>
                <label>Clade: </label>
                <input type='text' value={newPlant.clade} placeholder='clade' onChange={handleCladeChange} />
                <br/>
                <label>Order: </label>
                <input type='text' value={newPlant.order} placeholder='order' onChange={handleOrderChange} />
                <br/>
                <label>Family: </label>
                <input type='text' value={newPlant.family} placeholder='family' onChange={handleFamilyChange} />
                <br/>
                <label>Subfamily: </label>
                <input type='text' value={newPlant.subfamily} placeholder='subfamily' onChange={handleSubfamilyChange} />
                <br/>
                <label>Genus: </label>
                <input type='text' value={newPlant.genus} placeholder='genus' onChange={handleGenusChange} />
                <br/>
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default PlantForm;
