
# Blog Application
This is a full-stack blogging platform built with React, Node.js, Express, TypeScript, Prisma, and PostgreSQL. Users can create, edit, and delete their own blog posts, explore other users' posts with pagination, and search for posts by title. Users can engage by liking and commenting on posts. Admins have the ability to view, edit, and delete all posts.

The application uses Redux Toolkit for state management, while API requests are handled via Redux Toolkit Query. React Router ensures seamless navigation, and the UI is styled using TailwindCSS and Shadcn.ui.

## Table of Contents

- [Blog Application](#blog-application)
	- [Table of Contents](#table-of-contents)
	- [Features](#features)
	- [Demonstration](#demonstration)
		- [Screenshots](#screenshots)
	- [Technologies](#technologies)
	- [Setup](#setup)
	- [Contacts](#contacts)
	- [Contributing](#contributing)

## Features

-   **Authentication** (login, register, logout)
    -   JWT-based authentication with tokens sent via cookies.
-   **Blog Post Management**
    -   Create, edit, and delete blog posts.
    -   View blog posts from other users.
    -   Pagination for blog posts.
-   **User Interaction**
    -   Like and comment on blog posts.
-   **Profile Management**
    -   View and update user profile information.
-   **Optimistic Updates**
    -   Implemented via React Query for a smoother user experience.
-   **Responsive Design**
    -   Optimized for mobile devices.

## Demonstration
### Screenshots
- ![Blog Homepage](/client/public/blogging-app-homepage.png)
- [Blog Details & Dropdown Details](/client/public/blogging-app-details-dropdown.png)

- [All posts only for admin](/client/public/blogging-app-all-posts.png)

## Technologies
-   Frontend: React, Vite, TailwindCSS, Shadcn.ui, Redux Toolkit, React Router
-   Backend: Node.js, Express, Prisma, PostgreSQL
-   State & API Management: Redux Toolkit Query
-   Authentication: JWT

## Setup

1. Clone the Repository

	```bash
	git clone https://github.com/kundusubrata/blogging-app.git
	cd blogging-app
	```
2. Install Dependencies
	```bash
	# Install client dependencies
	cd client && pnpm install
	# Install server dependencies
	cd server && pnpm install
	```
3.  Configure Environment Variables
	Rename `.env.example` to `.env` inside the `server` directory and provide appropriate values:
	```bash
		PORT=4000
		DATABASE_URL=""
		JWT_SECRET="a79bec359db0fa2c96e54573da6364236baf5e6809af3dc0dcf99408e7f7d200b61d7d68d851dba9b64d0118286394657372b8eaed6d251cc2bd42e699414c9f6112340d87df725cfe72d5bfc85aa0148d17e587e22512c530ad30bb72af0e0e"
		JWT_COOKIE_EXPIRES_TIME=7
		JWT_EXPIRES_TIME="86400"
		NODE_ENV="development"
	```
	Ensure all environment variables are correctly configured before running the application.
	
4.  Set Up Prisma
	Run the following commands to generate the Prisma client and apply database migrations:
	```
	npx prisma migrate deploy # or use npx prisma db push
	npx prisma db pull
	npx prisma generate
	npx prisma studio
	```
5. Run the Development Server 
	Start both the frontend and backend servers in separate terminals:
	```bash
	# Start client-side development server
	pnpm run dev
	# Start server-side development server
	pnpm run dev
	```
	-	The backend server will run at http://localhost:4000.
    -	The frontend server will run at http://localhost:5173.

	Development Mode:

	-	If you're running the frontend separately, changes will be reflected instantly in http://localhost:5173.
	-	If you're accessing the app through the backend (http://localhost:4000), you must build the frontend before seeing changes because it's being served from the dist folder.
6. Before Pushing the Code, build the frontend so that the latest version is included in the backend server: 
	```bash
	cd client && pnpm run build
	```

## Contacts
-   LinkedIn: [Subrata Kundu](https://www.linkedin.com/in/kundu-subrata/)
-   Mail: [kundu.subrata2020@gmail.com](mailto:kundu.subrata2020@gmail.com)
-   GitHub: [kundusubrata](https://github.com/kundusubrata)

## Contributing

Feel free to fork this repository, create a branch, and submit pull requests for any improvements or fixes.

