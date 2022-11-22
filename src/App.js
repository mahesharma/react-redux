import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./App.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Events from "./components/events";
import axios from "axios";

import { changeModalstateaction } from "./redux/reducer";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [todo, settodo] = useState([]);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  const ModalIsOpen = useSelector((state) => state.event.modalIsOpen);

  function deleteHandler() {
    dispatch(changeModalstateaction.changeModalstate(true));

    //setModalIsOpen(true);
  }

  function shutModalHandler() {
    dispatch(changeModalstateaction.changeModalstate(false));
    //setModalIsOpen(false);
  }

  function sendevent(event, time) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: event,
        date: date.toDateString(),
        time: time,
      }),
    };
    fetch("http://localhost:8000/api/events/", requestOptions).then(
      (response) => {
        getList(date);
        return response.json();
      }
    );
    dispatch(changeModalstateaction.changeModalstate(false));
    //setModalIsOpen(false);
  }

  useEffect(() => {
    getList();
  }, [date]); // in useEffect 1st parameter is a function and second is a dependency variable, if it changes useeffect will rerender.

  const getList = async (date) => {
    // axios
    // .get('http://localhost:8000/api/events/')
    // .then((res) => console.log(res.data))
    // .catch((err) => console.log(err));

    const response = await fetch("http://localhost:8000/api/events/");
    const data = await response.json();
    if (date) {
      const filter_data = data.filter((d) => {
        return d.date === date.toDateString();
      });

      settodo(filter_data);
    }
  };

  const deletelist = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:8000/api/events/${id}/`);
    getList(date);
  };

  return (
    <div className="app">
      <h1 className="header">Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={getList} value={date} onClickDay={setDate} />
        <div></div>
        <div className="text-center">
          <div className="selected">Selected Date: {date.toDateString()}</div>
          <Button className="btn1" onClick={deleteHandler}>
            Add Event
          </Button>
          <div className="eventt">
            {todo.length === 0 && (
              <div>There are no Events added for {date.toDateString()}.</div>
            )}

            {todo.length > 0 && <div>{date.toDateString()}'s Events are:</div>}

            <div>
              {todo.map((data) => (
                <li
                  key={data.id}
                  onClick={() => deletelist(data.id)}
                  value={data}
                >
                  {" "}
                  {data.title} : {data.time}
                  <button className="delbtn">Delete this event</button>
                </li>
              ))}
            </div>
          </div>
        </div>

        {ModalIsOpen && (
          <Events onCancel={shutModalHandler} onConfirm={sendevent} />
        )}
      </div>
    </div>
  );
}

export default App;
