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

  return (
    <div>
      <h3>This is the plant list</h3>
      {reduxState.map((plant, plantIndex) => {
        console.log(plant.name);
        return (
          <div key={plantIndex}>
            <p>{plant.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PlantList;
