import React, { useState } from "react";
import '../App.css';

function Events(props) {
  const [time, setTime] = useState("");
  const[event,setevent] = useState("");


  function cancelHandler(){
    props.onCancel();
  }
  
  function confirmHandler(){
    props.onConfirm(event,time);
  }



  return (
    <form className="formm">
      <div >
      <label className="title">Enter the Event:  </label>
      <input className="textarea" onChange = {(event) => setevent(event.target.value)}
      name="event"
      type="text" />
      

      </div>
      <div>
        <label className="title">Enter the start time:  
        </label>
        <input className="textarea"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="time"
        />
      </div>
      
      <button className='btn btn--alt' onClick={cancelHandler}>Cancel</button>
            <button className='btn' onClick={confirmHandler}>Confirm</button>
      
    </form>
    
  );
}

export default Events;