#include <iostream>
#include <string>
#include <sstream>

using namespace std;

struct Node {
    int left_idx = -1;
    int right_idx = -1;
    string data;
};

constexpr size_t MAX_NODE = 1001;
Node tree[MAX_NODE];

string postorder_output[MAX_NODE];
int postorder_output_idx = -1;
float iter_stack[MAX_NODE];
int iter_stack_idx = -1;

float calculate(float lhs, string op, float rhs);
void postorder_travel(int idx);

int main(int argc, char const *argv[]) {
    int N, idx, cur_idx;
    int lhs, rhs;
    string buffer;
    string op;
    char* token;

    freopen("input.txt", "r", stdin);
    
    for (int tc = 1; tc <= 10; tc++) {
        scanf("%d\n", &N);
        
        // insertion
        for (int i = 0; i < N; i++) {
            getline(cin, buffer);

            string item;
            stringstream sstr(buffer);

            getline(sstr, item, ' ');
            idx = stoi(item);
            getline(sstr, item, ' ');
            tree[idx].data = item;

            if(!isdigit(item[0])) {
                getline(sstr, item, ' ');
                tree[idx].left_idx = stoi(item);
                getline(sstr, item, ' ');
                tree[idx].right_idx = stoi(item);
            } else {
                tree[idx].left_idx = -1;
                tree[idx].right_idx = -1;
            }
        }
        
        // post order traversal
        postorder_output_idx = -1;
        iter_stack_idx = -1;
        postorder_travel(1);

        for (int i = 0; i <= postorder_output_idx; i++) {
            if (isdigit(postorder_output[i][0])) {
                iter_stack[++iter_stack_idx] = stof(postorder_output[i]);
            } else {
                rhs = iter_stack[iter_stack_idx--];
                lhs = iter_stack[iter_stack_idx--];
                op = postorder_output[i];
                iter_stack[++iter_stack_idx] = calculate(lhs, op, rhs);
            }
        }
        
        printf("#%d %d\n", tc, int(iter_stack[iter_stack_idx--]));
        
    }
    return 0;
}

void postorder_travel(int idx) {
    if (idx == -1) return;
    postorder_travel(tree[idx].left_idx);
    postorder_travel(tree[idx].right_idx);
    postorder_output[++postorder_output_idx] = tree[idx].data;
}

float calculate(float lhs, string op, float rhs) {
    float result;
    switch (op[0])
    {
    case '+':
        result = lhs + rhs;
        break;
    case '-':
        result = lhs - rhs;
        break;
    case '*':
        result = lhs * rhs;
        break;
    case '/':
        result = lhs / rhs;
        break;
    default:
        cout << op << endl;
        cout << "invalud op" << endl;
        break;
    }

    return result;
}
