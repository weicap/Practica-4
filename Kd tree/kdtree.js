k=2;

class Node{
    constructor(point, axis){
        this.point = point;
        this.left = null;
        this.right = null;
        this.axis = axis; //eje x = 0, y=1
    }
}

// // class N_Point {
// //     constructor(points) {
// //         this.vectorialSpace = points;
// //     }
// // }

// function getHeight(node) {
//     if (node === null){
//         return 0;
//     }
//     // find the height of each subtree
//     var lh = getHeight(node.left);
//     var rh = getHeight(node.right);
//     return 1 + max(lh,rh);
// }
// function generate_dot(node){
//     if (node === null){
//         return "";
//     }
//     var tmp = '';
//     if (node.left != null){
//         tmp += '"' + node.point.toString() + '"' + ' -> ' + '"' + node.left.point.toString() + '"' + ';\n';
//         tmp += generate_dot(node.left);
//     }
//     if (node.right != null){
//         tmp += '"' + node.point.toString() + '"' + ' -> ' + '"' + node.right.point.toString() + '"' + ';\n';
//         tmp += generate_dot(node.right);
//     }
//     //console.log(tmp);
//     return tmp;
// }

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
    
   // console.log(right);
    
    var node = new Node(points[median].slice(0, k), axis);
    node.left = build_kdtree(left, depth + 1);
    node.right = build_kdtree(right, depth + 1);
    
    return node;
}


function distanceSquared ( point1 , point2 ){
	var distance = 0;
	for (var i = 0; i < k; i ++)
	distance += Math.pow (( point1 [i] - point2 [i]) , 2) ;
	return Math.sqrt ( distance );
}
//function generate_dot(node){}

//function range_query_circle (node , center , radio , queue , depth = 0) {}


function closest_point_brute_force(points, point){
    var distance = null;
    var best_distance = null;
    var best_point = null;
    for(let i = 0; i < points.length; i++){
        distance = distanceSquared(points[i], point);
        console.log(points[i]+' = '+distance);
        if(best_distance === null || distance < best_distance){
            best_distance = distance;
            //best_point = { 'point': points[i], 'distance': distance }
            best_point = points[i];
        }
    }
    return best_point;
}


function naive_closest_point(node , point , depth = 0, best = null ) {
    if(node != null){
        if(depth == 0){
            best = node.point.vectorialSpace;
        }
       
        var axisDistance = point[node.axis] - node.point.vectorialSpace[node.axis]; 
        let distanceBest = distanceSquared(best, point);
        let distanceNode = distanceSquared(node.point.vectorialSpace,point);


        if ( Math.abs(axisDistance) <= distanceBest ){
            if(distanceBest > distanceNode){
                best = node.point.vectorialSpace;
            }
            if(axisDistance > 0){
                return naive_closest_point (node.right , point , depth+1, best );
            }
            else{
                return naive_closest_point (node.left , point , depth+1, best);
            }
        }else{
            return best;
        }
    }else{
        return best;
    }
}

/////////////////////////////////////////////mejorado
scannedNodes = []; 
bestDist = Infinity;
function closest_point(node,point) {

    if (node === null) return;
    //console.log(node);
    //console.log(point);
    scannedNodes.push(node);
    var nodeDist = distanceSquared(node.point, point);
    //console.log(nodeDist);
    //console.log("-------------------");
    if (nodeDist < bestDist) {
        bestDist = nodeDist;
        guess = node;
        
    }
    console.log(node.point+' = ' +nodeDist);
    // Busca de forma recursiva la mitad del árbol que contiene el objetivo
    var side = point[node.axis] < node.point[node.axis] ? "left" : "right";
    if (side == "left") {
        closest_point(node.left,point);
        var otherNode = node.right
    } else {
        closest_point(node.right,point);
        var otherNode = node.left;
    }  
    //Si la hiperesfera candidata cruza este plano de división, mira el otro lado del plano examinando el otro subárbol
    if (otherNode !== null) {
        var i = node.axis;
        var delta = Math.abs(node.point[i] - point[i]);
        if (delta < bestDist) {
            closest_point(otherNode,point);
        } 
    }
    return { 
        node: guess, 
        distance: bestDist,
        scannedNodes: scannedNodes
    };
} 

function generate_dot(node) { 
    var cad = '';
	if(node == null)
		return '';

	if(node.left!=null)
	{
		cad = cad + '"' + node.point.toString() + "\"";
		cad = cad + " -> " + '"' + node.left.point.toString() + '"' + ";" + "\n";
	}
	if(node.right!=null)
	{
		cad = cad + "\"" + node.point.toString() + "\"";
		cad = cad + " -> " + '"' + node.right.point.toString() + '"' + ";" + "\n";
	}
	return cad + generate_dot(node.left) + generate_dot(node.right);
}

var queue ;
function findKNN(node,point,KN){
    KN = KN || 1;
    queue = new BPQ(KN);
    scannedNodes = [];
    console.log(node);
    return KNN(node,point);
}
function KNN(node,point){
    if (node === null) return;
    scannedNodes.push(node);
    // Agregar punto actual a BPQ
    queue.add(node, distanceSquared(node.point, point));
    // Busca de forma recursiva la mitad del árbol que contiene el punto de prueba
    if (point[node.axis] < node.point[node.axis]) {//comprobar la izquierda
        KNN(node.left,point);
        var otherNode = node.right;
    }else {// Comprobar la derecha
        KNN(node.right,point);
        var otherNode = node.left;
    }
    //Si la hiperesfera candidata cruza este plano de división, mira el otro lado del plano examinando el otro subárbol
    var delta = Math.abs(node.point[node.axis] - point[node.axis]);
    if (!queue.isFull() || delta < queue.maxPriority()) {
        KNN(otherNode,point);
    }
    return {
        nearestNodes: queue.values,
        scannedNodes: scannedNodes,
        maxDistance: queue.maxPriority()
    };
}

function BPQ(capacity) {
    this.capacity = capacity;
    this.elements = [];
}
BPQ.prototype.isFull = function() { 
    return this.elements.length === this.capacity; 
};
BPQ.prototype.isEmpty = function() { 
    return this.elements.length === 0; 
};
BPQ.prototype.maxPriority = function() {
    return this.elements[this.elements.length - 1].priority;
};
Object.defineProperty(BPQ.prototype, "values", {
    get: function() { return this.elements.map(function(d) { return d.value; }); }
});
BPQ.prototype.add = function(value, priority) {
    var q = this.elements,d = { value: value, priority: priority };
    if (this.isEmpty()) { 
        q.push(d); 
    } else {
        for (var i = 0; i < q.length; i++){
            if (priority < q[i].priority){
                q.splice(i, 0, d);
                break;
            }else if ( (i == q.length-1) && !this.isFull() ) {
                q.push(d);
            }
        }
    }
    this.elements = q.slice(0, this.capacity);
};  

function range_query_rect(node, center, hug, queue, depth = 0) {
    console.log('prueba2');
	if (node == null) {
		return null;
	}
	p += 1;
	console.log(p);
	var axis = node.axis;
	var next_branch = null;
	var opposite_branch = null;
	if (center[axis] < node.point[axis]) {
		next_branch = node.left;
		opposite_branch = node.right;
	} else {
		next_branch = node.right;
		opposite_branch = node.left;
	}
	var best = closer_point(center, node, range_query_rect(next_branch, center, hug, queue, depth + 1));
	if (Math.abs(center[axis] - node.point[axis]) <= hug[axis] * 2 || distanceSquared(center, best.point) > Math.abs(center[axis] - node.point[axis])) {
		if (Math.abs(center[0] - node.point[0]) <= hug[0] && Math.abs(center[1] - node.point[1]) <= hug[1]) {
			queue.push(node.point);
		}
		best = closer_point(center, best, range_query_rect(opposite_branch, center, hug, queue, depth + 1));
	}
	return best;
}

// function closer_point(point, p1, p2) {
//     console.log('prueba3');
//     if (p2 == null) {
// 		return p1;
// 	}
// 	var distance = distanceSquared(p1.point, point);
// 	if (distance < distanceSquared(p2.point, point))
// 		return p1;
// 	return p2;
// }
// function getHeight(node){
//     return height;
// }
// function generate_dot(node){}


// function in_circle(point, center, radio){
//     var dis = distanceSquared(point,center);
//     if(dis <= radio)
//         return true;
//     else
//         return false;
// }


// function distanceSquared ( point1 , point2 ){
//     var distance = 0;
//     for (var i = 0; i < k; i ++)
//     distance += Math.pow (( point1 [i] - point2 [i]) , 2) ;
//     return Math.sqrt ( distance );
//  }

// function closest_point_brute_force ( points , point ) {}

// function naive_closest_point (node , point , depth = 0, best = null ) {}
