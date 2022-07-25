#include <iostream>
#include <cctype>

using namespace std;

int main(int argc, char const *argv[]) {
    int N, idx, has_child, result;
    char op;

    freopen("input.txt", "r", stdin);
    
    for (int tc = 1; tc <= 10; tc++) {
        result = 1;
        scanf("%d", &N);
        
        // insertion
        for (int i = 0; i < N; i++) {
            has_child = 0;
            scanf("%d %c", &idx, &op);
            
            while (getchar() != '\n') {
                has_child = 1;
            }

            if (has_child) {
                if(isdigit(op)) {
                    result = 0;
                };
            } else {
                if(!isdigit(op)) {
                    result = 0;
                }
            }
        }
        
        printf("#%d %d\n", tc, result);
    }
    
    return 0;
}

