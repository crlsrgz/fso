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
      <table>
        <tbody></tbody>
      </table>
      <tr>
        <td>name: </td>{" "}
        <td>
          <input value={newName} onChange={handleNameValue} />
        </td>
      </tr>
      <tr>
        <td>number: </td>{" "}
        <td>
          <input value={newNumber} onChange={handleNumberValue} />
        </td>
      </tr>
      <tr>
        <button type="submit">add</button>
      </tr>
    </form>
  );
}

export default PersonForm;
