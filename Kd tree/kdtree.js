k=2;

class Node{
    constructor(point, axis){
        this.point = point;
        this.left = null;
        this.right = null;
        this.axis = axis; //eje x = 0, y=1
    }
}


function build_kdtree(points, depth = 0){
    var n = points.length;
    var axis = depth % k;//depth en que nivel estamos
    
    
    if (n <= 0){
    return null;
    }
    if (n == 1){
    return new Node(points[0], axis)
    }
    
    var median = Math.floor(points.length / 2);
    
    // sort by the axis :: ordenamos por el eje axis
    points.sort(function(a, b)
    {
    return a[axis] - b[axis];
    });
    //console.log(points);
    
    var left = points.slice(0, median);
    var right = points.slice(median + 1);
    
    //console.log(right);
    
    var node = new Node(points[median].slice(0, k), axis);
    node.left = build_kdtree(left, depth + 1);
    node.right = build_kdtree(right, depth + 1);
    
    return node;
}

function getHeight(node){
    return height;
}
function generate_dot(node){}


function in_circle(point, center, radio){
    var dis = distanceSquared(point,center);
    if(dis <= radio)
        return true;
    else
        return false;
}


function distanceSquared ( point1 , point2 ){
    var distance = 0;
    for (var i = 0; i < k; i ++)
    distance += Math.pow (( point1 [i] - point2 [i]) , 2) ;
    return Math.sqrt ( distance );
 }

function closest_point_brute_force ( points , point ) {}

function naive_closest_point (node , point , depth = 0, best = null ) {}

