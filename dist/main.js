class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    enqueue(node, priority) {
        this.heap.push({ node, priority });
        this.bubbleUp();
    }
    dequeue() {
        const min = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return min;
    }
    bubbleUp() {
        let index = this.heap.length - 1;
        const node = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (node.priority >= parent.priority)
                break;
            this.heap[parentIndex] = node;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }
    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        const node = this.heap[0];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.priority < node.priority) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild.priority < node.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null)
                break;
            this.heap[index] = this.heap[swap];
            this.heap[swap] = node;
            index = swap;
        }
    }
    isEmpty() {
        return this.heap.length === 0;
    }
}
function dijkstra_bin(graph, startNode, endNode) {
    const distances = {};
    const previousNodes = {};
    const queue = new PriorityQueue();
    let path = [];
    for (let node in graph) {
        distances[node] = node === startNode ? 0 : Infinity;
        queue.enqueue(node, distances[node]);
        previousNodes[node] = null;
    }
    while (!queue.isEmpty()) {
        let { node: currentNode } = queue.dequeue();
        if (currentNode === endNode) {
            while (previousNodes[currentNode]) {
                path.push(currentNode);
                currentNode = previousNodes[currentNode];
            }
            break;
        }
        if (!graph[currentNode])
            continue;
        for (let neighbor in graph[currentNode]) {
            const distance = graph[currentNode][neighbor];
            const newPath = distances[currentNode] + distance;
            if (newPath < distances[neighbor]) {
                distances[neighbor] = newPath;
                previousNodes[neighbor] = currentNode;
                queue.enqueue(neighbor, newPath);
            }
        }
    }
    path = path.concat(startNode).reverse();
    return distances;
}
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
class FibonacciHeap {
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
const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};
class Main {
    constructor() {
        this.initGraph();
        ['base', 'bin', 'fib'].forEach((className) => {
            const button = document.querySelector(`.${className}`);
            button.addEventListener('click', () => this.buttonHandler(className));
        });
        const selector = document.querySelector('.selector');
        const amount = document.querySelector('.amount');
        const apply = document.querySelector('.apply');
        apply.addEventListener('click', () => {
            this.initGraph(selector.value, amount.value);
        });
    }
    initGraph(connectedness = 'Низкая', amount1 = '1000') {
        const amount = Number(amount1);
        const nodes = {};
        let vertexAmount = 1;
        if (connectedness === 'Средняя') {
            vertexAmount = 2;
        }
        if (connectedness === 'Высокая') {
            vertexAmount = 3;
        }
        for (let i = 1; i <= amount; i++) {
            const nodeName = `N${i}`;
            for (let j = 1; j <= vertexAmount; j++) {
                const directTo = `N${randomInteger(i + 1, i + 10)}`;
                nodes[nodeName] = Object.assign(Object.assign({}, nodes[nodeName]), { [directTo]: randomInteger(1, 10) });
            }
        }
        this.startVertex = 'N1';
        this.endVertex = `N${amount}`;
        this.graph = nodes;
        console.log('Граф:', this.graph);
    }
    buttonHandler(type) {
        const start = new Date().getTime();
        switch (type) {
            case 'base':
                console.log('SIMPLE', dijkstra(this.graph, this.startVertex));
                break;
            case 'bin':
                console.log('BIN', dijkstra_bin(this.graph, this.startVertex, this.endVertex));
                break;
            case 'fib':
                console.log('FIB', dijkstra_fib(this.graph, this.startVertex));
                break;
            default:
                break;
        }
        const finish = new Date().getTime();
        console.log(`Затраченное время: ${finish - start}`);
    }
}
new Main();
