export default class Queue {
	private head: number;
	private tail: number;
	private elements: any;

	constructor() {
		this.head = 0;
		this.tail = 0;
		this.elements = {};
	}

	public enqueue(element: any) {
		this.elements[this.tail] = element;
		this.tail++;
	}

	public dequeue() {
		const item = this.elements[this.head];
		delete this.elements[this.head];
		this.head++;
		return item;
	}

	public peek() {
		return this.elements[this.head];
	}

	public get length() {
		return this.tail - this.head;
	}

	public get isEmpty() {
		return this.length === 0;
	}

	public forEach(callback: (element: any) => void) {
		for (let index = this.head; index < this.tail; index++) {
			callback(this.elements[index]);
		}
	}
}
