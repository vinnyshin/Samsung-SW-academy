#include <iostream>
#include <string.h>

constexpr size_t NAME_MAXLEN = 6;
constexpr size_t PATH_MAXLEN = 1999;
constexpr size_t MAX_NODE = 50000;

struct Node {
	size_t packed_string;
    char name[NAME_MAXLEN + 1]; // for debug
    Node* parent;
    Node* next;
	Node* children_head;
	int tree_size;
};

int node_count = 0;
Node node_pool[2 * MAX_NODE];
Node *root;

size_t pack_string(const char *a) {
    size_t result = 0;
    
    for (int i = 0; a[i] != '\0'; i++)
	{
		result |= ((a[i] - 96) << (i * 5));
	}
    
    return result;
}

void mstrcpy(char *dest, const char *src)
{
	int i = 0;
	while (src[i] != '\0')
	{
		dest[i] = src[i];
		i++;
	}
	dest[i] = src[i];
}

Node *get_node(char name[NAME_MAXLEN + 1])
{
    mstrcpy(node_pool[node_count].name, name);
    node_pool[node_count].packed_string = pack_string(name);
	node_pool[node_count].parent = nullptr;
    node_pool[node_count].children_head = nullptr;
    node_pool[node_count].next = nullptr;
    node_pool[node_count].tree_size = 1; // include itself

	return &node_pool[node_count++];
}

void init(int n) {
    node_count = 0;
    root = get_node("/");
    root->children_head = get_node("\0");
}

Node* find_node(Node* root, char name[NAME_MAXLEN + 1]) {
    Node* prev = root->children_head;
    size_t packed_string = pack_string(name);

    while (prev->next != nullptr && prev->next->packed_string != packed_string) {
        prev = prev->next;
    }

    return prev->next;
}

Node *find_prev_node(Node *root, char name[NAME_MAXLEN + 1]) {
	Node *prev = root->children_head;
    size_t packed_string = pack_string(name);

	while (prev->next != nullptr && prev->next->packed_string != packed_string) {
		prev = prev->next;
	}

	return prev;
}

void add_tree_size_to_all_parent(Node* leaf, int tree_size) {
    Node* parent = leaf->parent;

    while (parent != nullptr) {
        parent->tree_size += tree_size;
        parent = parent->parent;
    }
}

Node* insert_node(Node* root, char name[NAME_MAXLEN + 1]) {
    Node* new_node = get_node(name);
    new_node->children_head = get_node("\0");

    new_node->next = root->children_head->next;
    root->children_head->next = new_node;
    new_node->parent = root;

    return new_node;
}

void cmd_mkdir(char path[PATH_MAXLEN + 1], char name[NAME_MAXLEN + 1]) {
    Node* prev = root;
    char* token = strtok(path, "/");

    while (token != NULL) {
        prev = find_node(prev, token);
        token = strtok(NULL, "/");
    }

    Node* new_node = insert_node(prev, name);
    add_tree_size_to_all_parent(new_node, new_node->tree_size);
}

void cmd_rm(char path[PATH_MAXLEN + 1]) {
    Node *target_node = root;
	char *token = strtok(path, "/");

    while (token != NULL)
	{
		target_node = find_node(target_node, token);
		token = strtok(NULL, "/");
	}

    Node* prev = find_prev_node(target_node->parent, target_node->name);

    prev->next = target_node->next;
    add_tree_size_to_all_parent(target_node, -(target_node->tree_size));
}

void copy_children(Node* src_node, Node* dst_node) {
    Node* prev = src_node->children_head;
    Node* new_node;

    while (prev->next != nullptr) {
        new_node = insert_node(dst_node, prev->next->name);
        new_node->tree_size = prev->next->tree_size;
        copy_children(prev->next, new_node);
        prev = prev->next;
    }
}

void cmd_cp(char srcPath[PATH_MAXLEN + 1], char dstPath[PATH_MAXLEN + 1]) {
    Node *src_node = root;
	Node *dst_node = root;
	char *token = strtok(srcPath, "/");

    while (token != NULL)
	{
		src_node = find_node(src_node, token);
		token = strtok(NULL, "/");
	}

	token = strtok(dstPath, "/");

	while (token != NULL)
	{
		dst_node = find_node(dst_node, token);
		token = strtok(NULL, "/");
	}

    Node* new_node = insert_node(dst_node, src_node->name);
    new_node->tree_size = src_node->tree_size;
    add_tree_size_to_all_parent(new_node, new_node->tree_size);
    
    dst_node = new_node;
    copy_children(src_node, dst_node);
}

Node* move_node(Node* src_node, Node* dst_node) {
    Node* src_prev = find_prev_node(src_node->parent, src_node->name);
    src_prev->next = src_node->next;
    
    src_node->parent = dst_node;
    src_node->next = dst_node->children_head->next;
    dst_node->children_head->next = src_node;

    return src_node;
}

void cmd_mv(char srcPath[PATH_MAXLEN + 1], char dstPath[PATH_MAXLEN + 1]) {
    Node *src_node = root;
	Node *dst_node = root;
	char *token = strtok(srcPath, "/");

    while (token != NULL)
	{
		src_node = find_node(src_node, token);
		token = strtok(NULL, "/");
	}

	token = strtok(dstPath, "/");

	while (token != NULL)
	{
		dst_node = find_node(dst_node, token);
		token = strtok(NULL, "/");
	}

    add_tree_size_to_all_parent(src_node, -(src_node->tree_size));
    src_node = move_node(src_node, dst_node);
    add_tree_size_to_all_parent(src_node, src_node->tree_size);
}

int cmd_find(char path[PATH_MAXLEN + 1]) {
	Node *prev = root;
	char *token = strtok(path, "/");

	while (token != NULL) {
		prev = find_node(prev, token);
		token = strtok(NULL, "/");
	}
    
	return prev->tree_size - 1;
}