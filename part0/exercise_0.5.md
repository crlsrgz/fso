# 0.5: Single page app diagram
```mermaid
	sequenceDiagram
	title Single Page application, example of GET request. 
	Note right of Browser: User calls the page then the borwser makes the first request.
	Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
	Server-->>Browser: HTML Document
	Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	Server-->>-Browser: Response  / main.css style sheet
	Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
	Server-->>-Browser: Response  / spa.js code
	Note right of Browser: Execute spa.js XMLHttpRequest() and GET /exampleapp/data.json
	Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	Server-->>-Browser: Response  / JSON [{},{},{},{}] 
	Note right of Browser: After the json data is received xhttp.onreadystatechange calls the redrawNotes() inside of it.
``` 