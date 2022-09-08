function setup(){
    var width =250;
    var height = 200;
    createCanvas(width,height);

    background(0);
    for(var x=0;x<width;x+= width/10){
        for(var y=0;y<height;y+=height/5){
            stroke(125,125,125);
            strockWeight(1);
            line(x,0,x,height);
            line(0,y,width,y);
        }
    }

    var data = [];
    for(let i=0;i<12;i++){
        var x = Math.floor ( Math.random () * height );
        var y = Math.floor ( Math.random () * height );
        data.push ([x, y]) ;

        fill (255 , 255 , 255) ;
        circle (x, height - y, 7) ; // 200 -y para q se dibuje apropiadamente
        text.Size(8);
        text (x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
    }

    var root = kdtree.build_kdtree (data) ;
    console.log ( root );

}