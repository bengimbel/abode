# Abode project

## Abode API

### You will need docker running to install and run postgres database.

I commited the `.env` file for the `JWT` secret and `database creds`. I ususally wouldn't do that, but seemed okay for this small project, everything is pretty basic.

### Install Instructions

1. `cd` into `abode_api`
2. run `npm i && npm run start:dev`

## Abode Frontend

### Install Instructions

1. `cd` into `abode_frontend`
2. run `npm i && npm run start`

### Project Info

Once you start the backend and frontend, a browser should pop up at `localhost:3000/signin`. I added in `JWT` authentication, so you will need to sign up first, then sign in so you can access the events screen. I tried to make the implementation of the front end and back end pretty minimal and straight forward. I used materialUI for components.

I added in the `CRUD` operations to the front end and backend, so you can do all of those actions to create events. If you create an event where the `eventDate` is today, you will get a modal on the front end that pops up and lets you know you have a event that is happening today. Right now I am just polling the backend every `5000 ms` to search for events created by the user logged in, and that land on today, and also the `event.notified = false`. Once the user is notified, `event.notified = true`.

If I had more time, I would add tests to the project. I usually would, but I just have alot on my plate right now with a few other things and wanted to get a working PoC up an running. I also would enhace the UI alot more. Right now it's pretty minimal. On the backend, I would make the data model a little more robust, so as this scales, we can do more with the `Event`. Maybe add the ability to add multiple notifications to events so users can get multiple notifications if they'd like. I also would implement a pub/sub with the backend and front end (might need some websockets), and remove the polling implementation.
