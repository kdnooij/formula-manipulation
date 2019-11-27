# Using the Parsing Tool

## Updating the project

1. To update the project, open GitHub for Desktop
2. Select the correct repository (formula-manipulation)
3. Click 'Fetch origin' at the top and let it load the changes
4. Now Click 'Pull' at the top. The project should now be up to date

## Running

1. Open the project directory in Visual Studio Code.
2. Use <kbd>Ctrl+`</kbd> to open the Terminal at the bottom.
3. Run `npm start` to start the tool, after a while a browser window will open.

## Installing dependencies

1. If `npm start` results in an error, it is likely that a new dependency is added to the project.
2. To fix this run `npm install`.
3. After this try `npm start` again.

## Stopping the tool

1. To stop the tool from running, make sure the terminal is focussed and press <kbd>Ctrl+C</kbd>
2. Now type `Y` and press <kbd>Enter</kbd>

## Error: Something is already running on port 3000

1. If you get this warning when starting the tool, press <kbd>Ctrl+C</kbd> and `Y`+<kbd>Enter</kbd> to close it.
2. Now go into your task manager and close all Node.js or node.exe programs.
3. Try running the tool again.