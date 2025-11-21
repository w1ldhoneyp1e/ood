add rectangle 395 330 10 40 #228B22 #006400 2
add rectangle 392 370 10 35 #228B22 #006400 2
add rectangle 390 405 10 30 #228B22 #006400 2
add rectangle 393 435 10 35 #228B22 #006400 2
add rectangle 396 470 10 40 #228B22 #006400 2

add triangle 340 390 50 40 #32CD32 #228B22 2
add triangle 400 390 50 40 #32CD32 #228B22 2

add ellipse 400 250 60 60 #FFB6C1 #FF69B4 2
add ellipse 450 300 60 60 #FFB6C1 #FF69B4 2
add ellipse 400 350 60 60 #FFB6C1 #FF69B4 2
add ellipse 350 300 60 60 #FFB6C1 #FF69B4 2
add ellipse 424 265 60 60 #FFB6C1 #FF69B4 2
add ellipse 424 335 60 60 #FFB6C1 #FF69B4 2
add ellipse 376 335 60 60 #FFB6C1 #FF69B4 2
add ellipse 376 265 60 60 #FFB6C1 #FF69B4 2

add ellipse 400 300 60 60 #FFD700 #FFA500 2

yarn workspace slides start
yarn workspace slides test
yarn workspace slides lint

yarn install
yarn workspace slides dev
http://localhost:5173
