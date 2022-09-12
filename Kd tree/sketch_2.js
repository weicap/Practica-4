  
var root;
var pointP = [140 ,90];
var data=[];
//}

function setup () {

    var width = 400;
    var height = 400;
    let kdTreeCanvas = createCanvas (width , height ) ;
    kdTreeCanvas.parent("KdTreeCanvas");

    background (0) ;

 ///////punto prueba   
    fill(254, 255, 51);
    circle(pointP[0],height-pointP[1],8);
    textSize(10);
    text(140+ ',' + 90, 140+ 5, height - 90);
////////punto prueba end

    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke (125 , 125 , 125) ;
            strokeWeight (1) ;
            line (x, 0, x, height );
            line (0 , y, width , y);
        }
    }

    var data = [
        [40 ,70] ,
        [70 ,130] ,
        [90 ,40] ,
        [100 , 100] ,
        [140 ,110] ,
        [175 , 100] ,
        [150 , 30]
    ];
    // var cantidadNodos= document.getElementById("cantidadNodos").value;
    // for ( let i = 0; i < cantidadNodos; i ++) {
    //     var x = Math.floor ( Math.random () * height );
    //     var y = Math.floor ( Math.random () * height );
    //     data.push ([x, y]) ;
    //     fill (255 , 255 , 255) ;
    //     circle (x, height - y, 7) ; // 200 -y para q se dibuje apropiadamente
    //     textSize (8) ;
    //     text (x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje
    // }
    
    datos_Prueba(data);

    let root = build_kdtree (data) ;
    var root2 = root;
    console.log (root);

    // switch(A) {
    //     case 1:
    //         //graficarclosetPoint(root);
    //         otro();
    //         break;
    //     case y:
    //         // code block
    //         break;
    //     default:
    //       // code block
    //   }
    // var punto = [5, 5];
    // var cercano = closest_point_brute_force (data, punto)
    // console.log (cercano);
    graficarclosetPoint(root);
    //graficarnaiveclosetPoint();

    var closestPoint1 = closest_point_brute_force(data, pointP);
    //fill(222, 15, 15);
    //circle(closestPoint1[0],height-closestPoint1[1],10);
    console.log(" >> 2 CLOSEST POINT BRUTE FORCE es: "+ closestPoint1);
    // var closestPoint2 = naive_closest_point(root2, pointP).node.point;
    // console.log(" >> 3 NAIVE CLOSEST POINT NAIVE : "+ closestPoint2);


    
    drawGraph(generate_dot(root));

}

function graficarclosetPoint(root){
    
    var nearestPoint=closest_point(root,pointP).node.point;
    fill(222, 15, 15);
    circle(nearestPoint[0],height-nearestPoint[1],10);
    console.log(" >> 1 CLOSEST POINT es: "+nearestPoint);
}

function datos_Prueba(datas){
    // var data = [
    //     [40 ,70] ,
    //     [70 ,130] ,
    //     [90 ,40] ,
    //     [100 , 100] ,
    //     [140 ,110] ,
    //     [175 , 100] ,
    //     [150 , 30]
    // ];
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
    let graphOptions = "node [fontsize=10 width=0.6 shape=circle style=filled fixedsize=shape] \n"
    let diagramText = "digraph G { \n" + dotString + "}";
    let viz = new Viz();

    viz.renderSVGElement("digraph G { " + graphOptions + dotString + "}")
        .then(function (element) {
            var parentTree = document.getElementById('KdTreeSvg');
            parentTree.outerHTML = element.outerHTML;
            let dotText = document.getElementById('DotText');
            dotText.innerText = diagramText;
        })
        .catch(error => {
            //console.error(error);
        });
}
// function graficaNodo(roots){
//     var graph = generateDot(roots);

//     var options = {
//        format: 'svg'
//     }
    
//     var image = Viz(graph, options);
//     var graph_holder = document.getElementById('graph_holder');
    
//     graph_holder.innerHTML = image;		// SVG
// }
function limpiarCuadro(){

    var width = 900; var height = 600; 
    createCanvas(width,height);
    background(0);
    fill(255, 255, 255);
    textSize(8);
    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke(125, 125, 125); 
            strokeWeight(0.5); 
            line(x,0,x,height);
            line(0,y,width,y);
        }
    }

}

function otro(){
    console.log('hola')
}
