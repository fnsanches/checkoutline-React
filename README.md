# Check-out line

Check-out line app to allocate people to a line based on the smallest line size according to the number of products.

Every 3 seconds one product is scanned and removed from the line.

The app is built with React and Typescript.

## Known issues

- <s>The app is not rendering precisely the lines, it is skipping a cycle.</s> 
- Fixed by removing StrictMode (which causes the app to render twice as a way to detect unsafe lifecycles)