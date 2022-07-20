#include <iostream>

using namespace std;

// on 32 bit 
// 0000 0000 0000 ... 0011 1111 1111
#define CONDITION 1023

int is_all_number_gathered(int flag);
int calculate_iter(int N);

int main(int argc, char const *argv[]) {
    // freopen("sample_input.txt", "r", stdin);
    
    int T, N, iter_cnt;
	
    scanf("%d", &T);

	for (int tc = 1; tc <= T; tc++) {
		scanf("%d", &N);
        iter_cnt = calculate_iter(N);
        printf("#%d %d\n", tc, iter_cnt);
	}
    return 0;
}

int is_all_number_gathered(int mask) {
    return mask & CONDITION;
}

int calculate_iter(int N) {
    int mask = 0, iter = 0, temp, digit;
    
    while (is_all_number_gathered(mask) != CONDITION) {
        ++iter;
        temp = N * iter;
        while(temp != 0) {
            digit = temp % 10;
            mask = mask | (1 << digit);
            temp = temp / 10;
        }
    }
    
    return N * iter;
}
