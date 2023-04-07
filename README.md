Document Annotation Application
===============================

This is a simple Angular application for viewing documents and adding annotations to them. The application allows users to upload a document from a server, zoom in and out of the document, and add annotations to any page of the document. The added annotations can be moved or deleted, and the user can save the result as a JSON file.

## Approach

The application is built using Angular framework and utilizes HTML, CSS, and Typescript to provide a user interface for document viewing and annotation. The application has two main components: DocumentViewerComponent and DocumentAnnotationComponent. DocumentViewerComponent displays the document with pagination and scrolling features, and DocumentAnnotationComponent provides the functionality to add annotations, move or delete them.

## Pros

- The application is built using the Angular framework, which provides robustness and scalability.
- The application provides a simple and intuitive interface for viewing documents and adding annotations.
- The application allows users to save the annotations as a JSON file, which can be used later for other purposes.
## Cons

- The application currently only supports adding text annotations and image annotations, but other types of annotations, such as audio or video annotations, are not supported.
- The application currently does not support saving the annotations to a server or a database.

## Getting Started

To get started with the application, follow the instructions below:

1.  Clone the repository: `git clone https://github.com/AlexisArdaya09/angular-test`
2.  Install the dependencies: `npm install`.
3.  Run the application: `ng serve`.
## Conclusion

The Document Annotation Application is a simple and intuitive application for viewing documents and adding annotations to them. While the application has some limitations, such as not supporting other types of annotations or saving annotations to a server or database, it provides a solid foundation for further development and improvements.