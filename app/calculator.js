class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function buildTree(expression) {
  const tokens = expression.split(' ');

  function buildSubtree() {
    if (tokens.length === 0) {
      return null;
    }

    const token = tokens.shift();
    const node = new Node(token);

    if ('+-*/'.includes(token)) {
      node.left = buildSubtree();
      node.right = buildSubtree();
    }

    return node;
  }

  return buildSubtree();
}

function evaluateTree(root) {
  if (!root) return 0;

  if (!root.left && !root.right) {
    return parseFloat(root.value);
  }

  const leftValue = evaluateTree(root.left);
  const rightValue = evaluateTree(root.right);

  switch (root.value) {
    case '+':
      return leftValue + rightValue;
    case '-':
      return leftValue - rightValue;
    case '*':
      return leftValue * rightValue;
    case '/':
      return leftValue / rightValue;
    default:
      throw new Error("Invalid operator: " + root.value);
  }
}

// Example usage


exports.calculate = function(expression) {
  const root = buildTree(expression);
  const result = evaluateTree(root);
  return result;

}



