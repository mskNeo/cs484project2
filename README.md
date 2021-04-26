# Project 2: Exercise Boogaloo

CPSC 484: Intro to Human-Computer Interaction project 2.

## Usage

Running this project requires the hci-recorder project given by Nathan. In the src directory of this project, there is a folder titled "recordings" which has the pkl
files of the exercises we recorded ourselves with the camera setup. Please copy over the recordings data folder to the hci-recorder project and run it that way. Run `pipenv run python src/main.py --data-path data/{title of workout folder} --mode play` in a shell to run a workout. For example, running the Arm Circles workout would be `pipenv run python src/main.py --data-path data/arm_circles --mode play`. In a separate shell, go to the project directory and run `npm start` to start the application.