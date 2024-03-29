# No Waste Neko
An web application aimed to reduce household food wastage due to expiry dates by:
1. Helping users track their food products with minimal user input for a more fuss-free experience;
2. Suggesting recipes based on user's prefrences chosen from a gamified quiz; and
3. Spreading awareness in forms of fun facts and trivias.

# links
Deployed Website: https://no-waste-neko.azurewebsites.net/client/view/landingpage.html <br>
Git Repo: https://github.com/nlcchi/No-Waste-Neko <br>
Youtube Demostration: https://www.youtube.com/watch?v=wsaWLg5ZgEI <br>
If using Github: copy repository and launch landingpage.html <br>
If launching code from submitted files: launch landingpage.html <br>

# Test Account
Username: test <br>
Password: test

# Tech Stacks
Front end:
- HTML
- CSS
- Javascript
- Frameworks
  - Bootstrap
  - Vue.js
  - CDNFonts
  - Animate.Css

Back end:
- Local REST API and axios to retrieve data from database

Database:
- Hosted on Microsoft Azure 

APIs used:
1. Recipe generator: Spoonacular API (https://spoonacular.com/food-api/docs#Search-Recipes-Complex)
2. Access to user's camera: MediaDevices API (https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
3. Image to text: OCR API (Tesseract.js) (https://github.com/naptha/tesseract.js/blob/master/docs/intro.md)
4. Connect to database: Local REST API (documentation found in backend/index.html)

# Team Contributions
| Member  | Contribution |
| ------------- | ------------- |
| Beata Sancha Bautista De Leon  |  Front-end (Overall styling)  |
| Julia Villa  | Front-end (profile and quiz pages HTML + Javascript)  |
| Khoo Chloe  | Local REST API, back-end (login, signup Javascript)  |
| Koh Yong En Jeremy  | Front-end (saved recipes HTML + Javascript)  |
| Ngyuen Le Cam Chi  | GitHub Management, Cloud deployment, Front-end (new recipe, foodtracker), External API deployment (Recipe generator, OCR API)  |
| Sophie Montalban  | Front-end (Overall styling)  |

# Notes
If quiz answers clash with diet/intolerences, Spoonacular API is unable to return recipes.
Spoonacular API has limit. Recipes will not be generated after limit is reached.
