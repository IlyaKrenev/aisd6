const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

class Main {
    graph: any;
    startVertex: any;
    endVertex: any;

    constructor () {
        this.initGraph();

        ['base', 'bin', 'fib'].forEach((className) => {
            const button = document.querySelector(`.${className}`);

            button.addEventListener('click', () => this.buttonHandler(className))
        });

        const selector = document.querySelector('.selector') as HTMLSelectElement;
        const amount = document.querySelector('.amount') as HTMLInputElement;
        const apply = document.querySelector('.apply') as HTMLButtonElement;

        apply.addEventListener('click', () => {
            this.initGraph(selector.value, amount.value);
        })
    }


    initGraph (connectedness: string = 'Низкая', amount1: string = '1000') {
        const amount = Number(amount1);
        const nodes: object = {};

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
                const directTo = `N${randomInteger(i + 1, i + 10)}`

                nodes[nodeName] = {
                    ...nodes[nodeName],
                    [directTo]: randomInteger(1, 10)
                }
            }
        }

        this.startVertex = 'N1';
        this.endVertex = `N${amount}`;
        this.graph = nodes;

        console.log('Граф:', this.graph);
    }

    buttonHandler (type: string) {
        const start = new Date().getTime();

        switch (type) {
           case 'base':
               console.log('SIMPLE', dijkstra(this.graph, this.startVertex))
                break;
           case 'bin':
               console.log('BIN', dijkstra_bin(this.graph, this.startVertex, this.endVertex))
                break;
           case 'fib':
               console.log('FIB', dijkstra_fib(this.graph, this.startVertex))
                break;
           default:
                break;
        }

        const finish = new Date().getTime();
        console.log(`Затраченное время: ${finish - start}`)
    }
}

new Main();
