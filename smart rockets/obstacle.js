function Obstacle(posX, posY, width, height){

    this.x = posX;
    this.y = posY;
    
    this.width = width;
    this.height = height;

    this.show = function(){
        
        rect(this.x , this.y - this.height / 2, this.width, this.height)
    }
}