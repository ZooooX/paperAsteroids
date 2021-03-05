export function getRandomViewBorderPoint(excludedEdge){
    var edges = ['left','right','top','bot'];

    if(excludedEdge){
        let i = edges.indexOf(excludedEdge);
        edges.splice(i,1);
    }

    var selectedEdge = edges[Math.floor(Math.random() * Math.floor(edges.length))];
    let viewWidth = view.bounds.width;
    let viewHeight = view.bounds.height;

    if(selectedEdge == 'left'){
        return {edge : selectedEdge , point : new Point(0,Math.random() * Math.floor(viewHeight))};
    }
    else if(selectedEdge == 'right'){
        return {edge : selectedEdge , point : new Point(viewWidth,Math.random() * Math.floor(viewHeight))};
    }
    else if(selectedEdge == 'top'){
        return {edge : selectedEdge , point : new Point(Math.random() * Math.floor(viewWidth),0)};
    }
    else if(selectedEdge == 'bot'){
        return {edge : selectedEdge , point : new Point(Math.random() * Math.floor(viewWidth),viewHeight)};
    }
}