$(document).ready(function() {
    $('#polygonizr').polygonizr({
        
        
        numberOfNodes: 3,
        nodeDotSize: 6,
        nodeEase: 'easeOutQuad',
        nodeLineWidth: 2,
        nodeFillColor: '#ff0000', 
        nodeDotColor: '#ffffff',  
        nodeLineColor: '#ffffff', 
        animationSpeed: 2.5,
        restNodeMovements: true,
        randomizePolygonMeshNetworkFormation: true,
        specifyPolygonMeshNetworkFormation: 3,
        nodeMovementDistance: 200
    });
});
