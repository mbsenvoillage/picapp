const canvas1 = document.getElementById('canvas1');
const container = document.getElementById('canvas-container');
const canvas1ctx = canvas1.getContext('2d');
const img2 = document.getElementById('img');
//console.log(canvas1ctx);
//canvas1ctx.drawImage("croppedtest.jpg", 0, 0);

// Build a new image object with croppedtest as source
const img = new Image();
img.src = 'croppedtest.jpg';   

// Append it to canvas-container
container.appendChild(img);

// Build a new image object with cat as source
const cat = new Image();
cat.src = 'cat-5618328_1920.jpg';

// Initialize canvas contexts
const canvas2 = document.getElementById('canvas2');
const canvas2ctx = canvas2.getContext('2d');
const canvas3 = document.getElementById('canvas3');
const canvas3ctx = canvas3.getContext('2d');

// Prints the offset of canvas 1 relative to window
console.log(canvas1.offsetLeft, canvas1.offsetTop);

// Prints the offset of canvas 3 relative to closest parent
console.log(canvas3.offsetParent.offsetLeft, canvas3.offsetParent.offsetTop);

// When img is loaded execute callback

img.onload = () => {

    // Calculate destination/source ratio to save proportions
    let wRatio = canvas1.width / img.width;
    let hRatio = canvas1.height / img.height;
    let ratio = Math.min(wRatio, hRatio);

    // Draw img on canvas1 context
    // Why when I draw that image it does not return the original one, but a zoomed version of it
    // Or a lossy compressed version
    canvas1ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas1.width, canvas1.height);

    // Get image data from canvas1 ctx (returns ImageData Object )
    let data = canvas1ctx.getImageData(0, 0, canvas1.width, canvas1.height);

    /*
        //console.log(data);
            //let jsonObj = JSON.stringify(data);
            //let b64 = btoa(jsonObj);


            
            //console.log(canvas1.toDataURL());
   
    
            //img2.src = "data:image/png;base64, " + b64;
    */
    

    // Takes ImageData object "data" and draws it on canvas2 ctx
    canvas2ctx.putImageData(data, 0, 0);

    // Get image data from canvas2 ctx
    let data2 = canvas2ctx.getImageData(0, 0, canvas2.width, canvas2.height);

    // Takes ImageData object "data2" and draws it on canvas3 ctx
    canvas3ctx.putImageData(data2, 0, 0);
    //canvas3ctx.drawImage(img, 50, 2, 300, 200);


}