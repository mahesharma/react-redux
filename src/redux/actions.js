function addevent(events) {
    return {
        type: "ADD_EVENT",
        payload: { title: events.title, time: events.time }

    }
}

function deleteevent(events) {
    return {
    type: "DELETE_EVENT",
    payload: { id: events.id }
    
    }
    }

export default {addevent,  deleteevent};
 