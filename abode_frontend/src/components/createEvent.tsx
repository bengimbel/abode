import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { createEvent } from "../api/events";
import { Button } from "@mui/material";
import { useAuth } from "../hooks/authProvider";

type CreateEventType = {
  title: string;
  description: string;
  eventDate: Date | string;
};

type CreateEventProps = {
  fetchEvents: () => void;
};

export default function CreateEvent({ fetchEvents }: CreateEventProps) {
  const { logout } = useAuth();
  const [event, setEvent] = useState<CreateEventType>({
    title: "",
    description: "",
    eventDate: "",
  });
  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    setEvent({
      ...event,
      eventDate: new Date(event.eventDate),
    });
    try {
      await createEvent(event);
      fetchEvents();
    } catch (e) {
      alert("CREATE EVENT FAILED");
    }
    setEvent({
      title: "",
      description: "",
      eventDate: "",
    });
  };

  return (
    <>
      <h2>Create Event</h2>
      <Stack
        component="form"
        sx={{
          width: "40ch",
          height: "100%",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Title"
          onChange={onFormChange}
          name="title"
          value={event.title}
        />
        <TextField
          required
          id="outlined-required"
          label="Description"
          onChange={onFormChange}
          name="description"
          value={event.description}
        />
        <TextField
          required
          id="outlined-required"
          label="Event Date"
          onChange={onFormChange}
          name="eventDate"
          value={event.eventDate}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
        <Button variant="outlined" onClick={() => logout()}>
          Sign Out
        </Button>
      </Stack>
    </>
  );
}
