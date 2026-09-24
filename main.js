import { Tree } from "./BST.js"
function getRandomNumbers(length) {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
}
const array = getRandomNumbers(10);
const tree = Tree(array);

function printTraversal(Tree) {
    console.log("Level Order traversal: ")
    Tree.levelOrderForEach(element => console.log(element));
    console.log("Pre-Order traversal: ");
    Tree.preOrderForEach(element => console.log(element));
    console.log("Post-Order traversal: ");
    Tree.postOrderForEach(element => console.log(element));
    console.log("In-Order traversal: ");
    Tree.inOrderForEach(element => console.log(element));
}

console.log("Before inserting other values into the tree: ");
console.log("Balanced: ", tree.isBalanced(), "\n");
printTraversal(tree);
tree.insert(100);
tree.insert(120);
tree.insert(140);
tree.insert(160);
tree.insert(180);
tree.insert(200);
console.log("After inserting: ");
console.log("Balanced: ", tree.isBalanced(), "\n");
tree.rebalance();
console.log("After rebalance: ");
console.log("Balanced: ", tree.isBalanced(), "\n");
printTraversal(tree);
