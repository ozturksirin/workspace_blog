# Workspace Blog Application

This project is a workspace blog application developed using MongoDB, React.js, and Node.js. It enables users to share articles related to their workspaces.

## Getting Started

These steps contain the necessary instructions to run the project files on your local machine.

### Requirements

The following software and tools are required to run this project:

- Node.js and npm
- React
- MongoDB
- Git

### Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/ozturksirin/workspace_blog
    ```

2. To start the server side, follow these steps in the terminal:
    ```bash
    cd server
    npm install
    ```
3. Add a `.env` file with the following content:
    ```env
    CONNECTION_URL=mongodb+srv://YourMongoDbPassword@clusters...
    PORT=5000
    ```
    Replace `YourMongoDbPassword` with your actual MongoDB password and connection URL.
    
    Then start the server:
    ```bash
    npm start
    ```

4. To start the client side, follow these steps in a separate terminal window:
    ```bash
    cd client
    npm install
    npm start
    ```

5. You can view the application by going to `http://localhost:3000` in your browser.

## Usage

This application allows users to read and write articles.

Current features in the application include:
- Viewing, creating, editing, and deleting articles.
- Detailed examination of articles.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Implement new features or fix bugs in your forked repository.
3. Create a Pull Request with a descriptive title and explanation for your changes.
4. Your changes will be reviewed, and feedback will be provided for integration into the project.

## License

This project is licensed under the MIT License. For more information, refer to the [LICENSE](./LICENSE) file.

## Contact

For any questions or suggestions, please reach out to us at [ozturksirininfo@gmail.com].
