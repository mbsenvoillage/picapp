const canvas1 = document.getElementById('canvas1');
const c1ctx = canvas1.getContext('2d');

const canvas2 = document.getElementById('canvas2');
const c2ctx = canvas2.getContext('2d');

const page13 = new Image();
page13.src = "images/livre-Honore-13.png";

const testImg = new Image()


const bgImg = new Image();
bgImg.src = "images/Album_HONORE_03.png";

const dropzones = document.getElementsByClassName('droppable');

const dropzone = dropzones[0];

const getImageBtn = document.getElementById('getimage');
const getCanvasBtn = document.getElementById('getcanvas');
const replaceBtn = document.getElementById('replaceimage');
const zoomback = document.getElementById('zoomback');
const zoomfrwd = document.getElementById('frwd');
const zoombckwrd = document.getElementById('bckwd');


// creates and html tag that will host the dropped img src
// and will be used to initialize the cropper instance


let createHtmlImgTag =  function(className) {
    let imgtag = document.createElement("img");
    imgtag.className = className;
    return imgtag;
}


// Draws the page mask
let drawImageOnCanvas = function(cnv, ctx, img, sizedowntoratio) {
    let wRatio = cnv.width / img.width;
    let hRatio = cnv.height / img.height;
    let ratio = Math.min(wRatio, hRatio);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width*ratio, img.height*ratio);

}

// Creates a new canvas
let createCanvas = function(cnvsId, w, h) {
    const canvas = document.createElement('canvas');
    canvas.id = cnvsId;
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    return {
        canvas: canvas,
        ctx: ctx
    }
}

// When mask from page 13 is loaded, then draw that image on canvas2
page13.onload = function () {
    drawImageOnCanvas(canvas2, c2ctx, page13);
}

// When mask from page 1 is loaded, then draw that image on canvas1
bgImg.onload = function() {
    drawImageOnCanvas(canvas1, c1ctx, bgImg);
}

// When user starts to drag image, set what type of html data he's dragging (here, an image)
function dragstart_handler(e) {
    e.dataTransfer.setData("image/jpeg", e.target.id);
    e.dataTransfer.dropEffect = 'copy';
}

function drop_handler(e) {
    e.preventDefault();
}

/**
 *
 * let htmlImgTag = createHtmlImgTag("droppable");
 htmlImgTag.id = "someid";
 */

let htmlImgTag;

let imgidx = 0;

$(document).ready( function () {

    // Associate handler to dragstart event for all items from draggable class + give those pics an ID
    const elements = document.getElementsByClassName('draggable');
    for(let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dragstart", dragstart_handler);
        elements[i].setAttribute("id", "pic" + i);
    }

    // Restore the last zoom state
    zoomback.addEventListener('click', function (e) {
        let containerData = canvas2Cropper.getContainerData();
        canvas2Cropper.zoomTo(ratio, {
            x: containerData / 2,
            y: containerData.height / 2
        });
    })

    // Set background color of dropzone to $color to show drop area

    for(let i = 0; i < dropzones.length; i++) {
        dropzones[i].addEventListener('dragover', function(e) {
            e.preventDefault();
            e.target.setAttribute("style", "background-color:red");
        })
        dropzones[i].addEventListener('dragleave', function(e) {
            e.target.setAttribute("style", "background-color:unset");
        })

        // What happens when user drops picture on drop area ? Well, happens inside of here
        dropzones[i].addEventListener('drop', function (e) {
            e.preventDefault();

            var currCropper;
            var currEl = e.currentTarget.firstElementChild;
            if(e.currentTarget.firstElementChild) {
                var i = e.currentTarget.firstElementChild.id;
                currCropper = cropperInstanceStore[i];
            }

            (function encapsulateCropper(cb1, cb2) {

                if(!e.currentTarget.firstElementChild) {
                    var htmlImgTag = createHtmlImgTag("droppable");
                    htmlImgTag.id = imgidx;
                    htmlImgTag.setAttribute("style", "display: block; max-width: 100%");
                    e.target.appendChild(htmlImgTag);
                    console.log("I'm in here")
                    console.log();
                }


                // Get the url of the dragged picture, then create image object
                // and assign to the src attribute the value of the url
                var url = e.dataTransfer.getData('URL');
                var img = new Image();
                img.src = url;

                // If there is a cropper object that is there (ie: if the user had already dropped a picture)
                // destroy it, since we'll create a new one.
                // However, we'll need to change that, since cropper has a "replace" method, which is less memory hungry



                // When the user drops the picture on the drop area, we created a new image object
                // we gave it a src attribute
                // However, img takes time to load, so we use the asynchronous method onload
                img.onload = () => {

                    if (currEl) {
                        cropperInstanceStore[i].replace(img.src);
                        console.log("hey")
                    } else {
                        // We give to the html img tag the src of the newly created image object
                        htmlImgTag.setAttribute("src", img.src);

                        // We initilialise a new instance of a cropper object
                        var canvas2Cropper = new Cropper(htmlImgTag, {
                            viewMode: 0,
                            data: {},
                            zoomable: true,
                            movable: true,
                            dragMode: 'move',
                            background: false,
                            autoCrop: false,
                            zoom(e) {
                                if(e.detail.ratio > e.detail.oldRatio) {
                                    callback(e.detail.ratio);
                                }
                            },
                            cropBoxResizable: false,
                            zoomOnWheel: false,
                            toggleDragModeOnDblclick: false,
                            ready(event) {
                                canvas2Cropper.zoomTo(0.4);
                            }
                        });
                    }

                    if(!currEl) {
                        cb2(canvas2Cropper, imgidx);
                    }


                }

                // After the user drops the picture, we get rid of the red background color we used to signify the drop area
                // when he dragged his image over it
                e.target.setAttribute("style", "background-color:unset");

                // Gets image data from cropper (essentially, width + height)
                getImageBtn.addEventListener('click', function(e) {
                    if(currCropper) {
                        console.log(currCropper.getImageData());
                    }
                });

                // Replaces img in cropper
                replaceBtn.addEventListener('click', function (e) {
                    currCropper.replace(img.src);
                    currCropper.zoomTo(0.5);
                })

                // Gets canvas data from cropper (essentially x and y position of image within canvas)
                getCanvasBtn.addEventListener('click', function(e) {
                    if(currCropper) {
                        console.log(currCropper.getCanvasData());
                    }
                });

                // When user clicks zoom back, well, it zooms back
                zoombckwrd.addEventListener('click', function () {
                    if(currCropper) {
                        currCropper.zoom(-0.1)
                    }
                })

                // When user clicks zoom forward ....
                zoomfrwd.addEventListener('click', function () {
                    if(currCropper) {
                        currCropper.zoom(0.1)
                    }
                })



            })(incrementi(), canvasState);
        })
    }

});

let ratio;

// This callback gives us access to the zoom method's state ie. the variable that holds zoom ratio
function callback(rati) {
    ratio = rati;
    console.log(ratio);
}

function incrementi() {
    imgidx++;
}

function canvasState(canvas, idx) {
    cropperInstanceStore[idx] =  canvas;
    console.log(cropperInstanceStore);
}

let cropperInstanceStore = {};




