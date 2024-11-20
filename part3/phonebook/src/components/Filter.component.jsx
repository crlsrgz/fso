/**
 * Search Field to filter entries
 * @param {Object} filterPeople - react props
 * @param {string} filterPeople.nameInput - value of searched entry, usually stored in state
 * @param {function} filterPeople.handleSearchName - fired onChange in the input
 * @returns
 */
export default function Filter({ searchName, handleSearchName }) {
  return (
    <form>
      <div>
        search name: <input value={searchName} onChange={handleSearchName} />
      </div>
    </form>
  );
}
