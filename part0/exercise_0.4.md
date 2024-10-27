
# 0.4: New note diagram 
```mermaid
	sequenceDiagram
	Browser->>+Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
	Note right of Browser: Sends a POST request containing the note field in the name attribute of the input
	Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
	Server-->>-Browser: HTML Document
	Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	Server-->>-Browser: file main.css 
	Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	Server-->>-Browser: file main.js
	Note right of Browser: The browser starts executing the JavaScript code that fetches the JSON from the server
	Browser->>+Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	Server-->>-Browser: file data.json 
	Note right of Browser: After the json data is received xhttp.onreadystatechange creates the list of element using the data.
	
```