import Handlebars from 'handlebars-template-loader/runtime';
import galleryTpl from './imagesGalleryTpl.hbs';
import anime from 'animejs';
import hammerjs from 'hammerjs';

import TemplateManager from '../TemplateManager';
import {Styles} from './styles.less';

export default class ImageGallery {
    constructor(){
        this.$galleryContainer = $('.gallery-module');
        this.$thumbImgWrap = this.$galleryContainer.find('img');
        this.$overlayContainer = null;
        this.templateManager = null;
        this.imgUrls = [];
        this.imgState = 0;
        this.mc = null;

        this.init();
    }

    attachListeners(){
        this.$thumbImgWrap.on('click',(e)=>{
            console.log($(e.target).parent().index())
            this.imgState = $(e.target).parent().index();
            this.moveAnim();
        });
    }

    removeRotatorListeners(){
        $('.next-btn').unbind('click');
        $('.prev-btn').unbind('click');
        $('.img-wrap').off();
    }

    attachRotatorListeners(){

        let imgWrap = $('.img-wrap');

        $('.next-btn').on('click', ()=>{
            this.moveAnim(1, 850);
        });

        $('.prev-btn').on('click', ()=>{
            this.moveAnim(-1, 850);
        });

        imgWrap.on('click',(e) => {
            if($(e.target).prop('tagName') != 'IMG') {
                this.hideGallery();
            }
        });

        //instance of Hammerjs for mobile devices

        if(!this.mc){
            this.mc = new Hammer(document.getElementById('gallery-overlay'));
            this.mc.on("panleft panright", (e)=> {
                console.log(e.type)
                switch(e.type){
                    case 'panright':
                        this.moveAnim(-1, 850);
                        break;

                    case 'panleft':
                        this.moveAnim(1, 850);
                        break;
                }
            });
        }
    }

    getAnimStepSize(){
        if(typeof this.$overlayContainer !== 'undefined'){
            return this.$overlayContainer.width() /  this.imgUrls.length;
        }
    }

    changeState(direction){
        if(direction) {
            this.imgState = this.imgState + direction;

            if (this.imgState > this.imgUrls.length - 1) {
                this.imgState = 0;
            }
            if (this.imgState < 0) {
                this.imgState = this.imgUrls.length - 1;
            }
        }
    }

    moveAnim(direction, duration = 1){
        this.$overlayContainer = $('.overlay-content');
        let _targetClassName = `.${this.$overlayContainer.attr('class')}`;
        let stepSize = this.getAnimStepSize();
        this.changeState(direction);


        anime({
            targets: [_targetClassName],
            translateX: this.imgState * -stepSize,
            duration: duration,
            easing: 'easeInOutExpo',
            complete: ()=>{
                if(!direction){
                    this.showGallery();
                }
            }
        });
    }

    init(){
        //get all images from DOM
        this.getImagesUrl();
        //prepare Handlebars instance
        this.templateManager = new TemplateManager($('body'), galleryTpl, {urls: this.imgUrls});
        //insert Habdlebars into body
        this.templateManager.insertTemplate();
        this.attachListeners();
    }

    getImagesUrl() {
        let _images = this.$galleryContainer.find('img');
        $.each(_images, (index, item)=>{
            let _obj = {
                url: item.src
            };
            this.imgUrls.push(_obj);
        });
    }

    showGallery(){
        anime({
            targets: ['#gallery-overlay'],
            opacity: 1,
            duration: 550,
            easing: 'easeInOutExpo',
            complete: ()=>{
                this.attachRotatorListeners();
            }
        });

        $('#gallery-overlay').css({pointerEvents: 'auto'});

    }


    hideGallery(){
        anime({
            targets: ['#gallery-overlay'],
            opacity: 0,
            duration: 350,
            easing: 'easeInOutExpo',
        });

        $('#gallery-overlay').css({pointerEvents: 'none'});

        this.removeRotatorListeners();
    }
}