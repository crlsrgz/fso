/**
 * Dsiplay the contacts stored in the page
 * @param {Object}  contact - react props
 * @param {Array} contact.contactsArray - array of objects.
 * @param {string} contact.searchName - string used in the search from a state.
 * @returns
 */
const Persons = ({ persons, searchName }) => {
  const arr = persons;
<<<<<<< HEAD
  console.log(arr);
=======
>>>>>>> recover
  return (
    <>
      {arr.map((item) => {
        if (item.name.toLowerCase().includes(searchName.toLowerCase()) || "") {
          return <div key={item.id}>{`${item.name} ${item.number}`} </div>;
        }
      })}
    </>
  );
};

export default Persons;
