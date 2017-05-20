/**
 * @author   Ikaros Kappler
 * @date     2017-05-18
 * @version  1.0.0
 **/


$( document ).ready( function() {

    var $canvas         = $( 'canvas#my_canvas' );
    var ctx             = $canvas[0].getContext('2d');
    var canvas_width    = 820;
    var canvas_height   = 540;
    var x               = 410-300/2; // Stating x value
    var y               = 270-300/3; // Stating y value
    var len             = 300;       // Stating length value
    var alpha_angle     = 0; // Stating angle value
    var iteration_count = 8; // Stating iteration value
    var line_width      = 2;

    var default_angle   = 45;

    // var colors = [ 'red', 'orange', 'blue', 'dark_grey' ];
    var colors = [ '#0000ff', '#0000a8', '#000068', 'dark_grey' ];
    
    var toRadians = function( d ) {
	return Math.PI*(d/180.0);
    };
    
    var paint = function(ctx) {
        c_curve(x, y, len, alpha_angle, iteration_n, ctx);
    };

    var mrand_i = function(max) {
	return Math.floor( Math.random()*max );
    };

    var draw = function() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,820,540);

	iteration_count = getIntegerInput('iterations');
	line_width      = getIntegerInput('line_width');
	c_curve( x, y, len, alpha_angle, iteration_count, ctx );
    };
    
    var c_curve = function( x, y, length, angle, iteration, ctx  ) {
        //var fx     = x; 
        //var fy     = y;
        var alpha  = angle;
        //var it_n   = iteration_n;
        if( iteration > 0 ) {
            length = (length / Math.sqrt(2));
            c_curve(x, y, length, (alpha + default_angle), (iteration - 1), ctx ); // Recursive Call
            x = (x + (length * Math.cos(toRadians(alpha + default_angle))));
            y = (y + (length * Math.sin(toRadians(alpha + default_angle))));
            c_curve(x, y, length, (alpha - default_angle), (iteration - 1), ctx ); // Recursive Call
        } else {
            ctx.strokeStyle = colors[ mrand_i(colors.length+1) ]; // Pick a random color for this segment
	    ctx.lineWidth   = line_width;
	    ctx.lineCap = 'round';
	    ctx.beginPath();
	    ctx.moveTo( x, y );
	    ctx.lineTo( x + (length * Math.cos(toRadians(alpha))),
			y + (length * Math.sin(toRadians(alpha))) );
	    ctx.stroke();
        }
    };
    
    /*
    var main = function() {
        C_curve points = new C_curve();
        points.x = 200; // Stating x value
        points.y = 100; // Stating y value
        points.len = 150; // Stating length value
        points.alpha_angle = 90; // Stating angle value
        points.iteration_n = 15; // Stating iteration value

        JFrame frame = new JFrame("Points");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(points);
        frame.setSize(500, 500);
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);

    };
    */

    draw();

    $( 'input#iterations' ).change( draw );
    $( 'input#line_width' ).change( draw );
   
} );


var getFloatInput = function(id) {
    return parseFloat( document.getElementById(id).value );
}

var getIntegerInput = function(id) {
    return parseInt( document.getElementById(id).value );
}

