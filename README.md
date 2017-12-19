# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Tipp from Michael
Prinzipiell würde ich es immer so einfach wie möglich machen. Wenn man eine Karte klickt, kann man ihr eine neue Klasse "clicked" anhängen. Bei der zweiten ebenso. Dann nimmt man die beiden Karten mit der neuen Klasse "clicked" und vergleicht, ob sie bspw. beide das gleiche Icon haben. Wenn ja, dann fügt man beiden die Klasse "solved" hinzu und nimmt "clicked" wieder weg.
