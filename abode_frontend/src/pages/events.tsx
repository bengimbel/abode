import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { fetchAllEvents, fetchUpcomingEvents } from "../api/events";
import { Event } from "../types";
import CreateEvent from "../components/createEvent";
import { EventList } from "../components/eventList";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import EventModal from "../components/modal";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    try {
      const events = await fetchAllEvents();
      if (events.message === "Unauthorized") {
        navigate("/signin");
        setEvents([]);
      }
      setEvents(events);
    } catch (e) {
      alert("FETCHING EVENTS FAILED");
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    const pollUpcomingEvents = async () => {
      try {
        const upcoming: Event[] = await fetchUpcomingEvents();
        setUpcomingEvents([...upcomingEvents, ...upcoming]);
        if (Array.isArray(upcomingEvents) && upcomingEvents.length > 0) {
          setModalOpen(true);
        }
      } catch (e) {
        alert("FETCHING EVENTS FAILED");
        navigate("/signin");
      }
    };
    const timer = setInterval(pollUpcomingEvents, 5000);
    return () => clearInterval(timer);
  }, [navigate, upcomingEvents]);

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
          <CreateEvent fetchEvents={fetchEvents} />
          {upcomingEvents ? (
            <>
              <EventModal
                upcomingEvents={upcomingEvents}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                clearUpcoming={() => setUpcomingEvents([])}
              />
            </>
          ) : (
            <div></div>
          )}
        </Container>
      </Box>
      <Container maxWidth="lg">
        {events ? (
          <EventList events={events} fetchEvents={fetchEvents} />
        ) : (
          <div></div>
        )}
      </Container>
    </Box>
  );
}
