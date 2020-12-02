const canvas1 = document.getElementById('canvas1');
const c1ctx = canvas1.getContext('2d');

const canvas2 = document.getElementById('canvas2');
const c2ctx = canvas2.getContext('2d');

const page13 = new Image();
page13.src = "images/livre-Honore-13.png";

const bgImg = new Image();
bgImg.src = "images/Album_HONORE_03.png";

const dropzones = document.getElementsByClassName('droppable');
const dragzones = document.getElementsByClassName("draggable-zone");

const replaceBtn = document.getElementById('replaceimage');
const zoomfrwd = document.getElementById('frwd');
const zoombckwrd = document.getElementById('bckwd');
const save = document.getElementById("save");
const destroyAll = document.getElementById("destroyall");
const reload = document.getElementById("reload");

// creates and html tag that will host the dropped img src
// and will be used to initialize the cropper instance





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

let imgidx = 0;

let clickedCanvasId;

let forEach = (arr, cb) => {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i);
    }
}

let zoomIn = () => {
    if (cropperInstanceStore[clickedCanvasId]) {
        cropperInstanceStore[clickedCanvasId].zoom(0.1);
    }
}

let zoomOut = () => {
    if (cropperInstanceStore[clickedCanvasId]) {
        cropperInstanceStore[clickedCanvasId].zoom(-0.1);
    }
}

let dragOverSetBackGround = (e) => {
    e.preventDefault();
    if (e.target && e.target.matches("div.droppable")) {
        e.target.setAttribute("style", "background-color:#B3D6D6");
    }
}

let dragOverUnsetBackGround = (e) => {
    if (e.target && e.target.matches("div.droppable")) {
        e.target.setAttribute("style", "background-color:unset");
    }
}

let resetImage = (e) => {
    if (cropperInstanceStore[clickedCanvasId]) {
        document.getElementById(clickedCanvasId).remove();
        cropperInstanceStore[clickedCanvasId].destroy();
        delete cropperInstanceStore[clickedCanvasId];
    }
}

let destroyAllCropperInstances = () => {
    for(key in cropperInstanceStore) {
        document.getElementById(key).remove();
        cropperInstanceStore[key].container.innerHTML = "";
        //cropperInstanceStore[key].destroy();
        //delete cropperInstanceStore[clickedCanvasId];
    }
    cropperInstanceStore = {};
    console.log("this is cropper instance store after destroy : " );
    console.log(cropperInstanceStore);
    console.log("this is cropper instance that has been saved : " );
    console.log(cropperSavedInstance);
}

let saveCropperData = (e) => {

    for(cropper in cropperInstanceStore) {
        cropperContainerStore.push(cropperInstanceStore[cropper].container);
        delete cropperInstanceStore[cropper].action;
    }
    console.log("this is cropper instance in save : " );
    console.log(cropperInstanceStore);
    cropperSavedInstance = cropperInstanceStore;
    console.log("this is cropper saved : ");
        console.log(cropperSavedInstance);
}

let cropperSetUp = (htmlEl) => {
    return new Cropper(htmlEl, {
        viewMode: 3,
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
            //canvas2Cropper.zoomTo(0.2);
        },
        minContainerWidth: 100,
    });
}

let createHtmlImgTag = function (className, id, styleRules = false) {
    let imgtag = document.createElement("img");
    imgtag.className = className;
    imgtag.id = id;
    if(styleRules) {
        changeElemCssRules(imgtag, styleRules);
    }
    return imgtag;
}

let reloadAllSavedCropperInstances = () => {
    console.log("I'm in the reloading function, outside loop. This is the cropperSavedInstance");
    console.log(cropperSavedInstance);

    for (key in cropperSavedInstance) {

        let htmlImgTag = createHtmlImgTag("droppable", key, {"display": "block", "max-width": "100%"});
        console.log(htmlImgTag);
        cropperSavedInstance[key].container.appendChild(htmlImgTag);
        console.log(cropperSavedInstance[key].container);

        let img = new Image();
        img.src = cropperSavedInstance[key].originalUrl;

        img.onload = () => {
            htmlImgTag.setAttribute("src", img.src);
            let canvas2Cropper = cropperSetUp(htmlImgTag);
            storeCanvasState(canvas2Cropper, htmlImgTag.id);
        };
    }
}

let changeElemCssRules = (elem, rules) => {
    for(rule in rules) {
        elem.style[rule] = rules[rule];
    }
}

let clickedContainer;

$(document).ready(function () {

    // Store container date on save
    save.addEventListener('click', saveCropperData);
    destroyAll.addEventListener('click', destroyAllCropperInstances);
    reload.addEventListener('click', reloadAllSavedCropperInstances);

    // Associate handler to dragstart event for all items from draggable class + give those pics an ID
    const draggablePics = document.getElementsByClassName('draggable');

    forEach(draggablePics, (el, i) => {
        el.addEventListener("dragstart", dragstart_handler);
        el.setAttribute("id", "pic" + i);
    })


    // Set background color of dropzone to $color to show drop area

    forEach(dragzones, el => {
        el.addEventListener('dragover', dragOverSetBackGround);
        el.addEventListener('dragleave', dragOverUnsetBackGround);
    })

    forEach(dropzones, el => {

        el.addEventListener('click', function (e) {
            if (e.currentTarget.firstElementChild) {
                //let currCropper;
                clickedCanvasId = e.currentTarget.firstElementChild.id;

                if(clickedContainer !== undefined) {
                    forEach(clickedContainer.childNodes, elem => elem.className === "cropper-container" ? changeElemCssRules(elem, {"border": "none"}) : elem);
                }
                 clickedContainer = cropperInstanceStore[clickedCanvasId].container;
                 forEach(e.currentTarget.childNodes, elem => elem.className === "cropper-container" ? changeElemCssRules(elem, {"border": "black dotted", "border-radius": "2%"}) : elem);


                //currCropper = cropperInstanceStore[i];

                // Replaces img in cropper
                replaceBtn.addEventListener('click', resetImage);

                // When user clicks zoom back, well, it zooms back
                zoombckwrd.addEventListener('click', zoomOut)

                // When user clicks zoom forward ....
                zoomfrwd.addEventListener('click', zoomIn);
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
                    htmlImgTag = createHtmlImgTag("droppable", imgidx, {"display": "block", "max-width": "100%"});
                    e.target.appendChild(htmlImgTag);
                }


                // Get the url of the dragged picture, then create image object
                // and assign to the src attribute the value of the url
                let url = e.dataTransfer.getData('URL');
                let img = new Image();
                img.src = url;


                // When the user drops the picture on the drop area, we created a new image object
                // we gave it a src attribute
                // However, img takes time to load, so we use the asynchronous method onload
                img.onload = () => {

                    if (currEl) {

                        cropperInstanceStore[i].replace(img.src);
                        cropperInstanceStore[i].originalUrl = img.src;
                        console.log(cropperInstanceStore[i])
                        console.log("cropper instance url: " + cropperInstanceStore[i].url);
                    } else {
                        console.log("I am being initialized")
                        // We give to the html img tag the src of the newly created image object
                        htmlImgTag.setAttribute("src", img.src);

                        // We initilialise a new instance of a cropper object
                        let canvas2Cropper = cropperSetUp(htmlImgTag);
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

var cropperInstanceStore = {};
var cropperSavedInstance = {};
var cropperContainerStore = [];

