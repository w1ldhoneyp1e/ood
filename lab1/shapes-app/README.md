yarn workspace shapes-app dev
yarn workspace shapes-app test
yarn workspace shapes-app test:watch

AddShape circle1 #ff00ff circle 100 110 15
AddShape rect1 #123456 rectangle 10 20 30 40
AddShape triangle1 #00fefe triangle 200 200 250 200 225 250
AddShape line1 #fefefe line 300 100 350 150
AddShape text1 #ffaa88 text 100 300 16 Hello World
List
DrawShape circle1
DrawShape rect1
DrawShape triangle1
DrawPicture
MoveShape circle1 50 50
MoveShape rect1 -10 20
MovePicture 100 0
ChangeColor circle1 #00ff00
ChangeColor rect1 #ff0000
ChangeShape triangle1 circle 225 225 25
ChangeShape line1 rectangle 300 100 50 50
CloneShape circle1 circle2
CloneShape rect1 rect2
List
DeleteShape text1
List
DrawPicture