add ellipse 330 300 50 50 #FFB6C1 #FF69B4 2
add ellipse 400 230 50 50 #FFB6C1 #FF69B4 2
add ellipse 470 300 50 50 #FFB6C1 #FF69B4 2
add ellipse 400 370 50 50 #FFB6C1 #FF69B4 2
add ellipse 365 265 50 50 #FFB6C1 #FF69B4 2
add ellipse 435 265 50 50 #FFB6C1 #FF69B4 2
add ellipse 435 335 50 50 #FFB6C1 #FF69B4 2
add ellipse 365 335 50 50 #FFB6C1 #FF69B4 2

add ellipse 380 280 70 70 #FFD700 #FFA500 2

yarn workspace slides start
yarn workspace slides test
yarn workspace slides lint

yarn install
yarn workspace slides dev
http://localhost:5173
