export type Form = {
  email: string;
  password: string;
};

export type Token = {
  access_token: string;
};

export type Event = {
  id: number,
  createdAt: Date,
  updatedAt: Date
  title: string
  description: string
  eventDate: Date
  notified: boolean
  userId: number
}

export type Auth = {
  token: string
}