  
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

    data = [
        [40 ,70] ,
        [70 ,130] ,
        [90 ,40] ,
        [100 , 100] ,
        [140 ,110] ,
        [175 , 100] ,
        [150 , 30]
    ];
    
    datos_Prueba(data);

    root = build_kdtree (data) ;
    //var root2 = root;
    console.log (root);
    document.getElementById("AlturaKDtree").value= getHeight(root);
    drawGraph(generate_dot(root));

}

function graficarclosetPoint(roots=root){
    
    var nearestPoint=closest_point(roots,pointP).node.point;
    fill(250, 142, 18);
    circle(nearestPoint[0],height-nearestPoint[1],10);
    console.log("El nodo mas cercano ES: "+nearestPoint);
}

function graficarnaiveclosetPoint(roots=root){
    //console.log('pc');
    var nearestPoint2 = naive_closest_point(roots, pointP).node.point;
    fill(120, 15, 15);
    circle(nearestPoint2[0],height-nearestPoint2[1],10);
    console.log("El nodo mas cercano ES: "+nearestPoint2);
}

function graficarfuerzabruta(data2=data){
    //console.log('pc');
    var nearestPoint3=closest_point_brute_force(data2, pointP);
    fill(222, 15, 15);
    circle(nearestPoint3[0],height-nearestPoint3[1],10);
    console.log("FUERZA_BRUTA_El nodo mas cercano ES: "+nearestPoint3);
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
    let graphOptions = "node [fontsize=10 width=0.6 shape=circle style=filled fixedsize=shape] \n"
    let diagramText = "digraph G { \n" + dotString + "}";
    let viz = new Viz();

    viz.renderSVGElement("digraph G { " + graphOptions + dotString + "}")
        .then(function (element) {
            var parentTree = document.getElementById('KdTreeSvg');
            parentTree.innerHTML = element.outerHTML;
            let dotText = document.getElementById('DotText');
            dotText.innerText = diagramText;
        })
        .catch(error => {
            //console.error(error);
        });
}

