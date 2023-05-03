# Travel Planning App

This application is a showcase of skills with React, Node and Express in a potentially scaleable environment. This is not meant to be a finished project as there is no database connection and is reliant on fake data.


# Server Side
This application relies on express to create our backend. Below you will find definitions for our different backend structures
## Helpers
The server application uses a few structures for reusability. For the most part, these are class based in nature

    1. BaseRouter - BaseRouters will handle the structuring of our routing so it's consistent throughout different modules in the application.
    2. Payload - Payloads handle the structure of data passed between tasks and handles error messaging too.
    3. TaskRunner - TaskRunners are used to run reusable tasks(Tasks explained later). The TaskRunner will pass a payload between each task and be able to logically exit when an error happens.




## Backend Structure
    1. Router - Routers are what is used to make our endpoint connection. Base Routers accept the payload from our API connection and then passes it through pipelines to run. Once a pipeline is finished, it will return the response or error
    2. Repositories - Repositories will store our logic to store and access data between different data structures. Repositories will use validators to check data before it is stored.
    3. Tasks - Tasks are reusable and they can be used across different pipelines. Tasks will handle business logic and may use repositories for data access or storage.
    4. Pipelines - A pipeline will be called from a router through the different endpoints. From the pipeline, it will use the TaskRunner and run a list of tasks. Once a task finishes, from either the completion of tasks or from errors, it will return a response to be sent.

## Additional Services




