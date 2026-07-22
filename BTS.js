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

    return { root, includes }
}


let currentRoot = Tree([1, 5, 9, 14, 23, 27])

console.log(currentRoot.root);
console.log(currentRoot.includes(27));
// 24158627
// 