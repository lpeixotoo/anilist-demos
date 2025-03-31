# AniList Remix App

This is a Remix application that integrates with the AniList GraphQL API. The app uses Apollo Client for data fetching and Tailwind CSS for styling.

## Features

- **Paginated Anime Carousel**: Displays a list of anime in a carousel format with pagination.
- **GraphQL Integration**: Uses Apollo Client to fetch data from the AniList GraphQL API.
- **Server-Side Rendering**: Utilizes Remix's server-side rendering capabilities for improved performance and SEO.
- **Tailwind CSS + shadcn UI lib**: Styled using Tailwind CSS and shadcn UI components a modern and responsive design.

## Development

To get started with development, follow these steps:

1. **Install Dependencies**: Run the following command to install the necessary dependencies.

    ```sh
    npm install
    ```

2. **Run the Development Server**: Start the development server with the following command.

    ```sh
    npm run dev
    ```

3. **Testing**: Run the following command to run the tests.

    ```sh
    npm test
    ```

4. **Open in Browser**: Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Project Structure

Here's an overview of the project's structure:

- **components/ui**: Contains reusable UI components.
- **lib/utils.ts**: Utility functions.
- **root.tsx**: Root component of the application.
- **routes/**: Server route files.
- **services/**: Contains the services used throughout the application. e.g., Apollo Client to fetch data.
- **tailwind.css**: Tailwind CSS configuration and custom styles.
- ***.test.tsx/*.test.ts**: Test files for the components and services, usually located in the same directory.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
