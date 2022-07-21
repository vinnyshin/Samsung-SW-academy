#define MAX_NODE 10000

struct Node {
	int data;
	Node* next;
};

Node node[MAX_NODE];
int nodeCnt;
Node* head;

Node* getNode(int data) {
	node[nodeCnt].data = data;
	node[nodeCnt].next = nullptr;
	return &node[nodeCnt++];
}

void init() {
    head = getNode(0);
    head->next = nullptr;
}

void addNode2Head(int data) {
    Node* newNode = getNode(data);
    newNode->next = head->next;
    head->next = newNode;
}

void addNode2Tail(int data) {
    Node* prev = head;
    while (prev && prev->next != nullptr) {
        prev = prev->next;
    }
    
    Node* newNode = getNode(data);
    newNode->next = prev->next;
    prev->next = newNode;
}

void addNode2Num(int data, int num) {
    Node* prev = head;
    int i = 1;
    while (prev && prev->next != nullptr && i < num) {
        prev = prev->next;
        ++i;
    }

    Node* newNode = getNode(data);
    newNode->next = prev->next;
    prev->next = newNode;
}

void removeNode(int data) {
    Node* prev = head;
    while (prev && prev->next != nullptr && prev->next->data != data) {
        prev = prev->next;
    }

    if (prev->next != nullptr) {
        prev->next = prev->next->next;
    }
}

int getList(int output[MAX_NODE]) {
    Node* prev = head;
    int i = 0;

    while (prev && prev->next != nullptr && i < MAX_NODE) {
        prev = prev->next;
        output[i] = prev->data;
        ++i;
    }

    return i;
}