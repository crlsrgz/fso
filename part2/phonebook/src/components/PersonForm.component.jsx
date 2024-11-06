/**
 * Form to add a new entry
 * @param {Object} formValues - Object
 * @param {function} formValues.addTelephoneNumber - functionality of the form onSubmit
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
    <form onSubmit={addTelephoneNumber}>
      <table>
        <tbody>
          <tr>
            <td>name: </td>
            <td>
              <input value={newName} onChange={handleNameValue} />
            </td>
          </tr>
          <tr>
            <td>number: </td>
            <td>
              <input value={newNumber} onChange={handleNumberValue} />
            </td>
          </tr>
          <button type="submit">add</button>
        </tbody>
      </table>
    </form>
  );
}

export default PersonForm;
