class ItemSelector extends HTMLElement {
    constructor() {
        super() ;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = /*html*/`
        <style>
            .btn{
                font-family: 'Ubuntu', 'Tajawal', sans-serif;
            }

            .selector {
                position: relative;
                font-size: 18px;
            }

            .card-image img {
                height: 225px;
                width: 200px
            }

            .card-pane {
                position: absolute;
                height: 48px;
                left: 0;
                bottom: 0;
                width: 200px;
                padding: 8px;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                align-items: center;
                background-color: rgba(0, 0, 0,.6);
                color: #FFF;
            }

            .flex {
                flex: 1;
            }

            .btn-raised.mini {
                height: 32px;
                padding: 0 8px;
            }

            .btn-raised {
                height: 44px;
                padding-left: 16px;
                padding-right: 16px;
                border-radius: 2px;
                text-transform: uppercase;
                font-size: 18px;
                font-weight: 500;
                position: relative;
                overflow: hidden;
            }

            .btn-accent {
                background-color: #FF3D00;
                background-image: linear-gradient(#FF3D00,#FF3D00);
            }

            .btn {
                display: inline-flex;
                justify-content: center;
                align-items: center;
                color: white;
                border: none;
                outline: none;
                cursor: pointer;
            }

            .cancel-btn {
                cursor: pointer;
            }

            .txt-caption {
                font-size:  15px
            }

            .btn-float.mini {
                height: 32px;
                width: 32px;
                box-shadow: 0px 4px 4px rgba(0,0,0, .16);
            }

            .btn-float {
                height: 56px;
                width: 56px;
                border-radius: 50%;
                box-shadow: 0px 12px 12px rgba(0,0,0, .16);
            }

            .btn-green {
                background-color: #15a008;
            }

            .mdi {
                font-size: 24px;
                line-height: 24px;
                margin: 12px;
            }

            .disabled {
                display: none
            }

            .enabled {
                display: flex
            }
        </style>
        <div class="selector">
            <a href="">
                <img class="card-image" src= ""> 
            </a>
            <div class="card-pane selecting enabled">
                <div class="flex"></div>
                <div class="btn mini btn-raised btn-accent">  
                    <span>select</span> 
                </div>
            </div>
            <div class="card-pane canceling disabled">
                    <div class="btn cancel-btn txt-caption"> cancel </div>
                    <div class="flex"></div>
                    <div class="btn mini btn-float btn-green"> 
                        <img class="mdi mdi-check" src="https://api.iconify.design/mdi-check.svg">  
                    </div>
            </div>
        </div>
           `       
    }

    set selected(value) {
        this.setAttribute("selected", value);
    }

    get selected() {
        return this.getAttribute("selected");
    }

    set width(value) {
        this.setAttribute("width", value);
    }

    get width() {
        return this.getAttribute("width");
    }

    set height(value) {
        this.setAttribute("height", value);
    }

    get height() {
        return this.getAttribute("height");
    }

    set imgSrc(value) {
        this.setAttribute("img-src", value);
    }

    get imgSrc() {
        return this.getAttribute("img-src");
    }

    set id(value) {
        this.setAttribute("id", value);
    }

    get id() {
        return this.getAttribute("id");
    }

    set itemLink(value) {
        this.setAttribute("item-link", value);
    }

    get itemLink() {
        return this.getAttribute("item-link");
    }

    set itemId(value) {
        this.setAttribute("item-id", value);
    }

    get itemId() {
        return this.getAttribute("item-id");
    }

    set routerType(value) {
        this.setAttribute("router-type", value);
    }

    get routerType() {
        return this.getAttribute("router-type");
    }

    connectedCallback() {
        this._selected= this.getAttribute("selected");
        this._height= this.getAttribute("height");
        this._width=this.getAttribute("width");
        this._imgSrc= this.getAttribute("img-src");
        this._id= this.getAttribute("id");
        this._itemLink= this.getAttribute("item-link");
        this._itemId= this.getAttribute("item-id");
        this._routerType= this.getAttribute("router-type");

        this.shadowRoot.querySelector(".btn span")
        .addEventListener("click", this.selecting.bind(event,this.shadowRoot, this));

        this.shadowRoot.querySelector(".cancel-btn")
        .addEventListener("click", this.canceling.bind(event, this.shadowRoot, this));
        
        if(this._selected == "true") ItemSelector.displaySelected(this.shadowRoot);
        else if(this._selected == "false") ItemSelector.displayUnselected(this.shadowRoot);
        
        this.render() ;
    }

    selecting(shadowRoot, domEl) {
        ItemSelector.displaySelected(shadowRoot);
        domEl.selected= "true";
        domEl.dispatchEvent(new CustomEvent("select-item"))
    }

    canceling(shadowRoot, domEl) {
        ItemSelector.displayUnselected(shadowRoot);        
        domEl.selected= "flase";
        domEl.dispatchEvent(new CustomEvent("deselect-item"))
    }

    static displaySelected(shadowRoot) {
        let selectingTag= shadowRoot.querySelector(".selecting").classList ;
        let cancelingTag= shadowRoot.querySelector(".canceling").classList ;
        selectingTag.remove("enabled");
        selectingTag.add("disabled");
        cancelingTag.remove("disabled");
        cancelingTag.add("enabled");
    }

    static displayUnselected(shadowRoot) {
        let selectingTag= shadowRoot.querySelector(".selecting").classList ;
        let cancelingTag= shadowRoot.querySelector(".canceling").classList ;
        cancelingTag.remove("enabled");
        cancelingTag.add("disabled");
        selectingTag.remove("disabled");
        selectingTag.add("enabled");
    }
    
    render() {
        let cardImage= this.shadowRoot.querySelector(".card-image");
        let router= this.shadowRoot.querySelector("a")
        cardImage.style.width= this._width;
        cardImage.style.height= this._height;
        cardImage.src= this._imgSrc;
        this.shadowRoot.querySelector(".card-pane").style.width= this._width;
        router.href= this._itemLink;
        if(typeof this._routerType != "undefined") 
            router.setAttribute("is", this._routerType);
        
    }

    static get observedAttributes() {
        return [
            "selected",
            "width", 
            "height", 
            "img-src", 
            "id", 
            "item-link",
            "router-type"
        ] ;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(name == "width")
           this._width= newVal;
        else if(name == "height")
            this._height= newVal;
        else if(name == "selected")
            this._selected= newVal;
        else if(name == "img-src")
            this._imgSrc= newVal;
        else if(name == "id")
            this._id= newVal;
        else if(name == "item-link")
            this._itemLink= newVal;
        else if(name == "router-type")
            this._routerType= newVal;

        this.render() ;
    }
}

window.customElements.define("item-selector", ItemSelector);

