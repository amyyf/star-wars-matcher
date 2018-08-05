# Star Wars Birthday Matcher

Still in progress! Images are coming next.

This app matches you, based on birthdate, to different characters, planets, starships, etc. in the Star Wars universe - a galactic match-making service.

It utilizes two APIs to source the data and an MVC design pattern written in vanilla JavaScript.

## Dependencies

The data comes from The Star Wars API - [SWAPI](https://swapi.co/)! - which is open-source and free and describe by the creators as being "RESTish". It's super cool and obviously took them a lot of time and effort.

The images come from [tk].

### A note about Fetching the SWAPI data

All the data types on SWAPI have more than 31 items in their results arrays with the exception of the film type. (Sorry if you wanted to know which film is your perfect match - maybe someday there will be enough to correspond to days of the month.) My initial `fetch` calls simply requested the URL that matched the entered date: https://swapi.co/api/people/1/, for example.

Turns out that there are some gaps in the numbering convention, as I learned when some vehicles and starships began displaying as `undefined`. I had to do a little refactoring to make sure I was requesting an index that existed. For now, the code determines which page of results to request based on what birthdate is entered (ten results display at a time) and then finds the result from that page that corresponds with the birthdate. Less clean than my initial implementation, but works.

#### License

Star Wars and all associated names and information are copyright (c) Lucasfilm Ltd LLC.

The [SWAPI](https://swapi.co/about) is open-source and free to use, and a pretty ~~nerdy~~ cool source of data.

The actual code here is under the MIT License:

Copyright (c) 2018 Amy Frieson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
