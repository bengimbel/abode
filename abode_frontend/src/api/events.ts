import { makeRequest } from "./makeRequest";

export const fetchAllEvents = async (): Promise<any> => {
  try {
    const response = await makeRequest(`events`, `GET`)
    return response
  } catch (e) {
    console.log(e);
  }
};
export const fetchEvent = async (id: string): Promise<any> => {
  try {
    const response = await makeRequest(`events/${id}`, `GET`)
    return response
  } catch (e) {
    console.log(e);
  }
};
export const createEvent = async (data: { title: string, description: string, eventDate: string | Date }): Promise<any> => {
  try {
    const response = await makeRequest(`events`, `POST`, data)
    return response
  } catch (e) {
    console.log(e);
  }
};

export const deleteEvent = async (id: string): Promise<any> => {
  try {
    const response = await makeRequest(`events/${id}`, `DELETE`)
    return response
  } catch (e) {
    console.log(e);
  }
};

export const editEvent = async (id: string, data: { title: string, description: string, eventDate: string | Date }): Promise<any> => {
  try {
    const response = await makeRequest(`events/${id}`, `PUT`, data)
    return response
  } catch (e) {
    console.log(e);
  }
};

export const fetchUpcomingEvents = async (): Promise<any> => {
  try {
    const response = await makeRequest(`events/upcoming`, `GET`)
    return response
  } catch (e) {
    console.log(e);
  }
};



