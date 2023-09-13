'use strict';

const ChairmanKim = {
    resultantSightlineCalculator: function(rake_angle, splay_angle) {
        let sightline_angle = Math.atan(
            Math.tan(rake_angle * Math.PI/180) / Math.tan(splay_angle * Math.PI/180)
        ) * 180/Math.PI;
        return {
            sightline_angle: sightline_angle.toFixed(1),
            resultant_angle: (Math.atan(
                Math.tan(rake_angle * Math.PI/180) / Math.sin(sightline_angle * Math.PI/180)
            )* 180/Math.PI).toFixed(1)
        }
    },
    emcCalculator: function(temp_celsius, humidity) {
        let T = (temp_celsius * 9 / 5) + 32,
            H = humidity / 100.0,
            W = 330.0 + 0.452 * T + 0.00415 * T * T,
            K = 0.791 + 0.000463 * T - 0.000000844 * T * T,
            KH = K * H,
            K1 = 6.34 + 0.000775 * T - 0.0000935 * T * T,
            K2 = 1.09 + 0.0284 * T - 0.0000904 * T * T,
            EMC = 1800.0 / W * (KH / (1 - KH) + ((K1 * KH + 2 * K1 * K2 * K * K * H * H) / (1 + K1 * KH + K1 * K2 * K * K * H * H)));
        return((EMC).toFixed(1));
    },
    weavedSeatCalculator: function(length, width, seat_thickness, material_width) {
        let columns = Math.ceil(length / material_width);
        let rows = Math.ceil(width / material_width);
        return (rows * columns * 4) + ((rows + columns) * 2 * seat_thickness);
    },
};
