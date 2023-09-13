'use strict';

ChairmanKim.UI = {
    init: function() {
        this.cacheDOM();
        this.bindEvents();
    },
    cacheDOM: function() {
        let id = function(elem_id) { return document.getElementById(elem_id); }

        this.contentContainer = document.querySelector('.right.column');
        this.nav = document.getElementById('nav');
        this.toggleables = document.querySelectorAll('.nav-item, .nav-content');

        this.splayAngle = id('splay_angle'),
        this.rakeAngle = id('rake_angle');
        this.resultantAngle = id('resultant_angle');
        this.sightlineAngle = id('sightline');

        this.tempCelsius = id('temp_celsius');
        this.relativeHumidity = id('relative_humidity');
        this.computedEMC = id('computed_emc');

        this.seatLength = id('seat_length');
        this.seatWidth = id('seat_width');
        this.seatThickness = id('seat_thickness');
        this.tapeWidth = id('material_width');
        this.cottonTapeSeatWrapper = id('weaved_chair_seat');
        this.computedTapeLength = id('computed_length');
    },
    bindEvents: function() {
        this.contentContainer.addEventListener('keydown', this.disableNewLine.bind(this));
        this.nav.addEventListener('click', this.toggleNav.bind(this));
        this.rakeAngle.addEventListener('keyup', this.computeResultantSightline.bind(this));
        this.splayAngle.addEventListener('keyup', this.computeResultantSightline.bind(this));
        this.tempCelsius.addEventListener('keyup', this.computeEMC.bind(this));
        this.relativeHumidity.addEventListener('keyup', this.computeEMC.bind(this));
        this.cottonTapeSeatWrapper.addEventListener('keyup', this.computeMaterialLength.bind(this));
    },
    resetNav: function() {
        [].forEach.call(this.toggleables, function(el) {
            el.classList.remove('active');
        });
    },
    toggleNav: function(e) {
        if (e.target.className == 'nav-item') {
            this.resetNav();
            e.target.classList.add('active');
            document.querySelector(e.target.getAttribute('href')).classList.add('active');
            window.document.title = e.target.innerText;
        }
    },
    disableNewLine: function(e) {
        if (e.which === 13) { e.preventDefault(); }
    },
    computeResultantSightline: function() {
        let results = ChairmanKim.resultantSightlineCalculator(
            Number(this.rakeAngle.innerText), Number(this.splayAngle.innerText));
        this.sightlineAngle.innerText = results.sightline_angle;
        this.resultantAngle.innerText = results.resultant_angle;
    },
    computeEMC: function() {
        this.computedEMC.innerText = ChairmanKim.emcCalculator(
            Number(this.tempCelsius.innerText), Number(this.relativeHumidity.innerText));
    },
    computeMaterialLength: function(e) {
        if (e.target.id == 'seat_length' || 'seat_width' || 'seat_thickness' || 'material_width') {
            this.computedTapeLength.innerText = ChairmanKim.weavedSeatCalculator(
                Number(this.seatLength.innerText), Number(this.seatWidth.innerText),
                Number(this.seatThickness.innerText), Number(this.tapeWidth.innerText)
            );
        };
    }
};

(function(){})(ChairmanKim.UI.init());
