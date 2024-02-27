import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Event } from "../types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type UpcomingEventsProps = {
  upcomingEvents: Event[];
  modalOpen: boolean;
  setModalOpen: (arg: boolean) => void;
  clearUpcoming: () => void;
};

export default function EventModal({
  upcomingEvents,
  modalOpen,
  setModalOpen,
  clearUpcoming,
}: UpcomingEventsProps) {
  const handleClose = () => {
    clearUpcoming();
    setModalOpen(false);
  };
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You have the following upcoming events today...
          </Typography>
          {upcomingEvents.map((event) => (
            <div key={event.id}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {event.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {event.description}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {event.eventDate.toString()}
              </Typography>
              <br />
            </div>
          ))}
        </Box>
      </div>
    </Modal>
  );
}
