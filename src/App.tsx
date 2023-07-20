import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [arr, setArr] = useState<({name:string,phone:string})[]>([]);
  const [message, setMessage] = useState("שלום !!! אתה מוזמן לבר מצווה של איתמר");
  // [x] - input phone
  // [x] - clear text after add
  // [x] - only add a valid name - give errro with alert
  // bonus
  // [x] - add <textarea> for input message template
  // [x] - show preview of how message would look merged, using <pre></pre>

  function add() {
    if (name.length < 2) alert("Wrong Name Input!");
    else if (phone.length < 5) alert("Wrong Phone input!") 
    else {
      setMessage(message);
      setArr([...arr, { name, phone: fixedPhone }]);
      setName("");
      setPhone("");
    }
  }

  const messageTemplate = message.replace(/!!!/g, (arr[0]?.name || name) || 'ניצן' );
  const fixedPhone = "972" + (phone[0] == "0" ? phone.slice(1) : phone);
  return (
    <>
      <h1 onClick={() => alert("123")}>Hello {1 + 9}</h1>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} /> Name
      </div>
      <div>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} /> Phone
      </div>
      <button onClick={add}>Add</button>
      <hr/>
      <div>
        <textarea value={message} onChange={(e)=> setMessage(e.target.value)} /> Message
      </div>
      <pre>
        Your Message:
        {messageTemplate}
      </pre>
      {arr.map((item) => {
        const specificMessage = messageTemplate.replace(/!!!/g, item.name);
        return (
          <div key={item.phone}>
            <a
              href={`whatsapp://send?phone=${item.phone}&text=${encodeURI(
                specificMessage
              )}`}
            >
              {" "}
              {item.name}{" "}
            </a>
          </div>
        );
      })}
    </>
  );
}

export default App;
