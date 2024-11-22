// Function to create the event element
function createEventElem(event) {
    const eventItemElem = document.createElement("tr");
  
    // Event column
    const eventNameElem = document.createElement("td");
    eventNameElem.textContent = event.eventName;
  
    // Start column
    const eventStartElem = document.createElement("td");
    eventStartElem.textContent = event.startDate;
  
    // End column
    const eventEndElem = document.createElement("td");
    eventEndElem.textContent = event.endDate;
  
    // Actions column
    const actionsElem = document.createElement("td");
    const deleteButton = document.createElement("button");

    // Delete button
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      const deletedEventId = await eventsAPI.deleteEvent(event.id);
      eventItemElem.remove(); // Remove the event from the list
    });
  
    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    
    editButton.addEventListener("click", () => {
      // Save the original values
      const originalEventName = event.eventName;
      const originalStartDate = event.startDate;
      const originalEndDate = event.endDate;

      // Create input fields for editing and set their original values
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = originalEventName;

      const startInput = document.createElement("input");
      startInput.type = "date";
      startInput.value = originalStartDate;

      const endInput = document.createElement("input");
      endInput.type = "date";
      endInput.value = originalEndDate;

      // Replace static text with input fields
      eventNameElem.replaceWith(nameInput);
      eventStartElem.replaceWith(startInput);
      eventEndElem.replaceWith(endInput);
  
      // Replace buttons
      deleteButton.replaceWith(saveButton);
      editButton.replaceWith(cancelButton);

      // *** --- Save button logic --- *** //
      saveButton.addEventListener("click", async () => {
        // Get updated values from input fields
        const updatedEventName = nameInput.value;
        const updatedStartDate = startInput.value;
        const updatedEndDate = endInput.value;
        // Update event in the database
        const updatedEvent = await eventsAPI.editEvent(event.id, {
            eventName: updatedEventName,
            startDate: updatedStartDate,
            endDate: updatedEndDate,
        });
        // Update the DOM with new values
        eventNameElem.textContent = updatedEvent.eventName;
        eventStartElem.textContent = updatedEvent.startDate;
        eventEndElem.textContent = updatedEvent.endDate;
        // Replace input fields with updated static values
        nameInput.replaceWith(eventNameElem);
        startInput.replaceWith(eventStartElem);
        endInput.replaceWith(eventEndElem);
        // Restore buttons
        saveButton.replaceWith(deleteButton);
        cancelButton.replaceWith(editButton);
      })

      // *** --- Cancel button logic --- *** //
      cancelButton.addEventListener("click", () => {
        // Restore original values
        nameInput.replaceWith(eventNameElem);
        startInput.replaceWith(eventStartElem);
        endInput.replaceWith(eventEndElem);

        // Restore buttons
        saveButton.replaceWith(deleteButton);
        cancelButton.replaceWith(editButton);
      });

    });
  
    actionsElem.append(deleteButton, editButton);
    eventItemElem.append(eventNameElem, eventStartElem, eventEndElem, actionsElem);
  
    return eventItemElem;
  }
  
  // Render events on the page
  function renderEvents(events) {
    const eventListElem = document.getElementById("event-list");
  
    for (const event of events) {
      const eventElem = createEventElem(event);
      eventListElem.appendChild(eventElem);
    }
  }
  
  // Add new event
  function setUpFormEvent() {
    const form = document.getElementById("add-event-form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameElem = document.getElementById("event-name");
      const startElem = document.getElementById("event-start");
      const endElem = document.getElementById("event-end");
  
      const newEvent = await eventsAPI.postEvent({
        eventName: nameElem.value,
        startDate: startElem.value,
        endDate: endElem.value,
      });
  
      const eventListElem = document.getElementById("event-list");
      const eventElem = createEventElem(newEvent);
      eventListElem.appendChild(eventElem);
  
      nameElem.value = "";
      startElem.value = "";
      endElem.value = "";
    });
  }
  
  // Initialize the app
  (function initApp() {
    setUpFormEvent();
  
    eventsAPI.getEvents().then((events) => {
      renderEvents(events);
    });
  })();
  