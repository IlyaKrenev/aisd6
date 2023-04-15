function dijkstra(graph, startNode) {
    const distances = {};
    for (let node in graph) {
        distances[node] = node === startNode ? 0 : Infinity;
    }

    const previousNodes = {};
    for (let node in graph) {
        previousNodes[node] = null;
    }

    const unvisitedNodes = Object.keys(graph);

    while (unvisitedNodes.length > 0) {
        let currentNode = unvisitedNodes.reduce((minNode, node) => {
            return distances[node] < distances[minNode] ? node : minNode;
        }, unvisitedNodes[0]);

        let neighbors = graph[currentNode];

        for (let neighbor in neighbors) {
            let distance = neighbors[neighbor];
            let newDistance = distances[currentNode] + distance;
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previousNodes[neighbor] = currentNode;
            }
        }

        unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);
    }

    return distances;
}
