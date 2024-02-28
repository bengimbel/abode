import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router-dom";
import { editEvent, fetchEvent } from "../api/events";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Event, CreateEventType } from "../types";

export default function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [eventDetails, setEventDetails] = useState<CreateEventType>({
    title: "",
    description: "",
    eventDate: "",
  });

  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const id = location.state.event.id;
        const event = await fetchEvent(id);
        setEvent(event);
        setEventDetails({
          title: event.title,
          description: event.description,
          eventDate: event.eventDate,
        });
      } catch (e) {
        alert("FETCHING EVENTS FAILED");
      }
    };
    if (!event) {
      fetchEventById();
    }
  }, [event, location.state.event.id]);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLElement>
  ): Promise<void> => {
    e.preventDefault();
    const id = location.state.event.id;

    setEventDetails({
      ...eventDetails,
      eventDate: new Date(eventDetails.eventDate),
    });

    try {
      await editEvent(id, eventDetails);
      navigate("/events");
    } catch (e) {
      alert("CREATE EVENT FAILED");
    }
  };

  return (
    <Box height={"100%"} my={4} display="flex" alignItems="flex-row">
      <Box
        height={"100%"}
        my={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
      >
        <Container maxWidth="lg">
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
              value={eventDetails.title}
            />
            <TextField
              required
              id="outlined-required"
              label="Description"
              onChange={onFormChange}
              name="description"
              value={eventDetails.description}
            />
            <TextField
              required
              id="outlined-required"
              label="Event Date"
              onChange={onFormChange}
              name="eventDate"
              value={eventDetails.eventDate}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Edit
            </Button>
            <Button variant="outlined" onClick={() => navigate("/events")}>
              Exit
            </Button>
          </Stack>
        </Container>
        {event ? (
          <Container>
            <Grid
              my={4}
              sx={{
                minWidth: "500px",
              }}
              key={event.id}
            >
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom variant="h3">
                    {event.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {event.description}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {event.eventDate.toString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Container>
        ) : (
          <div></div>
        )}
      </Box>
    </Box>
  );
}
