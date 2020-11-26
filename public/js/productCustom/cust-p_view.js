/**
 *
 * @class View
 *
 **/


class View {

    constructor(viewutils) {
        this.imgUploadBtn = document.getElementById('img-upload-btn');
        this.imgUploadInput = document.getElementById('img-upload-input');
        this.photo = $("#photo-test");
        this.utils = viewutils;
    }

    fireInputEvent() {
        this.imgUploadBtn.addEventListener('click', e => {
            console.log("I was clicked");
            this.utils.clickOnBehalf(this.imgUploadInput);
        });
    }

    uploadPicture = (handler) => {
        this.fireInputEvent();

        this.imgUploadInput.addEventListener('change', e => {

            let url = this.utils.getPicUrl(this.imgUploadInput);
            console.log(this.imgUploadInput);
            handler(url);
        })
    }

}

export {View};

class ViewUtils {
    constructor() {
    }

    clickOnBehalf(element) {
        console.log("Passed through here");
        if(element) {
            element.click();
        }
    }

    getPicUrl(input){


        //console.log(input.files + "should be the target");
        if(input.files && input.files[0]) {

            let fReader = new FileReader();

            let url;
            fReader.onload = function(e, fn) {
                url = e.target.result;

                //console.log(url + "should be the url");

                //photo.css({'background-image' : "url(" + e.target.result +")", "background-size" : "cover"});
            };

            console.log(url + "should be the url outside");


            fReader.readAsDataURL(input.files[0]);


            /**
             *  const reader = (file) => {
                return new Promise((resolve, reject) => {
                    const fReader = new FileReader();
                    fReader.onload = () => resolve(fReader.result);
                    fReader.readAsDataURL(file);
                });
            }

             const readFile = (file) => {
                reader(file).then(result => {this.url=result });
            }

             let file = input.files[0];

             console.log(url + "is it saved now ? ");

             readFile(file);
             *
             *
             */


        }



        //return url;

    }
}

export {ViewUtils};
