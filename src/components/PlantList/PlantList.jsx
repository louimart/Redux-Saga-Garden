import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PlantList() {
  const dispatch = useDispatch();

  const reduxState = useSelector((store) => store.plantList);

  useEffect(() => {
    // dispatch an action to request the plantList from the API
    getPlants();
  }, []);

  const getPlants = () => {
    dispatch({ type: 'GET_PLANTS' });
  };

  const handleClickDelete = (id) => {
    dispatch({ type: 'DELETE_PLANT', payload: id});
    // console.log(event.target.name)
    getPlants();
  }

  return (
    <div>
      <h3>This is the plant list</h3>
      {reduxState.map((plant, plantIndex) => {
        console.log(plant.name);
        return (
          <div key={plantIndex}>
            <p>{plant.name} {plant.id}</p>
            <button onClick={(event) => {handleClickDelete(plant.id)}}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default PlantList;
