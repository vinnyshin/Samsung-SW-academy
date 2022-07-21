#include<iostream>

constexpr size_t MAX_NODE = 10000;

struct Node {
    int data;
    Node* next;
};

Node node_pool[MAX_NODE];
Node* head;
Node* tail;
int node_cnt;

Node* getNode(int data) {
    node_pool[node_cnt].data = data;
    node_pool[node_cnt].next = nullptr;
    return &node_pool[node_cnt++];
}

void init() {
    node_cnt = 0;
    head = getNode(0);
    tail = head;
}

void addNode2Tail(int data) {
    Node* newNode = getNode(data);
    tail->next = newNode;
    tail = newNode;
}

void addNodesNext2Position(int data_cnt, int position) {
    Node* prev = head;
    int data, i = 0;

    if (prev == nullptr) {
        printf("ERROR: (addNodesNext2Position) head is nullptr?\n");
        return;
    }

    while (prev->next != nullptr && i < position) {
        prev = prev->next;
        ++i;
    }
    

    Node* old_prev_next = prev->next;

    for (int j = 0; j < data_cnt; j++) {
        scanf("%d", &data);
        Node* newNode = getNode(data);

        prev->next = newNode;
        prev = newNode;
    }

    prev->next = old_prev_next;

    if (old_prev_next == nullptr) {
        tail = prev;
    }
}

void removeNumOfNodeNext2Position(int data_cnt, int position) {
    Node* prev = head;
    int i = 0;

    if (prev == nullptr) {
        printf("ERROR: (removeNumOfNodeNext2Position) head is nullptr?\n");
        return;
    }

    while (prev->next != nullptr && i < position) {
        prev = prev->next;
        ++i;
    }

    for (int j = 0; j < data_cnt; j++) {
        if (prev->next != nullptr) {
            prev->next = prev->next->next;
        } else {
            break;
        }
    }

    if (prev->next == nullptr) {
        tail = prev;
    }
}

void print10NodeFromHead() {
    Node* prev = head;

    if (prev == nullptr) {
        printf("ERROR: (print10NodeFromHead) head is nullptr?\n");
        return;
    }

    for (int i = 0; i < 10; i++) {
        if(prev->next == nullptr) {
            break;
        }
        prev = prev->next;
        printf("%d ", prev->data);
    }

    printf("\n");
}