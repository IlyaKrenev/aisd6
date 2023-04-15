class FibonacciHeap {
    rootList: any[];
    minNode: any
    nodeCount: number;

    constructor() {
        this.rootList = [];
        this.minNode = null;
        this.nodeCount = 0;
    }

    insert(node, key) {
        node.key = key;
        this.rootList.push(node);
        this.nodeCount++;
        if (this.minNode === null || this.minNode === undefined || key < this.minNode.key) {
            this.minNode = node;
        }
    }

    minimum() {
        return this.minNode;
    }

    extractMin() {
        const extractedMin = this.minNode;
        if (extractedMin !== null) {
            this.rootList.splice(this.rootList.indexOf(extractedMin), 1);
            this.nodeCount--;
            this.rootList.push(...extractedMin.children);

            this.minNode = this.rootList[0];
            if (this.minNode !== undefined) {
                this.rootList.forEach((node) => {
                    if (node.key < this.minNode.key) {
                        this.minNode = node;
                    }
                });
            }
        }
        return extractedMin;
    }

    union(otherHeap) {
        this.rootList.push(...otherHeap.rootList);
        if (this.minNode === null || (otherHeap.minNode !== null && otherHeap.minNode.key < this.minNode.key)) {
            this.minNode = otherHeap.minNode;
        }
        this.nodeCount += otherHeap.nodeCount;
    }
}

class FibNode {
    vertex: any;
    weight: number;
    parent: any;
    children: any[];
    degree: number;
    marked: boolean;
    key: any;

    constructor(vertex, weight) {
        this.vertex = vertex;
        this.weight = weight;
        this.parent = null;
        this.children = [];
        this.degree = 0;
        this.marked = false;
        this.key = null;
    }

    addChild(node) {
        node.parent = this;
        this.children.push(node);
        this.degree++;
    }

    removeChild(node) {
        node.parent = null;
        this.children.splice(this.children.indexOf(node), 1);
        this.degree--;
    }
}

function dijkstra_fib(graph, startVertex) {
    const distance = {};
    const visited = {};
    const heap = new FibonacciHeap();

    for (const vertex in graph) {
        distance[vertex] = Infinity;
        visited[vertex] = false;
    }

    distance[startVertex] = 0;
    visited[startVertex] = true;
    heap.insert(new FibNode(startVertex, 0), 0);

    while (heap.nodeCount !== 0) {
        const { vertex } = heap.extractMin();
        visited[vertex] = true;

        for (const neighbor in graph[vertex]) {
            const distanceToNeighbor = distance[vertex] + graph[vertex][neighbor];
            if (!visited[neighbor] && distanceToNeighbor < distance[neighbor]) {
                distance[neighbor] = distanceToNeighbor;
                const neighborNode = new FibNode(neighbor, distanceToNeighbor);
                heap.insert(neighborNode, distanceToNeighbor);
            }
        }
    }

    return distance;
}
