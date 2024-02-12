import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCar } from '../../../redux/cars/slice';
import FormRow from './FormRow';
import { selectCars } from '../../../redux/cars/selector';
import { SelectedCarContext } from '../../../app';
import { Divider } from '../../../components/Divider';
import { TCarForm } from '../../../types';
import RenderCarItems from '../../../components/CarItem';

const initialState: TCarForm = {
  id: getRandomNumber(),
  model: '',
  location: '',
  color: '',
  numOfOwners: '',
  yearOfManufacture: '',
  transmission: '',
  insuranceValidUpto: '',
  externalFitments: '',
  kms: '',
  photoInput: '',
};

function getRandomNumber() {
  return Math.floor(Math.random() * 1000000000).toString();
}

const CarDetailsForm = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);

  const { selectedCar } = React.useContext(SelectedCarContext);

  // using the selected car context to set the model in the form
  const [formValues, setFormValues] = useState<TCarForm>({
    ...initialState,
    model: selectedCar,
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      model: selectedCar,
    });
  }, [formValues, selectedCar]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedData = { ...formValues, id: getRandomNumber() };
    dispatch(addCar(submittedData));
    resetFormValues();
  };

  const resetFormValues = () => {
    setFormValues(initialState);
  };

  return (
    <div className="grid  grid-cols-2 gap-2 py-5">
      <div className="max-h-fit rounded-md bg-white p-5 shadow-sm ring-1 ring-zinc-200">
        <div>
          <h5 className="text-xl font-semibold text-blue-500">
            {selectedCar} Car Details
          </h5>
          <Divider />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 py-2">
              <div>
                <FormRow
                  name="model"
                  label="Model"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
                <FormRow
                  name="color"
                  label="Color"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
                <FormRow
                  name="yearOfManufacture"
                  label="Year of Manufacture"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
                <FormRow
                  name="insuranceValidUpto"
                  label="Insurance Valid Upto"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
                <FormRow
                  name="kms"
                  label="Kms"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </div>
              <div>
                <FormRow
                  name="location"
                  label="Location"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
                <FormRow
                  name="numOfOwners"
                  label="No Of Owners"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
                <FormRow
                  name="transmission"
                  label="Transmission"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
                <FormRow
                  name="externalFitments"
                  label="External Fitments"
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
                <FormRow
                  name="photoInput"
                  label="Photo"
                  formValues={formValues}
                  setFormValues={setFormValues}
                  type="file"
                />
              </div>
            </div>
            <Divider />
            <div className="flex flex-row justify-end gap-2 py-2">
              <button
                type="reset"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={resetFormValues}
              >
                Reset
              </button>
              <button
                disabled={!formValues.model || !formValues.location}
                type="submit"
                className="disabled:focus-visible:outline-disabled rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600 disabled:focus-visible:outline-2 disabled:focus-visible:outline-offset-2 disabled:focus-visible:outline-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="max-h-[550px] rounded-md bg-white p-5 shadow-sm ring-1 ring-zinc-200">
        <h5 className="text-lg font-semibold">Added Car Details:</h5>
        <Divider />
        {cars?.length > 0 && <RenderCarItems cars={cars} />}
      </div>
      <div className="max-h-[550px] overflow-auto rounded-md bg-white p-5 shadow-sm ring-1 ring-zinc-200">
        {cars?.length > 0 && <pre>{JSON.stringify(cars, null, 4)}</pre>}
      </div>
    </div>
  );
};

export default CarDetailsForm;
