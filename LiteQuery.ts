/**
 * Represents a LiteQuery collection of nodes.
 */
class LiteQuery
{
    private readonly _nodes: NodeList|Node[];
	
	/**
	 * Initialises a new LiteQuery collection.
	 * @param nodes An array-compatible collection of nodes.
	 */
	constructor(nodes: NodeList|Node[]) {
        this._nodes = nodes;
    }
	
	/**
	 * Produces a LiteQuery collection that contains either the provided nodes,
	 * or a new collection containing the results of a query selector within a context.
	 * @param selector The query selector, a Node, or an array-compatible collection of nodes.
	 * @param context If a query selector string is provided, the context of the selector, otherwise document.
	 * @returns A new LiteQuery collection.
	 */
    static query(selector: string|Node|Node[]|NodeList, context: Element | Document = document): LiteQuery {
        if (typeof selector == 'string')
            return new LiteQuery(context.querySelectorAll(selector));
        return new LiteQuery(selector instanceof Node ? [selector] : selector);
    }
	
	/**
	 * Iterates over each node, applying a function to each node.
	 * @param action The function to apply to each element.
	 * @returns The collection.
	 */
	each(action: (this: Node) => void): LiteQuery {
        let length = this._nodes.length;
        for (let i = 0; i < length; i++)
            action.apply(this._nodes[i]);
        return this;
    }
    
	/**
	 * Iterates over each node, applying a transformation function
	 * to each node and returning the resulting array.
	 * @param transform The function to transform each element into a result.
	 * @returns An array containing the transformed results.
	 */
    map<T>(transform: (this: Node) => T): T[] {
        let array = <T[]>[];
        let length = this._nodes.length;
        for (let i = 0; i < length; i++)
            array.push(transform.apply(this._nodes[i]));
        return array;
    }

	/**
	 * Iterates over each node, applying a filter function and returning a new filtered collection.
	 * @param predicate The function to determine if each node should be included.
	 * @returns A new collection containing the filtered nodes.
	 */
    filter(predicate: (this: Node) => boolean): LiteQuery {
        let filtered = <Node[]>[];
        let length = this._nodes.length;
        for (let i = 0; i < length; i++) {
            let node = this._nodes[i];
            if (predicate.apply(node))
                filtered.push(node);
        }
        return new LiteQuery(filtered);
    }
	
	/**
	 * Adds one or more classes to all elements in the collection.
	 * @param classNames A list of class names to add to each element whether a
	 * space separated string or an array of strings.
	 * @returns The collection.
	 */
	addClass(classNames: string|string[]): LiteQuery {
        let classes = Array.isArray(classNames) ? classNames : classNames.split(' ');
        return this.each(function (this: any) {
            if ('classList' in this)
                this.classList.add.apply(this.classList, classes);
        });
    }

	/**
	 * Removes one or more classes from all elements in the collection.
	 * @param classNames A list of class names to add to each element whether a
	 * space separated string or an array of strings.
	 * @returns The collection.
	 */
    removeClass(classNames: string|string[]): LiteQuery {
        let classes = Array.isArray(classNames) ? classNames : classNames.split(' ');
        return this.each(function (this: any) {
            if ('classList' in this)
                this.classList.remove.apply(this.classList, classes);
        });
    }
}

let Q = LiteQuery.query;
