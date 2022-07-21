#include<iostream>

using namespace std;

constexpr size_t MAX_NODE = 2048;

struct Node {
    int data;
    Node* next;
};

Node node_pool[MAX_NODE];
Node* head;
Node* tail;

int cnt = 0;
int node_cnt;

Node* getNode(int data) {
    node_pool[node_cnt].data = data;
    node_pool[node_cnt].next = nullptr;
    ++cnt;
    return &node_pool[node_cnt++];
}

void init();
void addNode2Tail(int data);
void addNodeNext2Position(int data, int position);
void removeNodeByPosition(int position);
void changeNodeDataByPosition(int position, int data);
int getNodeDataByPosition(int position);

int run(int original_length, int cmd_cnt, int index);

int main(int argc, char** argv)
{
	int test_case, result, original_length, cmd_cnt, index;
	int T;

	freopen("sample_input.txt", "r", stdin);
    scanf("%d", &T);
    
    for(test_case = 1; test_case <= T; ++test_case) {
        scanf("%d %d %d", &original_length, &cmd_cnt, &index);
        init();
        result = run(original_length, cmd_cnt, index);
        printf("#%d %d\n", test_case, result);
	}

	return 0;
}

int run(int original_length, int cmd_cnt, int index) {
    int  position, data_cnt, data;
    char cmd;

    for (int i = 0; i < original_length; i++) {
        scanf("%d", &data);
        addNode2Tail(data);
    }

    for (int i = 0; i < cmd_cnt; i++) {
        scanf(" %c", &cmd);
        switch (cmd) {
        case 'I':
            scanf("%d %d", &position, &data);
            addNodeNext2Position(data, position);
            break;
        case 'D':
            scanf("%d", &position);
            removeNodeByPosition(position);
            break;
        case 'C':
            scanf("%d %d", &position, &data);
            changeNodeDataByPosition(position, data);
            break;
        default:
            printf("invalid command\n");
            break;
        }
    }

    return getNodeDataByPosition(index);
}

void init() {
    node_cnt = 0;
    cnt = 0;
    head = getNode(0);
    tail = head;
}

void addNode2Tail(int data) {
    Node* newNode = getNode(data);
    tail->next = newNode;
    tail = newNode;
}

void addNodeNext2Position(int data, int position) {
    Node* prev = head;
    int i = 0;

    if (prev == nullptr) {
        printf("ERROR: (addNodeNext2Position) head is nullptr?\n");
        return;
    }

    while (prev->next != nullptr && i < position) {
        prev = prev->next;
        ++i;
    }
    
    Node* newNode = getNode(data);

    newNode->next = prev->next;
    prev->next = newNode;
    
    if (newNode->next == nullptr) {
        tail = newNode;
    }
}

void removeNodeByPosition(int position) {
    Node* prev = head;
    int i = 0;

    if (prev == nullptr) {
        printf("ERROR: (removeNodeByPosition) head is nullptr?\n");
        return;
    }

    while (prev->next != nullptr && i < position) {
        prev = prev->next;
        ++i;
    }

    
    if (prev->next != nullptr) {
        prev->next = prev->next->next;
        --cnt;
        if (prev->next == nullptr) {
            tail = prev;
        }
    }
}

void changeNodeDataByPosition(int position, int data) {
    Node* prev = head;
    int i = 0;

    if (prev == nullptr) {
        printf("ERROR: (changeNodeDataByPosition) head is nullptr?\n");
        return;
    }

    while (prev->next != nullptr && i < position) {
        prev = prev->next;
        ++i;
    }

    
    if (prev->next != nullptr) {
        prev->next->data = data;
    }
}

int getNodeDataByPosition(int position) {
    Node* prev = head;

    if (prev == nullptr) {
        printf("ERROR: (getNodeDataByPosition) head is nullptr?\n");
        return -1;
    }

    if (position > cnt) {
        return -1;
    }

    for (int i = 0; i <= position; i++) {
        prev = prev->next;
    }

    return prev->data;
}