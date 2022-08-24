#include <iostream>
#include <string.h>

using namespace std;

size_t djb2(const char* str) {
    size_t hash = 5381;
    for(; *str; ++str) {
        hash = ((hash << 5) + hash) + *str;
    }

    return hash;
}

constexpr int MAX_N = 100000;
constexpr int MAX_STR = 50;
constexpr int TABLE_SZ = 10007;

struct Node {
    char str[MAX_STR + 1];
    Node* next;
};

int node_cnt = 0;
Node node_pool[MAX_N];

Node* new_node(const char str[MAX_STR + 1]) {
    strcpy(node_pool[node_cnt].str, str);
    node_pool[node_cnt].next = nullptr;

    return &node_pool[node_cnt++];
}

class HashMap {
private:
    Node table[TABLE_SZ];

    Node* get_prev_node(const char str[MAX_STR + 1]) {
        Node* head = &table[djb2(str) % TABLE_SZ];
        while (head->next != nullptr && strcmp(str, head->next->str) != 0) {
            head = head->next;
        }
        
        return head;
    }

public:
    HashMap() = default;
    int duplicated_cnt;

    void init() {
        memset(table, 0, sizeof(table));
        node_cnt = 0;
        duplicated_cnt = 0;
    }

    void insert(const char str[MAX_STR + 1]) {
        Node* prev_node = get_prev_node(str);
        if (prev_node->next == nullptr) {
            prev_node->next = new_node(str);
        }
    }

    Node* get(const char str[MAX_STR + 1]) {
        return get_prev_node(str)->next;
    }
};

int main(int argc, char** argv)
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

	int test_case, T, len_a, len_b;
    char str[MAX_STR + 1];
    HashMap hash {};

    freopen("sample_input.txt", "r", stdin);
	cin >> T;
	
	for(test_case = 1; test_case <= T; ++test_case) {
        cin >> len_a >> len_b;
        hash.init();

        for (int i = 0; i < len_a; ++i) {
            cin >> str;
            hash.insert(str);
        }
        
        for (int i = 0; i < len_b; i++) {
            cin >> str;
            if (hash.get(str)) {
                ++hash.duplicated_cnt;
            }
        }
        
        cout << '#' << test_case << ' ' << hash.duplicated_cnt << endl;
	}
	return 0;
}

