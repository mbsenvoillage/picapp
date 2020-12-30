const dragzones = document.getElementsByClassName("draggable-zone"),
    replaceBtn = document.getElementById('replaceimage'),
    zoomfrwd = document.getElementById('frwd'),
    zoombckwrd = document.getElementById('bckwd'),
    save = document.getElementById("save"),
    canvasHeight = 600,
    flickleft = document.getElementById("flick-left"),
    flickright = document.getElementById("flick-right"),
    page1 = document.getElementById("page-1"),
    page2 = document.getElementById("page-2"),
    page3 = document.getElementById("page-3"),
    page4 = document.getElementById("page-4"),
    photogridcontainer = document.getElementsByClassName("photo-grid-photo-container")[0],
    albumgridcontainer = document.getElementsByClassName("album-grid-container")[0],
    saveAlbumForm = document.getElementById("saveAlbumForm"),
    uploadpicform = document.getElementById("uploadpicform"),
    workspace = document.getElementById("workspace");

var cropperInstanceStore = {},
    cropperSavedInstance = {},
    cropperContainerStore = [];

let pages = {
    "1": page1,
    "2": page2,
    "3": page3,
    "4": page4,
}

let imageFolder = [["Album_HONORE_02.png", 2], ["Album_HONORE_03.png", 1], ["Album_HONORE_05.png", 3], ["livre-Honore-13.png", 4]];



// Draws the page mask
let drawImageOnCanvas = function (cnv, ctx, img, sizedowntoratio) {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, cnv.width, cnv.height);
}

// Creates a new canvas that complies to the proportions of the mask/image that will be drawn on it
// aspect ratio of image = width / height
let createCanvas = async function (cnvsId, aspectRatio, h) {
    const canvas = document.createElement('canvas');
    canvas.id = cnvsId;
    canvas.style.cssText = "position: absolute; max-width: 100%; display: block";
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = h * aspectRatio;
    ctx.canvas.height = h;
    return {
        canvas: canvas,
        ctx: ctx
    }
}

// Once canvas is created,
let imgToCanvas = async function(img, createCanvasFunc, parentNode) {
    let cnv = await createCanvasFunc;
    if (!cnv) {
        throw new Error("Something went wrong");
    } else {
        console.log(`this is the cnv height ${cnv.canvas.height}`);
        parentNode.style.width = `${cnv.canvas.width}px`;
        parentNode.style.height = `${cnv.canvas.height}px`;
        drawImageOnCanvas(cnv.canvas, cnv.ctx, img);
        parentNode.appendChild(cnv.canvas);
    }
}

// Generates an iameg object and assigns it a source attribute
let makeImg = src => {
    let img = new Image();
    img.src = src;
    return img;
}

let aspectRatioCalc = (imgWidth, imgHeight) => {
    return  imgWidth / imgHeight;
}


// Makes div tag for masks innerframes
let makeDivHtmlTag = (className, id = null) => {
    let div = document.createElement("div");
    div.className = className;
    if (id) div.id = id;
    return div;
}

let assignStyle = (el, w, h, top, left, rotate, position) => {
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.transform = `rotate(${rotate}deg)`;
    el.style.position = `${position}`;

}

let album1 = {
    "page-1" : {
        "1" : {
            "width" : 356,
            "height" : 499,
            "top" : 103,
            "left" : 218,
            "angle" : 0
        }
    },
    "page-2" : {
        "1" : {
            "width" : 672,
            "height" : 449,
            "top" : 215,
            "left" : 63,
            "angle" : 0
        }

    },
    "page-3" : {
        "1" : {
            "width" : 210,
            "height" : 313,
            "top" : 155,
            "left" : 117,
            "angle" : -7
        },
        "2" : {
            "width" : 367,
            "height" : 463,
            "top" : 103,
            "left" : 384,
            "angle" : 6
        }

    },
    "page-4" : {
        "1" : {
            "width" : 1352,
            "height" : 911,
            "top" : 337,
            "left" : 294,
            "angle" : 0
        },
        "2" : {
            "width" : 636,
            "height" : 943,
            "top" : 280,
            "left" : 2410,
            "angle" : 4
        },
        "3" : {
            "width" : 700,
            "height" : 1050,
            "top" : 1383,
            "left" : 323,
            "angle" : 4.5
        },
        "4" : {
            "width" : 1245,
            "height" : 830,
            "top" : 1363,
            "left" : 1347,
            "angle" : -3
        },
        "5" : {
            "width" : 1205,
            "height" : 795,
            "top" : 2372,
            "left" : 867,
            "angle" : -2
        },
        "6" : {
            "width" : 675,
            "height" : 1000,
            "top" : 2152,
            "left" : 2396,
            "angle" : 4
        }

    }
}


// Loops through pageinnerframes object (stores w, h, x, y, angle of every pages' inner frames)
// and applies corresponding css style to divs
// object should have the following structure (innerframes have a key which corresponds
// to their position, going left to right, top to bottom)
// {"page-1" :
//   {"1" :
//      {"width" : 10px,
//      "height" : 10px,
//      "xpos" : 10px,
//      "ypos" : 10px,
//      "angle": 4},
//   "2" :
//      {},
//  },
//  "page-2" :
//     {{}},
// }

let setDivCssAndAttachToDom = (obj, sizedownratio, page) => {
     for(let key in obj) {
         if(key === page) {
             let innerFrames = obj[key];
             let root = document.getElementById(key);
             for(const key2 in innerFrames) {
                 if(parseInt(key2)) {
                 let frame = innerFrames[key2];
                 for(let key3 in frame) {
                     if(key3 !== "angle") {
                         frame[key3] /= sizedownratio;
                     }
                 }
                 console.log("hey" + key);
                 let div = makeDivHtmlTag("droppable",`${key}-${key2}-container`);
                 if(key === "page-3") console.log(frame.width + ' ' + frame.height);
                 assignStyle(div, frame.width, frame.height, frame.top, frame.left, frame.angle, "absolute");
                 if(!div) {
                     throw new Error("Something went wrong")
                 } else {
                     root.appendChild(div);
                 }
             }
             }
         }
    }
}

let sizeDownRatio = (sourceImage, canvasHeight) => {
    return sourceImage.height / canvasHeight;
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
        //e.target.setAttribute("style", "background-color:#B3D6D6");
        e.target.style.backgroundColor = "#B3D6D6";
    }
}

let dragOverUnsetBackGround = (e) => {
    if (e.target && e.target.matches("div.droppable")) {
        //e.target.setAttribute("style", "background-color:unset");
        e.target.style.backgroundColor = "unset";
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
    for(let key in cropperInstanceStore) {
        document.getElementById(key).remove();
        cropperInstanceStore[key].container.innerHTML = "";
        //cropperInstanceStore[key].destroy();
        //delete cropperInstanceStore[clickedCanvasId];
    }
    cropperInstanceStore = {};
}

let saveCropperData = (e) => {

    for(let cropper in cropperInstanceStore) {
        cropperContainerStore.push(cropperInstanceStore[cropper].container);
        delete cropperInstanceStore[cropper].action;
    }
    cropperSavedInstance = cropperInstanceStore;
}

let cropperSetUp = (htmlEl, ratio) => {
     let cropIns = new Cropper(htmlEl, {
        viewMode: 3,
        data: {},
        zoomable: true,
        movable: true,
        dragMode: 'move',
        background: false,
        autoCrop: false,
        zoom(e) {
            callback(e.detail.ratio, cropIns);
        },
        cropBoxResizable: false,
        zoomOnWheel: false,
        toggleDragModeOnDblclick: false,
        ready(event) {
            if (ratio !== undefined) {
                cropIns.zoomTo(ratio);
            }
        },
        minContainerWidth: 100,
    });
     return cropIns;
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

let reloadAllSavedCropperInstances = async (store = null) => {
    let zoomRatios = [];
    let i = 0;
    if(store) {
        cropperSavedInstance = store;
    }
    for (key in cropperSavedInstance) {
        zoomRatios.push(cropperSavedInstance[key].z);
        let htmlImgTag = createHtmlImgTag("droppable", key, {"display": "block", "max-width": "100%"});
        console.log("this is the container id " + cropperSavedInstance[key]);
        console.log("this is the container id " + cropperSavedInstance[key].ctnr);
        let container = document.getElementById(cropperSavedInstance[key].ctnr);

        container.appendChild(htmlImgTag);

        let img = new Image();
        img.src = cropperSavedInstance[key].originalUrl;

        img.onload = async () => {
            htmlImgTag.setAttribute("src", img.src);
            console.log("zoom ratio : " + zoomRatios[i]);
            let canvas2Cropper = cropperSetUp(htmlImgTag, zoomRatios[i]);
            canvas2Cropper.ctnr = cropperSavedInstance[key].ctnr;
            i++;
            storeCanvasState(canvas2Cropper, imgidx);
            incrementi();
        };
    }
}

let changeElemCssRules = (elem, rules) => {
    for(let rule in rules) {
        elem.style[rule] = rules[rule];
    }
}

let clickedContainer;

let loadImage = url => {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
        }
        img.src = url;
    })
}

let postCropperData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(decycle(data))
    });
    console.log(data);
    return "Posted";
}

let loadAlbum = async (url) => {
    return await fetch(url)
        .then(response => response.json())
}


let flicker = (() => {
    let idx = 1;
    let numOfPages = Object.keys(pages).length;
    return (e) => {
        let target = e.target.parentNode.id;
        console.log(target);
        if(target === "flick-left") {
            if(idx <= 1) idx = 1;
            else idx--;
            //hide idx++
            pages[idx+1].style.visibility = "hidden";
            //display idx
            pages[idx].style.visibility = "visible";
        }
        if(target === "flick-right"){
            if(idx >= numOfPages) idx = numOfPages;
            else idx++;
            //hide idx--
            console.l
            pages[idx-1].style.visibility = "hidden";
            //display idx
            pages[idx].style.visibility = "visible";
        }
    }
})();

let extractNum = (str) => {
    let regex = /[0-9]/;
    return str.match(regex)[0];
}

let keyfinder = (obj, k, arr, once = false) => {
    if(typeof obj === 'object')
    {
        console.log(obj);
        if(obj.hasOwnProperty(k))
        {
            arr.push(obj[k])
            if(once) return;
        }
        for (let key in obj)
        {
            if (obj[key] !== null) keyfinder(obj[key], k, arr);
        }

    }
}


let fetchTheme = num => {
    return fetch(`../src/api/userpic.php?theme=${num}`)
        .then(data=>data.json());
}

let getThemeViewsUrls = data => {
    let json = data;
    let url = [];
    for(let key in data)
    {
        let innerUrl = [];
        for(let key2 in data[key])
        {
            if(key2 === 'url') {
                innerUrl.push(data[key][key2]);
                innerUrl.push(extractNum(key));
            }
        }
        url.push(innerUrl);
    }
    json.arrOfUrl = url;
    return new Promise(resolve => resolve(json));
}

let displayTheme = data => {
    let url = data.arrOfUrl;
    let canvases = url.map((el, i) => {
        // Loads each background image (html tag + src), creates a canvas and draws the loaded image on it
// with original image aspect ratio (aRatio = w / h)
// + calculates each inner frame position & size
        return loadImage(`../${el[0]}`)
            .then((img) => {
                let aRatio = aspectRatioCalc(img.width, img.height);
                let page = pages[el[1]];
                img.setAttribute("data-page", `${el[1]}`);
                imgToCanvas(img, createCanvas("canvas1", aRatio, canvasHeight), page);
                return new Promise(resolve => resolve(img));
            })
            .then((img) => {
                let page = img.dataset.page;
                let dRatio = sizeDownRatio(img, canvasHeight);
                setDivCssAndAttachToDom(data, dRatio, pages[page].id);
                return new Promise(resolve => resolve())
            });
    })
    // Stores loaded images and canvases promises
    let results = Promise.all(canvases);
    return new Promise(resolve => resolve(results));
}



let initWorkSpace = () => {
    const dropzones = document.getElementsByClassName('droppable');


    flickleft.addEventListener('click', flicker);
    flickright.addEventListener('click', flicker);
    saveAlbumForm.addEventListener('submit', function (e) {
        e.preventDefault();

        for(let key in cropperInstanceStore)
        {
            cropperInstanceStore[key].ctnr = cropperInstanceStore[key].container.id;
        }

        let albumId = document.getElementsByClassName("album-grid-album")[0].dataset.cpid;

        postCropperData(`../src/api/userpic.php?album=${albumId}`, cropperInstanceStore)
            .then(data=>console.log(data));

    })

    // Store container date on save
    save.addEventListener('click', saveCropperData);

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

            (function encapsulateCropper(storeCanvasStateCB) {

                if (!e.currentTarget.firstElementChild) {
                    htmlImgTag = createHtmlImgTag("droppable", imgidx, {"display": "block", "max-width": "100%"});
                    e.target.appendChild(htmlImgTag);
                }


                // Get the url of the dragged picture, then create image object
                // and assign to the src attribute the value of the url
                let url = e.dataTransfer.getData('URL');


                // When the user drops the picture on the drop area, we created a new image object
                // we gave it a src attribute
                // However, img takes time to load, so we use the asynchronous method onload
                loadImage(url)
                    .then(async img => {
                        if (currEl) {
                            cropperInstanceStore[i].replace(img.src)
                            cropperInstanceStore[i].originalUrl = img.src;
                        } else {
                            console.log("I am being initialized")
                            // We give to the html img tag the src of the newly created image object
                            htmlImgTag.setAttribute("src", img.src);

                            // We initilialise a new instance of a cropper object
                            let canvas2Cropper = await cropperSetUp(htmlImgTag);
                            currCropper = canvas2Cropper;
                            // When converting to JSON, using cycle.js, self-referencing properties in cropperSavedInstance disappear
                            // like the container, which references a div. To retrieve later the id of the container (used to reload a saved album)
                            // we store it in the cropper object
                            canvas2Cropper.ctnr = e.target.id;
                            storeCanvasStateCB(canvas2Cropper, imgidx);
                            incrementi();
                    }
                    })

                e.target.style.backgroundColor = "unset";

            })(storeCanvasState);
        })

    });
}



window.onload = function() {
    uploadpicform.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(uploadpicform);

        try {
            fetch('../src/api/userpic.php?pic=new&uid=1', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    div = makeDivHtmlTag("messages");
                    ul = document.createElement("ul");
                    for(let key in result)
                    {
                        if(key !== "id") {
                            let li = document.createElement("li");
                            li.innerHTML = result[key];
                            ul.appendChild(li);
                        }
                    }
                    div.appendChild(ul);
                    workspace.prepend(div);
                    setTimeout(() => document.getElementsByClassName("messages")[0].remove(), 1000);
                    if(result.id) {
                        loadImage('user_pictures/' + result.id)
                            .then(img => {
                                img.className = "draggable";
                                img.draggable = true;
                                let div = makeDivHtmlTag("photo-grid-photo");
                                div.appendChild(img);
                                photogridcontainer.appendChild(div);
                            })
                    }

                });
        } catch(error) {
            console.log(error);
        }

        uploadpicform.reset();

    })

}


// Fetch user albums
fetch('../src/api/userpic.php?album=all&Uid=1')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return  data.map(el => {
            let div = makeDivHtmlTag("album-grid-album");
            let p = document.createElement("p");
            p.innerText = el.title;
            div.appendChild(p);
            div.setAttribute("data-cpid", el["customized_product_id"]);
            div.setAttribute("data-thid", el["theme_id"]);
            albumgridcontainer.appendChild(div);
            console.log(div);
        })
    })
    .then(() => {
        // Fetch user pictures (then displayed on side bar)
         fetch('../src/api/userpic.php?pics=all&Uid=1')
            .then(response => response.json())
            .then(picurl => {
                let arr = []
                keyfinder(picurl, "picture_code_and_ext", arr);
                let pictures = arr.map(el => {
                     loadImage('user_pictures/' + el)
                        .then(img => {
                            img.className = "draggable";
                            img.draggable = true;
                            let div = makeDivHtmlTag("photo-grid-photo");//.appendChild(img);
                            div.appendChild(img);
                            photogridcontainer.appendChild(div);
                        })
                })
            });
        })
    // once pictures are loaded, set up toggle between album and photo view
    .then(() => {
        forEach(document.getElementsByClassName("album-grid-album"), el => {
            el.addEventListener('click', (e) => {
                let albumId = e.currentTarget.dataset.cpid;
                let themeId = e.currentTarget.dataset.thid;
                albumgridcontainer.style.display = "none";
                photogridcontainer.style.display = "flex";
                fetchTheme(themeId)
                    .then(data => getThemeViewsUrls(data))
                    .then(data => displayTheme(data))
                    .then(() => initWorkSpace())
                    .then(() => {
                        fetch(`../src/api/userpic.php?album=${albumId}&Uid=1`)
                            .then(response=>response.json())
                            .then(data=>{
                                console.log(retrocycle(JSON.parse(data[0])));
                                return retrocycle(JSON.parse(data[0]))
                            })
                            .then(data=>
                            {
                                if(data !== null)
                                {
                                    let arrofkeys = Object.keys(data);
                                    if (data[arrofkeys[0]].hasOwnProperty("url")) reloadAllSavedCropperInstances(data);
                                }
                            })
                    })
            })
        })
    })


let ratio;

// This callback gives us access to the zoom method's state ie. the variable that holds zoom ratio
function callback(rati, cropper) {
    ratio = rati;
    cropper.z = ratio;
    console.log(ratio);
    console.log(cropper);
}

function incrementi() {
    imgidx++;
}

function storeCanvasState(canvas, idx) {
    cropperInstanceStore[idx] = canvas;
    console.log(cropperInstanceStore);
}
