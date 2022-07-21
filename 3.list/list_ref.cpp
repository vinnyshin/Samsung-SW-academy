#include <iostream>

struct Node {
	int data;
	Node* next;
};

constexpr size_t MAX_NODE = 1000;

int node_count = 0;
Node node_pool[MAX_NODE];

Node* new_node(int data) {
	node_pool[node_count].data = data;
	node_pool[node_count].next = nullptr;

	return &node_pool[node_count++];
}

class SinglyLinkedList {
	Node head;

public:
	SinglyLinkedList() = default;

	void init() {
		head.next = nullptr;
	}

	void insert(int x) {
		Node* node = new_node(x);

		node->next = head.next;
		head.next = node;
	}

	void remove(int x) {
		Node* prev_ptr = &head;
		while (prev_ptr->next != nullptr && prev_ptr->next->data != x) {
			prev_ptr = prev_ptr->next;
		}

		if (prev_ptr->next != nullptr) {
			prev_ptr->next = prev_ptr->next->next;
		}
	}

	bool find(int x) const {
		Node* ptr = head.next;
		while (ptr != nullptr && ptr->data != x) {
			ptr = ptr->next;
		}

		return ptr != nullptr;
	}

	void print() const {
		Node* ptr = head.next;
		std::cout << "[List]  ";
		while (ptr != nullptr) {
			std::cout << ptr->data;
			if (ptr->next != nullptr) {
				std::cout << " -> ";
			}
			ptr = ptr->next;
		}
		std::cout << '\n';
	}
};

int main() {
	SinglyLinkedList slist {};
	// 0   : 초기화
	// 1 x : x 삽입
	// 2 x : x 삭제
	// 3 x : x 탐색
	int cmd, x;
	for (;;) {
		std::cin >> cmd;
		switch (cmd) {
		case 0:
			slist.init();
			slist.print();
			break;
		case 1:
			std::cin >> x;
			slist.insert(x);
			slist.print();
			break;
		case 2:
			std::cin >> x;
			slist.remove(x);
			slist.print();
			break;
		case 3:
			std::cin >> x;
			std::cout << (slist.find(x) ? "found" : "not found") << '\n';
			break;
		default:
			return std::cout << "invalid input\n", 0;
		}
	}
}