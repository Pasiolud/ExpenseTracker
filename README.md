(Project files are in "master"(fixed) branch due to my mistake)
# ExpenseTracker
Simple react + fastapi project
This project was primarily meant to practicly use Docker and play a bit with gemini API
(CSS is done mainly by AI)

The project was carried out between January 28 and February 3.

Main tech stack:
React + Typscript with vite with axios(that didn't age well)
Python: FastApi, ORM SqlAlchemy and Pydantic for data validation, Passlib, Bcrypt
Basic CSS,
sqlLite,
Docker,
JWT used for verification 

Few ss from FastAPI Swagger:
All endpoint's
<img width="1220" height="666" alt="obraz" src="https://github.com/user-attachments/assets/192b721f-7d87-40c6-976f-dfd6c7d4dc16" />

Authorization through Swagger:
<img width="963" height="666" alt="obraz" src="https://github.com/user-attachments/assets/5701bb1f-c554-4f52-b66b-fe39f1da4015" />

Checking user expenses:
<img width="887" height="696" alt="obraz" src="https://github.com/user-attachments/assets/821fa802-0292-4fa3-97d4-6d4a0ec3c870" />
(with visible jwt token)

Ai_summarization:
<img width="888" height="836" alt="obraz" src="https://github.com/user-attachments/assets/32055e5c-7c56-413d-90e4-6e3effe1d9d2" />



And yea I know that the so called SECRET_KEY should be in .env
