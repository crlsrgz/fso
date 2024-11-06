/**
 *
 * @param {Object} formValues - Object
 * @param {function} formValues.addTelefonNumber
 * @param {string} formValues.newName
 * @param {function} formValues.handleNameValue
 * @param {string} formValues.newNumber
 * @param {function} formValues.handleNumberValue
 * @returns
 */
function PersonForm({
  addTelphoneNumber,
  newName,
  handleNameValue,
  newNumber,
  handleNumberValue,
}) {
  return (
    <form onSubmit={addTelphoneNumber}>
      <div>
        name: <input value={newName} onChange={handleNameValue} />{" "}
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberValue} />
      </div>
      <button type="submit">add</button>
    </form>
  );
}

export default PersonForm;
