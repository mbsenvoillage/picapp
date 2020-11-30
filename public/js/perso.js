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
const dragzones = document.getElementsByClassName("draggable-zone");

const dropzone = dropzones[0];

const setCanvasBtn = document.getElementById('setcanvas');
const getCanvasBtn = document.getElementById('getcanvas');
const replaceBtn = document.getElementById('replaceimage');
const zoomback = document.getElementById('zoomback');
const zoomfrwd = document.getElementById('frwd');
const zoombckwrd = document.getElementById('bckwd');


// creates and html tag that will host the dropped img src
// and will be used to initialize the cropper instance


let createHtmlImgTag = function (className) {
    let imgtag = document.createElement("img");
    imgtag.className = className;
    return imgtag;
}


// Draws the page mask
let drawImageOnCanvas = function (cnv, ctx, img, sizedowntoratio) {
    let wRatio = cnv.width / img.width;
    let hRatio = cnv.height / img.height;
    let ratio = Math.min(wRatio, hRatio);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width * ratio, img.height * ratio);
}

// Creates a new canvas
let createCanvas = function (cnvsId, w, h) {
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
bgImg.onload = function () {
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

let clickedCanvasId;

$(document).ready(function () {

    // Associate handler to dragstart event for all items from draggable class + give those pics an ID
    const draggablePics = document.getElementsByClassName('draggable');

    forEach(draggablePics, (el, i) => {
        el.addEventListener("dragstart", dragstart_handler);
        el.setAttribute("id", "pic" + i);
    })


    // Set background color of dropzone to $color to show drop area

    forEach(dragzones, el => {
        el.addEventListener('dragover', function (e) {
            e.preventDefault();
            if (e.target && e.target.matches("div.droppable")) {
                e.target.setAttribute("style", "background-color:red");
            }
        })
        el.addEventListener('dragleave', function (e) {
            if (e.target && e.target.matches("div.droppable")) {
                e.target.setAttribute("style", "background-color:unset");
            }
        })
    })

    forEach(dropzones, el => {
        el.addEventListener('click', function (e) {
            console.log("event detail in drop zone: " + e.detail);

            if (e.currentTarget.firstElementChild) {

                //let currCropper;
                clickedCanvasId = e.currentTarget.firstElementChild.id;
                //currCropper = cropperInstanceStore[i];
                // Gets image data from cropper (essentially, width + height)
                setCanvasBtn.addEventListener('click', function (e) {
                    if (currCropper) {
                        currCropper.setCanvasData(canvasData);
                        console.log(canvasData);
                        console.log("I'm setting canvas data")
                    }
                });

                // Replaces img in cropper
                replaceBtn.addEventListener('click', function (e) {
                    console.log(currCropper);
                    currCropper.reset();
                    currCropper.zoomTo(0.5);
                })

                // Gets canvas data from cropper (essentially x and y position of image within canvas)
                getCanvasBtn.addEventListener('click', function (e) {
                    if (currCropper) {
                        canvasData = currCropper.getCanvasData();
                        console.log(currCropper.getCanvasData());

                    }
                });

                // When user clicks zoom back, well, it zooms back
                zoombckwrd.addEventListener('click', function () {
                    if (cropperInstanceStore[clickedCanvasId]) {
                        cropperInstanceStore[clickedCanvasId].zoom(-0.1)
                    }
                    console.log(cropperInstanceStore);
                    //console.log(cropperInstanceStore[i])
                })
                let t = 0;

                // When user clicks zoom forward ....
                zoomfrwd.addEventListener('click', function (e) {

                    if (cropperInstanceStore[clickedCanvasId]) {
                        cropperInstanceStore[clickedCanvasId].zoom(0.1)
                    }
                    console.log(cropperInstanceStore);
                    console.log(cropperInstanceStore[clickedCanvasId])
                })
            }
        })

        el.addEventListener('drop', function (e) {
            e.preventDefault();

            let currCropper;
            let currEl = e.currentTarget.firstElementChild;
            let i;
            let htmlImgTag;
            if (e.currentTarget.firstElementChild) {
                i = e.currentTarget.firstElementChild.id;
                currCropper = cropperInstanceStore[i];
            }

            (function encapsulateCropper(incrementICB, storeCanvasStateCB) {

                if (!e.currentTarget.firstElementChild) {
                    htmlImgTag = createHtmlImgTag("droppable");
                    htmlImgTag.id = imgidx;
                    htmlImgTag.setAttribute("style", "display: block; max-width: 100%");
                    e.target.appendChild(htmlImgTag);
                }


                // Get the url of the dragged picture, then create image object
                // and assign to the src attribute the value of the url
                var url = e.dataTransfer.getData('URL');
                var img = new Image();
                img.src = url;


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
                        let canvas2Cropper = new Cropper(htmlImgTag, {
                            viewMode: 0,
                            data: {},
                            zoomable: true,
                            movable: true,
                            dragMode: 'move',
                            background: false,
                            autoCrop: false,
                            zoom(e) {
                                if (e.detail.ratio > e.detail.oldRatio) {
                                    callback(e.detail.ratio);
                                }
                            },
                            cropBoxResizable: false,
                            zoomOnWheel: false,
                            toggleDragModeOnDblclick: false,
                            ready(event) {
                                canvas2Cropper.zoomTo(0.2);
                            },
                            minContainerWidth: 100,
                        });
                        currCropper = canvas2Cropper;
                        storeCanvasStateCB(canvas2Cropper, imgidx);
                    }
                }

                e.target.setAttribute("style", "background-color:unset");

            })(incrementi(), storeCanvasState);
        })

    });

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

function storeCanvasState(canvas, idx) {
    cropperInstanceStore[idx] = canvas;
    console.log(cropperInstanceStore);
}

let cropperInstanceStore = {};
let canvasData;
console.log(canvasData);

let forEach = (arr, cb) => {
    let idx;
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i);
    }
}




