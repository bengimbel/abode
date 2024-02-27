import React from "react";
import { Event } from "../types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../api/events";
type EventProps = {
  event: Event;
  fetchEvents: () => void;
};
export const EventItem = ({ event, fetchEvents }: EventProps) => {
  const navigate = useNavigate();

  const handleEdit = (event: Event) => {
    navigate(`${event.id}`, { state: { event } });
  };
  const handleDelete = async (event: Event) => {
    const { id } = event;
    try {
      await deleteEvent(id.toString());
      fetchEvents();
      navigate("/events");
    } catch (e) {
      alert("FAILED TO DELETE");
    }
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <React.Fragment>
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
          <CardActions>
            <Button size="small" onClick={() => handleEdit(event)}>
              Edit
            </Button>
            <Button size="small" onClick={() => handleDelete(event)}>
              Delete
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Container>
  );
};
