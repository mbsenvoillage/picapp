/**
 *
 * @class Theme
 *
 * Represents theme info. Theme is used as a canvas surrounding and encapsulates user pictures.
 */

class Theme {
    constructor(themeName, themeGlobalView, themePreviewView) {
        this._themeGlobalView = themeGlobalView;
        this._themePreviewView = themePreviewView;
        this._themeName = themeName;
    }

    get themeName() {
        return this._themeName;
    }

    set themeName(value) {
        this._themeName = value;
    }

    get themeGlobalView() {
        return this._themeGlobalView;
    }

    set themeGlobalView(value) {
        this._themeGlobalView = value;
    }

    get themePreviewView() {
        return this._themePreviewView;
    }

    set themePreviewView(value) {
        this._themePreviewView = value;
    }
}

export {Theme};

/**
 *
 * @class ProductView
 *
 * Represents a part of the global customizable product.
 *
 */

class ProductView {

    constructor(id, singlePage, picture, theme, canvas) {
        this._doublePage = !this._singlePage;
        this._id = id;
        this._singlePage = singlePage;
        this._picture = picture;
        this._theme = theme;
        this._canvas = canvas;

    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get singlePage() {
        return this._singlePage;
    }

    set singlePage(value) {
        this._singlePage = value;
    }

    get picture() {
        return this._picture;
    }

    set picture(value) {
        this._picture = value;
    }

    get theme() {
        return this._theme;
    }

    set theme(value) {
        this._theme = value;
    }

    get canvas() {
        return this._canvas;
    }

    set canvas(value) {
        this._canvas = value;
    }

    get doublePage() {
        return this._doublePage;
    }

    set doublePage(value) {
        this._doublePage = value;
    }
}

export {ProductView};

/**
 *
 * @class Picture
 *
 */

class Picture {

    constructor(id, data, url) {
        this._id = id;
        this._data = data;
        this._url = url;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }
}

export {Picture};

/**
*
 * @class Canvas
 *
 * Represents the html canvas object.
 *
*/

class Canvas {

    constructor(id, picture, cropperData) {
        this._id = id;
        this._picture = picture;
        this._cropperData = cropperData;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get picture() {
        return this._picture;
    }

    set picture(value) {
        this._picture = value;
    }

    get cropperData() {
        return this._cropperData;
    }

    set cropperData(value) {
        this._cropperData = value;
    }
}

export {Canvas};

/**
 *
 * @class ProductCustom
 *
 * Represents a product that has been customized by a user. Contains the customized product's data
 * (type and an array of productViews)
 *
 */

class ProductCustom {
    constructor(id, userId, type, productViews) {
        this._id = id;
        this._userId = userId;
        this._type = type;
        this._productViews = productViews;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get userId() {
        return this._userId;
    }

    set userId(value) {
        this._userId = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get productViews() {
        return this._productViews;
    }

    set productViews(value) {
        this._productViews = value;
    }
}

export {ProductCustom};

class UploadedPictures {
    constructor() {
        this.picarray = [];
    }

    picturePush(picture) {
        this.picarray.push(picture);
    }
}

export {UploadedPictures};

