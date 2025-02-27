/**
 * Form to add a new entry
 * @param {Object} formValues - Object
 * @param {string} formValues.newName - name input value from a react state
 * @param {function} formValues.handleNameValue - fired onChange in the name input field
 * @param {string} formValues.newNumber - number input value from a react state
 * @param {function} formValues.handleNumberValue - fired onChange in the number input field

 * @returns
 */
function PersonForm({
  addTelephoneNumber,
  newName,
  handleNameValue,
  newNumber,
  handleNumberValue,
}) {
  return (
    <>
      <form onSubmit={addTelephoneNumber}>
        <div>
          name: <input value={newName} onChange={handleNameValue} />{" "}
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberValue} />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
}

export default PersonForm;
