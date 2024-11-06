const Persons = ({ persons, searchName }) => {
  const arr = persons;
  console.log(arr);
  arr.map((item) => {
    console.log(item.name);
  });
  return (
    <>
      {arr.map((item) => {
        console.log(item.name);
        if (item.name.toLowerCase().includes(searchName.toLowerCase()) || "") {
          return <div key={item.id}>{`${item.name} ${item.number}`} </div>;
        }
      })}
    </>
  );
};

export default Persons;
