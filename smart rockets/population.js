function Population() {
    this.rockets = [];
    this.popsize = 250
    this.matingpool = [];
    this.maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
        this.rockets[i] = new Rocket();
    }

    this.run = function () {
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
    this.evaluate = function () {

        // find what the best fitness value is
        for (let index = 0; index < this.popsize; index++) {
            this.rockets[index].calculateFitness();
            if (this.rockets[index].fitness > this.maxfit) {
                this.maxfit = this.rockets[index].fitness;

            }
        }

        // order rockets based on their fitness
        for (let index = this.rockets.length - 1; index > 0; index--) {
            var lastIndex = index;

            while (this.rockets[index].fitness > this.rockets[index - 1].fitness) {
                var worseRocket = this.rockets[index - 1];
                this.rockets[index - 1] = this.rockets[index];
                this.rockets[index] = worseRocket;
                if (index > 1) {
                    index--;
                }
            }
            index = lastIndex;
        }

        // make all fitness values be between 0 and 1
        for (let index = 0; index < this.popsize; index++) {
            this.rockets[index].fitness /= this.maxfit;
        }

        // make a mating pool with the top 50 percent of the rockets
        this.matingpool = [];
        for (let index = 0; index < this.popsize - floor(this.popsize / 2); index++) {
            var n = floor(this.rockets[index].fitness * 100);
            for (let x = 0; x < n; x++) {
                this.matingpool.push(this.rockets[index]);
            }
        }

     
    }
    this.selection = function () {
        var newRockets = [];
        for (let index = 0; index < this.rockets.length; index++) {
            var parentA = random(this.matingpool).dna;
            var parentB = random(this.matingpool).dna;

            var child = parentA.crossover(parentB);
            child.mutation();
            newRockets.push(new Rocket(child));
        }
        this.rockets = newRockets;
    }

}