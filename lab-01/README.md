\# Lab 1: Node.js and Express Server



\## Student Details



\- \*\*Name:\*\* Ashish

\- \*\*Registration Number:\*\* 252U1R1233

\- \*\*Section:\*\* S-016

\- \*\*Course:\*\* Backend Development Fundamentals



\## Objective



To set up a Node.js project and build a web server using the built-in HTTP module and Express.js. The experiment also demonstrates routing, request and response handling, and HTTP status codes.



\## Live Link



Not deployed yet. The application is currently running locally on port 3000.



\## Technologies Used



\- Node.js

\- Express.js

\- NPM

\- JavaScript

\- HTTP



\## Project Structure



```text

lab-01/

├── node\_modules/

├── .gitignore

├── package.json

├── package-lock.json

├── plain-server.js

├── server.js

└── README.md

```



\## Installation and Execution



\### Prerequisites



\- Node.js installed

\- NPM installed



\### Installation



```bash

npm install

```



\### Start the server



```bash

npm start

```



The server runs at:



`http://localhost:3000`



\## Implementation



\### 1. Plain HTTP Server



Created a basic server using Node.js's built-in HTTP module. It listens on port 3000 and returns the response "Hello".



\### 2. Express Server



Created an Express application to handle HTTP requests through different routes.



\## API Endpoints



| HTTP Method | Endpoint | Description | Status Code |

|---|---|---|---|

| GET | `/` | Displays the welcome message | 200 |

| GET | `/about` | Returns student name and section in JSON | 200 |

| GET | `/time` | Returns the current date and time | 200 |

| GET | `/invalid` | Handles undefined routes | 404 |



\## Testing and Expected Output



All endpoints were tested using a web browser and PowerShell `curl.exe`.



\- `/` returned the welcome message.

\- `/about` returned student details in JSON format.

\- `/time` returned the current timestamp.

\- `/invalid` returned a custom 404 message.



\## Screenshots



Add screenshots of the following results:



\- Welcome page

\- About endpoint

\- Time endpoint

\- 404 error page

\- HTTP status code verification

\- Server running in the terminal



\## Problems Faced and Solutions



1\. \*\*Node.js and NPM recognition:\*\* Initially, PowerShell could not recognize Node.js and NPM. Installing Node.js LTS resolved the installation issue.

2\. \*\*NPM execution policy:\*\* PowerShell blocked `npm.ps1`. Using `npm.cmd` allowed NPM commands to execute without changing the system execution policy.

3\. \*\*Server implementation:\*\* Learned to create an HTTP server using Node.js and then implement the same functionality using Express.js.



\## Conclusion



Successfully developed a basic HTTP server using Node.js and an Express server with multiple GET routes. Implemented request handling, JSON responses, current date and time retrieval, and custom 404 error handling. Verified the endpoints and their HTTP status codes using PowerShell. The experiment provided practical knowledge of server-side development and Express.js routing.

