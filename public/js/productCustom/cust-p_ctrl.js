//import  {Theme} from "./cust-p_model.js";

//const theme1 = new Theme("theme de la mort");


import {Picture, UploadedPictures, Theme, ProductCustom, Canvas, ProductView} from "./cust-p_model.js";
import {View} from "./cust-p_view.js";
import {ViewUtils} from "./cust-p_view.js";

// const theme1 = new Model.Theme("theme de la mort");

//console.log(theme1.themeName);

class Controller {

    constructor(picarray) {
        this.view = new View(new ViewUtils());
        this.picarr = picarray;
        console.log(this.picarr);
        this.addPicture = this.addPicture.bind(this);

        this.view.uploadPicture(this.addPicture);
    }



    addPicture(url) {
        let picture1 = new Picture("test", "testdata", url);
        console.log(picture1);
        console.log(this.picarr);
        //this.picarr.picturePush(picture1);
    }

}


$(document).ready(function() {
    const app = new Controller(new UploadedPictures());

});








