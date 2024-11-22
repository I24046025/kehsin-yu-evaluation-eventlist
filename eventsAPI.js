const eventsAPI = (() => {
    const EVENTS_API_URL = "http://localhost:3000/events";
  
    // Get all events from the API
    async function getEvents() {
      const response = await fetch(EVENTS_API_URL);
      const events = await response.json();
      return events;
    }
  
    // Add a new event
    async function postEvent(newEvent) {
      const response = await fetch(EVENTS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      const event = await response.json();
      return event;
    }
  
    // Delete an event
    async function deleteEvent(id) {
      const response = await fetch(`${EVENTS_API_URL}/${id}`, {
        method: "DELETE",
      });
      await response.json();
      return id;
    }
  
    // Edit an event
    async function editEvent(id, updatedEvent) {
      const response = await fetch(`${EVENTS_API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      const event = await response.json();
      return event;
    }
  
    return {
      getEvents,
      postEvent,
      deleteEvent,
      editEvent,
    };
  })();  