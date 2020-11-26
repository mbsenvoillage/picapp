const canvas1 = document.getElementById('canvas1');
const c1ctx = canvas1.getContext('2d');


const bgImg = new Image();
bgImg.src = "images/Album_HONORE_03.png";

const dropzones = document.getElementsByClassName('droppable');

const dropzone = dropzones[0];

const getImageBtn = document.getElementById('getimage');
const getCanvasBtn = document.getElementById('getcanvas');




let drawImageOnCanvas = function(cnv, ctx, img, sizedowntoratio) {
    let wRatio = cnv.width / img.width;
    let hRatio = cnv.height / img.height;
    let ratio = Math.min(wRatio, hRatio);
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width*ratio, img.height*ratio);

}

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


bgImg.onload = function() {
    drawImageOnCanvas(canvas1, c1ctx, bgImg);
}


const canvas2 = document.getElementById('canvas2');
const c2ctx = canvas2.getContext('2d');


/**
 * const centerImg = new Image();
 centerImg.src = "images/PagePerso/cheetah-5689870_1920.jpg";
 centerImg.onload = function () {
    drawImageOnCanvas(canvas2, c2ctx, centerImg);

}
 */





let cont = document.getElementById('test');

function dragstart_handler(e) {
    e.dataTransfer.setData("image/jpeg", e.target.id);
    e.dataTransfer.dropEffect = 'copy';
    let url = e.dataTransfer.getData("URL");
    let cnv = createCanvas(url, 100, 100);
    let img = new Image();
    img.src = url;

    img.onload = function() {
        drawImageOnCanvas(cnv.canvas, cnv.ctx, img, false);
    }
    let canvas = cnv.canvas;
    let ctx = cnv.ctx;

    //e.dataTransfer.setDragImage(canvas, 50, 50);
}

function drop_handler(e) {
    e.preventDefault();

}

let canvas2cropper;

$(document).ready( function () {
    const elements = document.getElementsByClassName('draggable');

    for(let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dragstart", dragstart_handler);
        elements[i].setAttribute("id", "pic" + i);
    }

    dropzone.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.target.setAttribute("style", "background-color:red");
    })
    dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        let url = e.dataTransfer.getData('URL');
        let img = new Image();
        img.src = url;
        if (typeof canvas2Cropper !== 'undefined') {
            canvas2Cropper.destroy();
            console.log("hi");
        }


        img.onload = () => {
            drawImageOnCanvas(canvas2, c2ctx, img, true);
            canvas2Cropper = new Cropper(canvas2, {
                viewMode: 0,
                data: {},
                zoomable: true,
                movable: true,
                dragMode: 'move',
                autoCrop: false
            });
            console.log(canvas2Cropper);

            getImageBtn.addEventListener('click', function(e) {
                if(typeof canvas2Cropper !== "undefined") {
                    console.log(canvas2Cropper.getImageData());
                    console.log("hi agin")
                }
                console.log("hello");
            });
        }
        e.target.setAttribute("style", "background-color:unset");
    })
    dropzone.addEventListener('dragleave', function(e) {
        e.target.setAttribute("style", "background-color:unset");
        console.log("geoo")
    })

    getCanvasBtn.addEventListener('click', function(e) {
        if(typeof canvas2cropper !== "undefined") {
            console.log(canvas2cropper.getCanvasData());
        }
        console.log("its me");
        console.log(canvas2cropper.getCanvasData());
    });



});




