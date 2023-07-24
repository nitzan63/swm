import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [arr, setArr] = useState<({name:string,phone:string})[]>([]);
  const [message, setMessage] = useState("שלום !!! אתה מוזמן לבר מצווה של איתמר");
  const [nameToDelete, setNameToDelete] = useState("")

  // [x] - input phone
  // [x] - clear text after add
  // [x] - only add a valid name - give errro with alert
  // bonus
  // [x] - add <textarea> for input message template
  // [x] - show preview of how message would look merged, using <pre></pre>

  // HW
  // [x]   - refactor the "replace" into one function
  // [x]  - add button to remove someone from list (tip, use array filter)
  // bonus:
  // [ ] - look into a javascript object called "localStorage" - and save the data between reloads
  // it works partially - it saves any of the objects in the array but the last one. tried to fix it.
  // [ ] - bonus 2 - deploy to github pages https://vitejs.dev/guide/static-deploy.html
  // [ ] - new project as you wish - deploy to github

  // useEffect(() => {
  //   savedDataToLocalStorage(arr);
  // }, [arr]);

  // useEffect(() => {
  //   return () => {
  //     savedDataToLocalStorage(arr); 
  //   };
  // }, [arr]); 
  
  useEffect ( () => {
    const savedData = getDataFromLocalStorage();
    if (savedData)
    setArr(savedData)
  }, [])



  function savedDataToLocalStorage(data: any){ // added the ':any'
    const dataJSON = JSON.stringify(data)
    localStorage.setItem('myDataKey', dataJSON)
  }

  function getDataFromLocalStorage(){
    const dataJSON = localStorage.getItem('myDataKey')
    return JSON.parse(dataJSON!) // added the '!'
  }

  function add() {
    if (name.length < 2) alert("Wrong Name Input!");
    else if (phone.length < 5) alert("Wrong Phone input!") 
    else {
      setMessage(message);
      setArr([...arr, { name, phone: fixedPhone }]);
      setName("");
      setPhone("");
    }

    savedDataToLocalStorage(arr)
  }


  function remove(){
    const foundIndex = arr.findIndex((person)=> person.name === nameToDelete)
    if (foundIndex != -1){
    setArr((prevArr)=> prevArr.filter((person)=>person.name != nameToDelete))
    setNameToDelete("")
    }
    else {
      alert("שם לא קיים ברשימה")
      setNameToDelete("")
    }
    savedDataToLocalStorage(arr)
  }



  const messageTemplate = message.replace(/!!!/g, (name||arr[0]?.name ) || 'ניצן' );
  const fixedPhone = "972" + (phone[0] == "0" ? phone.slice(1) : phone);
  return (
    <>
      <h1 onClick={() => alert("123")}>Hello {1 + 9}</h1>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} /> שם
      </div>
      <div>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} /> טלפון
      </div>
      <button onClick={add}>Add</button>
      <hr/>
      <div>
        <textarea value={message} onChange={(e)=> setMessage(e.target.value)} /> הודעה
      </div>
      <pre>
        ההודעה שלך: 
        {" " + messageTemplate}
      </pre>
      {arr.map((item,index) => {
        return (
          <div key={item.phone}>
            <a
              href={`whatsapp://send?phone=${item.phone}&text=${encodeURI(
                messageTemplate
              )}`}
            >
              {(index+1)+ ". "}
              {item.name}{" "}
            </a>
          </div>
        );
      })}
      <hr/>
      <div>Enter name from the list to delete: </div>
      <div>
        <input value={nameToDelete} onChange={(e) => setNameToDelete(e.target.value)} />
      </div>
      <button onClick={remove}>Remove</button>
    </>
  );
}

export default App;
