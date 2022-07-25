#include <iostream>
#include <cstring>

using namespace std;

constexpr size_t MAX_NODE = 101;
char tree[MAX_NODE] = {0, };
int stack[MAX_NODE];

int main(int argc, char const *argv[]) {
    int N, idx, cur_idx, stack_size, left, right;
    char alphabet;

    freopen("input.txt", "r", stdin);
    
    for (int tc = 1; tc <= 10; tc++) {
        scanf("%d", &N);
        
        // insertion
        for (int i = 0; i < N; i++) {
            scanf("%d %c", &idx, &alphabet);
            while (getchar() != '\n');
            tree[idx] = alphabet;
        }
        
        printf("#%d ", tc);
    
        stack_size = 0;
        cur_idx = 1; // staring from root
        
        while (cur_idx <= N || stack_size > 0) {
            while (cur_idx <= N) {
                stack[stack_size++] = cur_idx;
                left = 2 * cur_idx;
                cur_idx = left;
            }
            cur_idx = stack[--stack_size];
            printf("%c", tree[cur_idx]);
            
            right = 2 * cur_idx + 1;
            cur_idx = right;
        }
        printf("\n");
    }
    
    return 0;
}

