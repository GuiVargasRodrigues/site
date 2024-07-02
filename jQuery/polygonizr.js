$(document).ready(function() {
    $('#polygonizr').polygonizr({
        restNodeMovements: 3,
        duration: 4,
        nodeDotSize: 8,
        nodeEase: "easeOut",
        nodeGlowing: false,
        nodeSpeed: 2,
        nodeAmount: 150,
        nodeColor: "rgba(255,255,255,0.8)",
        lineColor: "rgba(255,255,255,0.1)",
        lineWidth: 1,
        lineDistance: 40,
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 2,
        backgroundColor: "#0000FF" // Tela azul
    });
});
