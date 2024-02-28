import { makeRequest } from "./makeRequest";

const GET = `GET`
const POST = `POST`
const DELETE = `DELETE`
const PUT = `PUT`

export const fetchAllEvents = async (): Promise<any> => {
  try {
    const response = await makeRequest(`events`, GET)
    return response
  } catch (e) {
    throw new Error("Fetch all events error")
  }
};
export const fetchEvent = async (id: string): Promise<any> => {
  try {
    const response = await makeRequest(`events/${id}`, GET)
    return response
  } catch (e) {
    throw new Error("Fetch event error")
  }
};
export const createEvent = async (data: { title: string, description: string, eventDate: string | Date }): Promise<any> => {
  try {
    const response = await makeRequest(`events`, POST, data)
    return response
  } catch (e) {
    throw new Error("Create event error")
  }
};

export const deleteEvent = async (id: string): Promise<any> => {
  try {
    const response = await makeRequest(`events/${id}`, DELETE)
    return response
  } catch (e) {
    console.log(e);
  }
};

export const editEvent = async (id: string, data: { title: string, description: string, eventDate: string | Date }): Promise<any> => {
  try {
    const response = await makeRequest(`events/${id}`, PUT, data)
    return response
  } catch (e) {
    throw new Error("Delete event error")
  }
};

export const fetchUpcomingEvents = async (): Promise<any> => {
  try {
    const response = await makeRequest(`events/upcoming`, GET)
    return response
  } catch (e) {
    throw new Error("Fetch upcoming events error")
  }
};



