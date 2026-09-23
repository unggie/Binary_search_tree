function Node(data, leftChild = null, rightChild = null) {
    return { data, leftChild, rightChild }
}

function Tree(array) {
    function arrayClean(array) {
        const resultArray = array.sort((a, b) => { return a - b });
        const finalArray = [];
        for (let i = 1; i <= array.length; i++) {
            if (array[i-1] !== array[i]) finalArray.push(array[i - 1]);
        }
        return finalArray;
    }
    const treeArray = arrayClean(array);
    let root = buildTree(treeArray, 0, array.length - 1);
    function buildTree(array, start, end) {
        if (start > end) return null;

        // Calculate the mid and assign to root node
        let mid = start + Math.floor((end - start) / 2);
        let root = Node(array[mid]);
    
        // Recurvisely add leftChild and rightChild to root node
        root.leftChild = buildTree(array, start, mid - 1);
        root.rightChild = buildTree(array, mid + 1, end);
    
        return root;
    }

    function includes(value) {
      return includesHelper(root, value);
    }

    function includesHelper(root, value) { 
      // Base case: reached a null branch
      if (!root) return false;

      // Base case: value found
      if (root.data === value) {
          console.log("same same");
          return true;
      }

      // Recursive step
      if (value > root.data) return includesHelper(root.rightChild, value);
      else return includesHelper(root.leftChild, value);
    }

    // This function inserts values into the BST
    function insert(value) {
        // Check if value already exists then ignore it.
        if (includes(value)) {
            console.log("The value already exists in the BST.");
            return;
        }
        return insertHelper(root, value);
    }

    function insertHelper(root, value) {
        // Check if root is non-existant then assign value as root
        if (root === null) return Node(value);

        if (value < root.data) root.leftChild = insertHelper(root.leftChild, value);
        else root.rightChild = insertHelper(root.rightChild, value);

        return root;
    }

    // Helper function to get the small value in the right side of the tree
    function getSuccessor(currentNode) {
        currentNode = currentNode.rightChild;
        while (currentNode !== null && currentNode.leftChild !== null) currentNode = currentNode.leftChild;
        return currentNode;
    }

    function deleteItem(value) {
        return deleteItemHelper(root, value);
    }

    function deleteItemHelper(root , value) {
        // return null if root is null base case
        if (root === null) return root;

        // recursive step
        if (root.data < value) root.rightChild = deleteItemHelper(root.rightChild, value);
        else if (root.data > value) root.leftChild = deleteItemHelper(root.leftChild, value);
        else {
            // If node has zero or one child delete it
            if (root.rightChild === null) return root.leftChild;
            if (root.leftChild === null) return root.rightChild;

            // If node has two children find it's successor node
            // and delete it the original successor 
            const successor = getSuccessor(root);
            root.data = successor.data;
            root.rightChild = deleteItemHelper(root.rightChild, successor.data);
        }
        return root;
    }

    // Iterative approach
    // function levelOrderForEach(callback) {
    //     // Check if callback is a function
    //     if (typeof callback !== "function") {
    //         throw new Error("Callback is required as an argument!");
    //     }
    //     // Check if root isn't null
    //     if (!root) return;
    //     // Create a queue
    //     // ---- Shift(): To remove the first element in the array and move every other element forward by one index
    //     // ---- Push(): To add new elements at the back of the array
    //     const queue = [root];
    //     while (queue.length > 0) {
    //         const currentNode = queue.shift();
    //         // Pass value to the callback
    //         callback(currentNode.data);
    //         // Add values to queue
    //         if (currentNode.leftChild) queue.push(currentNode.leftChild);
    //         if (currentNode.rightChild) queue.push(currentNode.rightChild);
    //     }
    // }

    // Recursive Approach
    function levelOrderForEach(callback, queue = root ? [root] : []) {
        // Check if callback is a function
        if (typeof callback !== "function") {
            throw new Error("Callback is required as a function argument!");
        }

        if (queue.length === 0) return;
        const currentNode = queue.shift();
        // Pass the value of the currentNode to the callback
        callback(currentNode.data);
        // Add elements to the queue
        if (currentNode.leftChild) queue.push(currentNode.leftChild);
        if (currentNode.rightChild) queue.push(currentNode.rightChild);
        // Recursive step
        levelOrderForEach(callback, queue);
    }

    function inOrderForEach(callback, currentNode = root) {
        // Check if callback is a function
        if (typeof callback !== "function") {
            throw new Error("Callback is required as a function argument");
        }
        if (!currentNode) return;
        inOrderForEach(callback, currentNode.leftChild);
        callback(currentNode.data);
        inOrderForEach(callback, currentNode.rightChild);
    }
    function preOrderForEach(callback, currentNode = root) {
        // Check if callback is a function
        if (typeof callback !== "function") {
            throw new Error("Callback is required as a function argument");
        }
        if (!currentNode) return;
        callback(currentNode.data);
        preOrderForEach(callback, currentNode.leftChild);
        preOrderForEach(callback, currentNode.rightChild);
    }
    function postOrderForEach(callback, currentNode = root) {
        // Check if callback is a function
        if (typeof callback !== "function") {
            throw new Error("Callback is required as a function argument");
        }
        if (!currentNode) return;
        postOrderForEach(callback, currentNode.leftChild);
        postOrderForEach(callback, currentNode.rightChild);
        callback(currentNode.data);
    }

    // Returns the height of a given node
    function height(value) {
        let count = 0;
        // Find the node containing the value given the node exists
        const currentNode = nodeSearch(value, root);
        if (!currentNode) return undefined;
        else return heightHelper(currentNode, 0);

    }
    // This function finds the node
    function nodeSearch(value, root) {
        if (!root) return;
        if (root.data === value) return root;
        if (value > root.data) return nodeSearch(value, root.rightChild);
        else return nodeSearch(value, root.leftChild);
    }
    // This function finds the height
    function heightHelper(currentNode, count) {
        if (!currentNode) return;
        if (!currentNode.leftChild && !currentNode.rightChild ) {
            return count;
        }
        const leftSubTree = currentNode.leftChild 
            ? heightHelper(currentNode.leftChild, count + 1) 
            : count;
        const rightSubTree = currentNode.rightChild 
            ? heightHelper(currentNode.rightChild, count + 1) 
            : count;
        if (leftSubTree > rightSubTree) return leftSubTree;
        else return rightSubTree;
    }

    function depth(value) {
        return depthHelper(value, root, 0); 
    }
    function depthHelper(value, root, count) {
        if (!root) return;
        if (root.data === value) {
            return count;
        }
        if (value > root.data) return depthHelper(value, root.rightChild, count + 1);
        else return depthHelper(value, root.leftChild, count + 1);
    }
    function isBalanced() {
        return isBalancedHelper(root) !== false;
    }
    function isBalancedHelper(root) {
        if (!root) return -1;

        // Ask left subtree for height
        const leftSubTree = isBalancedHelper(root.leftChild);
        if (leftSubTree === false) return false;

        const rightSubTree = isBalancedHelper(root.rightChild);
        if (rightSubTree === false) return false;

        if (Math.abs(leftSubTree - rightSubTree) > 1) return false;

        return Math.max(leftSubTree, rightSubTree) + 1;

    }

    function rebalance() {
        const newArray = [];
        inOrderForEach(element => {
            if (!element);
            newArray.push(element);
        });
        const newRoot = buildTree(newArray, 0, newArray.length - 1);
        root = newRoot;
    }

    function getRoot() {
        return root;
    }

    return { 
        root, 
        getRoot,
        includes, 
        insert, 
        deleteItem, 
        levelOrderForEach, 
        inOrderForEach, 
        preOrderForEach, 
        postOrderForEach, 
        height, 
        depth,
        isBalanced,
        rebalance 
    }
}


let currentRoot = Tree([1, 5, 9, 14, 23, 27])

console.log(currentRoot.root);
// console.log(currentRoot.includes(27));
// console.log(currentRoot.root);
console.log(currentRoot.insert(30));
// console.log(currentRoot.deleteItem(27));
console.log(currentRoot.insert(30)); 
console.log(currentRoot.insert(40));
console.log(currentRoot.insert(50));
// currentRoot.levelOrderForEach((element) => {console.log(element)});
// console.log("InOrder Traversal: ");
// currentRoot.inOrderForEach(element => console.log(element))
// console.log("\n");
// console.log("preOrder Traversal: ");
// currentRoot.preOrderForEach(element => console.log(element))
// console.log("\n"); 
// console.log("postOrder Traversal: ");
// currentRoot.postOrderForEach(element => console.log(element))
// console.log("\n"); 
// console.log(currentRoot.height(9));
// console.log(currentRoot.depth(9));
// console.log(currentRoot.depth(27));
// console.log(currentRoot.depth(30));
console.log(currentRoot.isBalanced());
console.log(currentRoot.rebalance());
console.log(currentRoot.isBalanced());
console.log(currentRoot.getRoot());
