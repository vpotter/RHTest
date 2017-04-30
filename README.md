# RH Test Assignment

Small CRUD application for managing user accounts. Authentication is performed via Google Sign In.
To have an access to the app user should have an account in the system (AdminUser).

## Installation

Create Google oAuth Client ID (https://developers.google.com/identity/sign-in/web/devconsole-project) and add `http://localhost:3030` to "Authorized JavaScript origins"

Create config files for both frontend and backend:

    cp frontend/config.js.def frontend/config.js
    cp backend/config/local_settings.py.def backend/config/local_settings.py

Add `Client ID` to the frontend and backend configs (settings name: `GOOGLE_CLIENT_ID`)

Start vagrant vm machine

    vagrant up

Run application

    vagrant ssh

    # create django admin
    # Note: "Email address" is optional
    python3 backend/manage.py createsuperuser

    # start backend
    python3 backend/manage.py runserver 0.0.0.0:3031 &> /dev/null &

    # start frontend
    (cd frontend && exec python3 -m http.server 3030 &> /dev/null &)


App is available by the following urls:

Frontend: http://localhost:3030/

Django admin: http://localhost:3031/_admin/
