int tree[100][5];
int child_cnt[100];
int stack[100];

void dfs_init(int N, int path[100][2]) {
    for (int i = 0; i < 100; i++) {
        child_cnt[i] = 0;
    }
    
    int parent;
    int child;

    for (int i = 0; i < N - 1; ++i) {
        parent = path[i][0];    
        child = path[i][1];
        tree[parent][child_cnt[parent]++] = child;
    }
}

int dfs(int n) {
    int max = 0;
    int curr;
    bool visited[100] = {false, };
    int top = -1;

    stack[++top] = n;

    while (top != -1) {
        curr = stack[top--];

        if (!visited[curr]) {
            visited[curr] = true;

            if (curr > n) {
                return curr;
            }

            for (int i = child_cnt[curr] - 1; i > -1; --i) {
                if (!visited[tree[curr][i]]) {
                    stack[++top] = tree[curr][i];
                }
            }
        }
    }

	return -1;
}
