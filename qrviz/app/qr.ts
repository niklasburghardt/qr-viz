export default class QRCode {
    mode: number = 0b0100;
    input: string = "";
    version: number;
    matrix: boolean[][];
    xp: number = 24;
    yp: number = 24;
    constructor(version: number, input="") { 
        this.input = input;
        this.version = version;
        this.matrix = [];
        this.generateQRCode();
    }
    
    setInput = (newInput: string) => {
        this.input = newInput;
        console.log(newInput);
    }
    // Private internal utility  (Steps in process)

    setPointer(x: number, y: number){
        this.xp = x;
        this.yp = y;
    }
    // Move the pointer to the next position in the zick zack scheme
    // TODO: this is not correct of course
    movePointer() {
        if(this.xp % 2 == 0) {
            this.xp--;
        } else {
            this.xp++;
            this.yp--;
        }
    }

    
    // Print the first 4 bits === data mode
    printDataMode() {
        for(let i = 1; i<16; i=i*2) {
            this.matrix[this.yp][this.xp] = Boolean(this.mode & i);
            this.movePointer();
        }
    }

    // Print the next 8 bits === size of message
    printMessageSize() {
        console.log(this.input)
        console.log(this.input.length)
        let size: number = this.input.length;
        for(let i = 1; i<Math.pow(2, 8); i=i*2) {
            this.matrix[this.yp][this.xp] = Boolean(size & i);
            this.movePointer();
        }
    }

    printMessage() {
        
    }


    randomizeMatrix = () => {
        let newMatrix: boolean[][] = []
        for(let i = 0; i<25; i++) {
        newMatrix.push([])
        for(let j = 0; j<25; j++) {
            const num = Math.random() > 0.5 ? true : false;
                newMatrix[i][j] = num;
            }
        }
        this.matrix = newMatrix;
    } 

    generateQRCode = () => {
        this.xp = 24;
        this.yp = 24;
        this.randomizeMatrix();
        this.printDataMode();
        this.printMessageSize();
    }
}