/**
 * Dsiplay the contacts stored in the page
 * @param {Object}  contact - react props
 * @param {Array} contact.contactsArray - array of objects.
 * @param {string} contact.searchName - string used in the search from a state.
 * @returns
 */
const Persons = ({ persons, searchName, deleteEntry }) => {
  return (
    <>
      {persons.map((item) => {
        if (item.name.toLowerCase().includes(searchName.toLowerCase()) || "") {
          return (
            <div key={item.id} id={item.id}>
              <span className="name">{`${item.name}`}</span>{" "}
              <span>{`${item.number}`}</span>
              <button onClick={deleteEntry} data-button-id={item.id}>
                delete
              </button>
            </div>
          );
        }
      })}
    </>
  );
};

export default Persons;
