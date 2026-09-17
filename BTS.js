function Node(data, leftChild = null, rightChild = null) {
    return { data, leftChild, rightChild }
}

function Tree(array) {
    let root = buildTree(array, 0, array.length - 1);
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
        inOrderForEach(callback, currentNode.leftChild);
        inOrderForEach(callback, currentNode.rightChild);
    }
    function postOrderForEach(callback, currentNode = root) {
        // Check if callback is a function
        if (typeof callback !== "function") {
            throw new Error("Callback is required as a function argument");
        }
        if (!currentNode) return;
        inOrderForEach(callback, currentNode.leftChild);
        inOrderForEach(callback, currentNode.rightChild);
        callback(currentNode.data);
    }

    return { root, includes, insert, deleteItem, levelOrderForEach, inOrderForEach, preOrderForEach, postOrderForEach }
}


let currentRoot = Tree([1, 5, 9, 14, 23, 27])

console.log(currentRoot.root);
// console.log(currentRoot.root);
// console.log(currentRoot.includes(27));
// console.log(currentRoot.root);
// console.log(currentRoot.insert(30));
// console.log(currentRoot.deleteItem(27));
console.log(currentRoot.insert(30));
// currentRoot.levelOrderForEach((element) => {console.log(element)});
currentRoot.inOrderForEach(element => console.log(element))
console.log("\n\n");
currentRoot.preOrderForEach(element => console.log(element))
console.log("\n\n"); 
currentRoot.postOrderForEach(element => console.log(element))
console.log("\n\n"); 
// 24158627
// 