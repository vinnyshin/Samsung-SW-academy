#include <iostream>

using namespace std;

int is_last_n_bit_of_m_on(int N, int M);

int main(int argc, char const *argv[]) {
    // freopen("input.txt", "r", stdin);
    
    int T, N, M, result;
	
    scanf("%d", &T);

	for (int tc = 1; tc <= T; tc++) {
		scanf("%d %d", &N, &M);
        result = is_last_n_bit_of_m_on(N, M);
        printf("#%d %s\n", tc, result != 0 ? "ON" : "OFF");
	}
    
    return 0;
}

int is_last_n_bit_of_m_on(int N, int M) {
    int temp = 0;
    
    for (int i = 0; i < N; i++) {
        temp = temp | (1 << i);
    }
    
    return (temp & M) == temp ? 1 : 0;
}
