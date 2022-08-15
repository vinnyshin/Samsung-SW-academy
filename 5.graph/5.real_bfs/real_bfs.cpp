#include <iostream>
#include <string.h>

using namespace std;

constexpr int MAX_NODE = 100000;
constexpr int MAX_PARENT_OF_POWER_OF_2 = 16;

struct Node {
    int index;
    Node* next;
};

int parent[MAX_NODE + 1][MAX_PARENT_OF_POWER_OF_2];
int depth[MAX_NODE + 1];
Node child_head[MAX_NODE + 1];
Node node_pool[MAX_NODE + 1];
Node* tail[MAX_NODE + 1];
int node_cnt;
int index_queue[MAX_NODE];

void init_bfs(int N);
long long bfs(int start_index);
Node* get_node(int index);
void insert_node(int parent_index, int child_index);
int find_lca(int prev_index, int curr_index);

Node* get_node(int index) {
    node_pool[node_cnt].index = index;
    node_pool[node_cnt].next = nullptr;

    return &node_pool[node_cnt++];
}

int main(int argc, char** argv)
{
	int test_case;
	int T, N;
    long long result;
	
	freopen("sample_input.txt", "r", stdin);
	scanf("%d", &T);
	
    for(test_case = 1; test_case <= T; ++test_case) {
		scanf("%d", &N);
		init_bfs(N);
        result = bfs(1);
		printf("#%d %lld\n",test_case, result);
	}

	return 0;
}

void init_bfs(int N) {
    node_cnt = 0;
    
    memset(depth, 0, (N + 1) * sizeof(int));
    depth[0] = -1;
    for (int i = 1; i <= N; ++i) {
        memset(parent[i], 0, MAX_PARENT_OF_POWER_OF_2 * sizeof(int));
        child_head[i].next = nullptr;
        tail[i] = &child_head[i];
    }

	for (int i = 2; i <= N; ++i) {
        scanf("%d", &parent[i][0]);
        for (int j = 1; j < MAX_PARENT_OF_POWER_OF_2; ++j) {
            parent[i][j] = parent[parent[i][j - 1]][j - 1];
        }
        
        insert_node(parent[i][0], i);
    }
}

void insert_node(int parent_index, int child_index) {
    Node* child = get_node(child_index);
    Node* t = tail[parent_index];

    child->next = t->next;
    t->next = child;
    
    tail[parent_index] = child;
    depth[child_index] = depth[parent_index] + 1;
}

long long bfs(int start_index) {
    long long edge_cnt = 0;
    int front = -1, rear = -1;
    int curr_index, prev_index = 0;
    Node* child;
    
    index_queue[++rear] = start_index;
    
    while (front != rear) {
        curr_index = index_queue[++front];

        edge_cnt += find_lca(prev_index, curr_index);

        for (Node* prev = &child_head[curr_index]; prev->next != nullptr; prev = prev->next) {
            child = prev->next;
            index_queue[++rear] = child->index;
        }

        prev_index = curr_index;
    }

    return edge_cnt;
}

int find_lca(int prev_index, int curr_index) {
    int edge_cnt = 0;
    int target = curr_index, compare = prev_index;

    if (prev_index == 0) {
        return 0;
    }

    if (depth[target] < depth[compare]) {
        swap(target, compare);
    }
    
    if (depth[target] != depth[compare]) {
        for (int i = MAX_PARENT_OF_POWER_OF_2 - 1; i >= 0; --i) {
            if (depth[parent[target][i]] >= depth[compare] ) {
                edge_cnt += (1 << i);
                target = parent[target][i];
            }
        }
    }
    
    int lca = target;
    int diff = 0;

    if (target != compare) {
        for (int i = MAX_PARENT_OF_POWER_OF_2 - 1; i >= 0; --i) {
            if (parent[target][i] != parent[compare][i]) {
                edge_cnt += (1 << (i + 1));
                target = parent[target][i];
                compare = parent[compare][i];    
            }
            lca = parent[target][i];
            diff = (depth[target] - depth[lca]) << 1;
        }
    }

    return edge_cnt + diff;
}