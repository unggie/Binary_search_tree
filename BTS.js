function Node(data, leftChild = null, rightChild = null) {
    return { data, leftChild, rightChild }
}

function Tree(array) {
    let root = buildTree(array, 0, array.length - 1);
    return { root }
}

function buildTree(array, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = Node(array[mid]);

    root.leftChild = buildTree(array, start, mid - 1);
    root.rightChild = buildTree(array, mid + 1, end);

    return root;
}

console.log(Tree([1, 5, 9, 14, 23, 27]));