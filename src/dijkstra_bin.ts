class PriorityQueue {
    heap: any[];

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
            if (node.priority >= parent.priority) break;
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
                if (
                    (swap === null && rightChild.priority < node.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
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

        if (!graph[currentNode]) continue;

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
