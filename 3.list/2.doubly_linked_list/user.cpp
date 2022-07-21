#define MAX_NODE 10000

struct Node {
	int data;
	Node* prev;
	Node* next;
};

Node node[MAX_NODE];
int nodeCnt;
Node* head;

Node* getNode(int data) {
	node[nodeCnt].data = data;
	node[nodeCnt].prev = nullptr;
	node[nodeCnt].next = nullptr;
	return &node[nodeCnt++];
}

void init() {
    head = getNode(0);
}

void addNode2Head(int data) {
    Node* newNode = getNode(data);
    newNode->next = head->next;
    
    if(head->next != nullptr) {
        head->next->prev = newNode;    
    }
    

    newNode->prev = head;
    head->next = newNode;
}

void addNode2Tail(int data) {
    Node* prev = head;
    while (prev && prev->next != nullptr) {
        prev = prev->next;
    }
    
    Node* newNode = getNode(data);
    newNode->next = prev->next;
    
    newNode->prev = prev;
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

    if (prev->next != nullptr) {
        prev->next->prev = newNode;
    }
    
    newNode->prev = prev;
    prev->next = newNode;
}

int findNode(int data) {
    Node* prev = head;
    int i = 1;

    while (prev && prev->next != nullptr && prev->next->data != data && i <= MAX_NODE) {
        prev = prev->next;
        ++i;
    }

    return i;
}

void removeNode(int data)  {
    Node* prev = head;
    while (prev && prev->next != nullptr && prev->next->data != data) {
        prev = prev->next;
    }

    if (prev->next != nullptr) {
        if (prev->next->next != nullptr) {
            prev->next->next->prev = prev;
        }
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

int getReversedList(int output[MAX_NODE]) {
    Node* prev = head;
    int i = 0;

    while (prev && prev->next != nullptr) {
        prev = prev->next;
    }

    Node* tail = prev;

    while (tail && tail->prev != nullptr && i < MAX_NODE) {
        output[i] = tail->data;
        tail = tail->prev;
        ++i;
    }

    return i;
}
