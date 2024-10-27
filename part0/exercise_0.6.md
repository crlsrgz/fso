## 0.6: New note in Single page app diagram
```mermaid
	sequenceDiagram
	title Single Page application, examplie of a post request.
	Note right of Browser: The application is loaded, a list of element and a form are displayed.
	Note right of Browser: The js code prevents the default of the form.
	Note right of Browser: Push the form content into an array of notes used to rebuild the list using the redrawNotes function.
	Browser->>+Server: POST /exampleapp/new_note_spa
	Note right of Browser: sendToServer function is called with The POST request.
	Server-->>-Browser: Response 201 JSON[{message:"note created"}]  / https://studies.cs.helsinki.fi/exampleapp/new_note_spa
	Note right of Browser: xhttp.onreadystatechange calls the redrawNotes() inside of it.
	Note right of Browser: INFO: The list displayed is not the actual list from server, it's a locally stored list. To see all the real server valus a reload of the page is neede. 

```