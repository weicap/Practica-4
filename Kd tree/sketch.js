var root;
var pointP = [140 ,90];
var data=[];

function setup () {
    var width = 400;
    var height = 400;
    let kdTreeCanvas = createCanvas (width , height ) ;
    kdTreeCanvas.parent("KdTreeCanvas");

    background (0) ;

 ///////punto prueba   
    fill(254, 255, 51);
    circle(pointP[0],height-pointP[1],8);
    textSize(11);
    text(pointP[0]+ ',' + pointP[1], 140+ 5, height - 90);
////////punto prueba end

    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke (125 , 125 , 51) ;
            strokeWeight (0.1) ;
            line (x, 0, x, height );
            line (0 , y, width , y);
        }
    }

    var data = [];

    var cantidadNodos= document.getElementById("cantidadNodos").value;
    for ( let i = 0; i < cantidadNodos; i ++) {
        var x = Math.floor ( Math.random () * height );
        var y = Math.floor ( Math.random () * height );
        data.push ([x, y]) ;
        fill (255 , 255 , 255) ;
        circle (x, height - y, 7) ; // 200 -y para q se dibuje apropiadamente
        textSize (10) ;
        text (x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje
    }
    
    //datos_Prueba(data);

    root = build_kdtree (data) ;
    console.log (root);

    
    drawGraph(generate_dot(root));

}

function graficarclosetPoint(roots=root){
    console.log('pc');
    var nearestPoint=closest_point(roots,pointP).node.point;
    fill(222, 15, 15);
    circle(nearestPoint[0],height-nearestPoint[1],10);
    console.log("El nodo mas cercano es: "+nearestPoint);
}



function datos_Prueba(datas){

    for(let i = 0; i < datas.length; ++i) {
        x = datas[i][0];
        y = datas[i][1];
        fill(57, 255, 20);
        circle(x, height - y, 4);
        textSize(8);
        text (x + ',' + y, x + 5, height - y);
    }
return
}

function drawGraph(dotString) {
    //console.log(dotString);
    let graphOptions = "node [fontsize=10 width=0.6 shape=circle style=filled fixedsize=shape] \n"
    let diagramText = "digraph G { \n" + dotString + "}";
    let viz = new Viz();

    viz.renderSVGElement("digraph G { " + graphOptions + dotString + "}")
        //console.log('viz')
        .then(function (element) {
            //console.log('viz')
            var parentTree = document.getElementById('KdTreeSvg');
            parentTree.innerHTML = element.outerHTML;
            //console.log('viz')
            let dotText = document.getElementById('DotText');
            dotText.innerText = diagramText;
        })
        .catch(error => {
            //console.log(error);
        });
}


function graficarKNN(){
    var cantidadK= document.getElementById("cantidadKnn").value;
    var knn=findKNN(root,pointP,parseInt(cantidadK)).nearestNodes;
    for(let i=0;i<knn.length;i++){
        fill(222, 15, 15);
        circle(knn[i].point[0],height-knn[i].point[1],6); //200-y para q se dibuje apropiadamente 
        console.log(knn[i].point);
    }
}


function rangeCir(){
    //console.log('prueba1');
    var fe = [];
    var pon = pointP//[140, 90];
    //var h = [50, 100];
    var radio= document.getElementById("radio").value;
    //var radio = 75;

    range_query_circle(root,pon,radio,fe);
    fill(0,255,0,40);
    circle(pon[0],height-pon[1],radio*2)
}


function rangeRec(){
    //console.log('prueba1');
    var fe = [];
    var pon = pointP//[140, 90];
    var l1= document.getElementById("lado1").value;
    var l2= document.getElementById("lado2").value;
    var h = [l1, l2];
    //var radio= document.getElementById("radio").value;
    var radio = 50;

    range_query_rect(root,pon,h,fe);
    fill(0,255,0,40);
    rect(pon[0]-h[0],height-pon[1]-h[1],h[0]*2,h[1]*2)

    for (let i = 0; i < fe.length; i++){
        fill(0, 255, 0);
        circle(fe[i][0], height - fe[i][1], 7); //200-y para q se dibuje apropiadamente
        textSize(10);
        text(fe[i][0] + ',' + fe[i][1], fe[i][0] + 5, height - fe[i][1]); //200-y para q se dibuje apropiadamente
    }
}
