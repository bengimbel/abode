import React from "react";
import { Event as EventType } from "../types";
import { Grid } from "@mui/material";
import { EventItem } from "./eventItem";

type EventsProps = {
  events: EventType[];
  fetchEvents: () => void;
};

export function EventList({ events, fetchEvents }: EventsProps) {
  return (
    <div style={{ padding: "2rem 0" }}>
      <h2>Events</h2>
      <Grid
        container
        columnSpacing={{ xs: 2, md: 3 }}
        rowSpacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {events.map((event) => {
          return (
            <Grid
              my={4}
              sx={{
                minWidth: "500px",
              }}
              key={event.id}
            >
              <EventItem
                key={event.id}
                event={event}
                fetchEvents={fetchEvents}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
