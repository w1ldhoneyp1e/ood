add rectangle stem1 395 330 10 40 #228B22 #006400 2
add rectangle stem2 392 370 10 35 #228B22 #006400 2
add rectangle stem3 390 405 10 30 #228B22 #006400 2
add rectangle stem4 393 435 10 35 #228B22 #006400 2
add rectangle stem5 396 470 10 40 #228B22 #006400 2

add triangle leaf1 340 390 50 40 #32CD32 #228B22 2
add triangle leaf2 400 390 50 40 #32CD32 #228B22 2

add ellipse petal1 400 250 60 60 #FFB6C1 #FF69B4 2
add ellipse petal2 450 300 60 60 #FFB6C1 #FF69B4 2
add ellipse petal3 400 350 60 60 #FFB6C1 #FF69B4 2
add ellipse petal4 350 300 60 60 #FFB6C1 #FF69B4 2
add ellipse petal5 424 265 60 60 #FFB6C1 #FF69B4 2
add ellipse petal6 424 335 60 60 #FFB6C1 #FF69B4 2
add ellipse petal7 376 335 60 60 #FFB6C1 #FF69B4 2
add ellipse petal8 376 265 60 60 #FFB6C1 #FF69B4 2

add ellipse center 400 300 60 60 #FFD700 #FFA500 2

group flower petal1 petal2 petal3 petal4 petal5 petal6 petal7 petal8 center

set fill flower #32CD32

yarn workspace slides start
yarn workspace slides test
yarn workspace slides lint

yarn install
yarn workspace slides dev
http://localhost:5173
