import HttpService from './core/HttpService';
import {Styles} from './styles/main.less';
import ImagesGallery from './core/features/ImagesGallery/ImageGallery';

const alertifyStyles = require('./../node_modules/alertifyjs/build/css/alertify.min.css');
const alertifyThemeStyles = require('./../node_modules/alertifyjs/build/css/themes/default.min.css');

window.alertify = require('alertifyjs');


export default class Main {
    constructor() {
        this.phpFileURL = '/boiler-plate/application/service.php'
        this.imgGallery = new ImagesGallery();
    }

    makeApiRequest() {
        let httpService = new HttpService();
        let saveData = httpService.call(this.phpFileURL, {name: 'namesad23', name2: 'as213das'}, 'POST');

        saveData.then(response => {
            alertify.success('Api request success');

        }, reject => {
           alertify.error('Api request error');
        });
    }
}

const initApp = new Main();

