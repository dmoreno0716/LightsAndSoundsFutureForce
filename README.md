# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **David Moreno**

Time spent: **49** hours spent in total

Final Link to project: (https://glitch.com/edit/#!/sour-sunny-princess)

Older Static Version (Before Express): (https://glitch.com/edit/#!/musical-memory)

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Light Mode and Button to switch to it
- [x] Dark Mode and Button to switch to it
- [x] Gamemodes dropdown that changes the selected gamemode when clicked
- [x] Prettier buttons by using Bootstrap
- [x] Switch to Creative Mode Button
- [x] Creative Mode: Increase Button Count
- [x] Creative Mode: Decrease Button Count
- [x] Creative Mode: Increase Time
- [x] Creative Mode: Decrease Time
- [x] Creative Mode: Increase Pattern total
- [x] Creative Mode: Decrease Pattern total
- [x] Switch to Competitive Mode Button
- [x] Competitive Mode: Display leaderboard from MongoDB Collection
- [x] Competitive Mode: Infinite Pattern Game
- [x] Competitive Mode: Current Score Total
- [x] Competitive Mode: Leaderboard Entry Submission putting to MongoDB Collection
- [x] Competitive Mode: Lose after 1 mistake

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
###Light and Dark Mode

### Normal Mode

### Creative Mode

### Competitive Mode



![](gif1-link-here)
![](gif2-link-here)
![](gif3-link-here)
![](gif4-link-here)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
- https://codeburst.io/hitchhikers-guide-to-back-end-development-with-examples-3f97c70e0073
- https://www.youtube.com/watch?v=yH593K9fYvE
- https://www.youtube.com/watch?v=Rz886HkV1j4
- https://mongoosejs.com/docs/guide.html
- https://getbootstrap.com/docs/5.1/getting-started/introduction/
- https://www.linkedin.com/in/raul-faife/

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
While creating Musical Memory, I encountered a variety of challenges and bugs that tested my patience. The greatest challenge I had to overcome when creating my submission had to be creating and managing the back-end with MongoDB. I wanted to incorporate a leaderboard system for top scores and needed a backend for the information to be pushed and pulled from. MongoDB allowed me to do just that; as I followed a YouTube tutorial on how to make my first database and host a server, I began realizing how complicated this would make the submission. Setting up the server was a challenge in itself because I was not familiar with Express. But, as I kept trying to set up the server, I slowly but surely began to understand how to alter the database and how to properly reference everything in my code. After I finished the basic YouTube tutorial, I began attempting to implement it into my website so that after a user lost their game in competitive mode, they would be asked for their name and the server would upload their name and high score onto the leaderboard. I thought everything was going well until it came time to reference the leaderboard database in the code. After a couple of frustrating hours of staring at my code and the YouTube tutorial, thinking that I made a mistake along the way, I soon deduced that MongoDB’s collections inside their databases need to end with an ‘s’ to be read properly. After I was able to get my collection data I was then on track to put the information into my collections. This was soon proven to be difficult but I learned about CRUD and was able to use forms as a way to send data to MongoDB and it was so fulfilling to be able to complete this feature.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
After completing the submission, I was left with a newfound respect for both front-end and back-end web developers. In terms of all the features I made I wasn’t left with too many questions. However there were a couple parts where I still find myself trying to understand why it works. The main one of course was MongoDB. A friend shared with me that one solution to refreshing my page was if I append instead of putting and now I’m left curious on how I could have implemented it onto my submission. Another one was that I was left curious on why MongoDB has a whitelist for IP Addresses instead of just allowing anyone to connect. It led to me having spent a lot of time trying to host my website on Glitch.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
Before even starting my submission, I had a setlist of features that I would add later on; one of these was a dropdown menu displaying different sound modes that the buttons would be able to play. For example, when clicking the buttons, a sound is produced and played back; but what if the user wanted the button to play a piano key or a trumpet note? This is a feature I would add if I was given just a few more hours to work on my submission. I believe the sound presets would have been an incredible feature that I will look more into for future projects.



## Interview Recording URL Link

[My 5-minute Interview Recording](your-link-here)


## License

    Copyright David Moreno

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
