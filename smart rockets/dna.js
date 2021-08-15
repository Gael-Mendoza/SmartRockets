function DNA(genes) {
    if (genes) {
        this.genes = genes;
    }
    else {
        this.genes = [];
        for (let index = 0; index < lifeSpan; index++) {
            this.genes[index] = p5.Vector.random2D();
            this.genes[index].setMag(0.2);
        }
    }

    this.crossover = function (partner) {
        // make a new dna that will be a half of parent a and the other of parent
        var newDna = [];
        var mid = floor(random(lifeSpan));
        for (var i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newDna[i] = this.genes[i];
            }
            else {
                newDna[i] = partner.genes[i];
            }
        }
        return new DNA(newDna);
    }
    this.mutation = function(){
        for (let index = 0; index < this.genes.length; index++) {
            if(random(1) < 0.01){
                this.genes[index] = p5.Vector.random2D();
                console.log("mutation occured");
            }
            
        }
    }
   
}