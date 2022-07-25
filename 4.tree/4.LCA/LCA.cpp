#include <iostream>
#include <vector>
#include <stack>

using namespace std;

constexpr size_t MAX_NODE = 10002;

struct Node {
    int child_cnt;
    int child[2];
};

int parent_matrix [MAX_NODE];
vector<Node> tree;

int find_LCA(stack<int>, stack<int>);
int calculate_tree_size(int ans);

int main(int argc, char const *argv[]) {
    int T, V, E, target1, target2, parent, child;
    tree.reserve(MAX_NODE);

    freopen("input.txt", "r", stdin);
    
    scanf("%d", &T);

    for (int tc = 1; tc <= T; tc++) {
        stack<int> stack_target1;
        stack<int> stack_target2;
        tree.clear();
        tree.resize(MAX_NODE, {0, {0,0}});

        scanf("%d %d %d %d", &V, &E, &target1, &target2);
        
        // insertion
        for (int i = 0; i < E; i++) {
            scanf("%d %d", &parent, &child);
            parent_matrix[child] = parent;
            Node& curr = tree[parent];
            curr.child[curr.child_cnt++] = child;
        }
        
        // DFS
        child = target1;
        while (child != 1) {
            parent = parent_matrix[child];
            stack_target1.push(parent);
            child = parent;
        }

        child = target2;
        while (child != 1) {
            parent = parent_matrix[child];
            stack_target2.push(parent);
            child = parent;
        }

        int LCA = find_LCA(stack_target1, stack_target2);
        int tree_size = calculate_tree_size(LCA);

        printf("#%d %d %d\n", tc, LCA, tree_size);
    }
    return 0;
}

int find_LCA(stack<int> stack_target1, stack<int> stack_target2) {
    int cnt = stack_target1.size() < stack_target2.size() ? stack_target1.size() : stack_target2.size();
    int prev = -1;

    for (int i = 0; i < cnt; i++) {
        if (stack_target1.top() == stack_target2.top()) {
            prev = stack_target1.top();
            stack_target1.pop();
            stack_target2.pop();
        } else {
            break;
        }
    }

    return prev;
}

int calculate_tree_size(int ans) {
    stack<int> child_stk;
    child_stk.push(ans);
    int size = 0;
    
    while (!child_stk.empty()) {
        ans = child_stk.top();
        child_stk.pop();
        ++size;

        for (int i = 0; i < tree[ans].child_cnt; i++) {
            child_stk.push(tree[ans].child[i]);
        }
    }
    
    return size; 
}  
