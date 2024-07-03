# Djangobnb

![Djangobnb](path/to/your/image.png)

## About the Project

Djangobnb is a fully-featured Airbnb-like application developed with a modern tech stack. The application includes both frontend and backend components, is containerized, and is deployed in a production-like environment.

## Tech Stack

-   **Frontend:** Next.js, React, Tailwind CSS, TypeScript
-   **Backend:** Django, Python, PostgreSQL
-   **DevOps:** Docker, Nginx, DigitalOcean
-   **Version Control:** Git, GitHub

## Features

-   User registration and login
-   Accommodation search and booking
-   Real-time Chat using websockets
-   Wishlist

## Installation

### Prerequisites

-   Docker
-   Docker Compose
-   Python 3.x
-   Node.js
-   npm or yarn

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/ARP-25/Djangobnb_backend.git
    ```
2. Create a virtual environment and install dependencies:
    ```bash
    cd Djangobnb_backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```
3. Apply the migrations:
    ```bash
    python manage.py migrate
    ```
4. Start the development server:
    ```bash
    python manage.py runserver
    ```

### Frontend

1. Clone the repository:
    ```bash
    git clone https://github.com/ARP-25/Djangobnb_frontend.git
    ```
2. Install dependencies:
    ```bash
    cd Djangobnb_frontend
    npm install
    # or
    yarn install
    ```
3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Docker

1. Clone the both front- and backend repository:
    ```bash
    git clone https://github.com/ARP-25/Djangobnb_frontend.git
    git clone https://github.com/ARP-25/Djangobnb_backend.git
    cd Djangobnb_backend
    ```
2. Start the application with Docker Compose:
    ```bash
    docker-compose.ssl.yml up --build
    ```

## Deployment

This project is deployed on DigitalOcean. The deployment steps include creating a droplet, configuring Nginx, and setting up Docker Compose. Detailed instructions can be found in the [Deployment Documentation](link-to-deployment-docs).

## Contributing

Contributions are welcome! Please open an issue before submitting a pull request.

## Contact

Angelo Rocco Pucci - [in/angeloroccopucci/](https://www.linkedin.com/in/angeloroccopucci/) - angelo.pucci@outlook.de - [angeloroccopucci.com](angeloroccopucci.com)

Project Link Frontend: [https://github.com/ARP-25/Djangobnb_frontend](https://github.com/ARP-25/Djangobnb_frontend)

Project Link Backend: [https://github.com/ARP-25/Djangobnb_backend](https://github.com/ARP-25/Djangobnb_backend)
