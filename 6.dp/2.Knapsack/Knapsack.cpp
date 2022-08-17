#include <iostream>
#include <string.h>

using namespace std;

constexpr int MAX_N = 100;
constexpr int MAX_VOLUME = 1000;

pair<int, int> volume_cost_table[MAX_N + 1];
int dp[MAX_N + 1][MAX_VOLUME + 1];

int Knapsack(int N, int K);

int main(int argc, char** argv)
{
	int test_case, T, N, K, result, volume, cost;
	
	freopen("sample_input.txt", "r", stdin);
	scanf("%d", &T);
	
    for(test_case = 1; test_case <= T; ++test_case) {
		scanf("%d %d", &N, &K);
        for (int i = 1; i <= N; ++i) {
            scanf("%d %d", &volume, &cost);
            volume_cost_table[i].first = volume;
            volume_cost_table[i].second = cost;
        }
		result = Knapsack(N, K);
        printf("#%d %d\n", test_case, result);
	}

	return 0;
}

int Knapsack(int N, int K) {
    int count = N > K ? N : K;
    int volume, cost;

    memset(dp[0], 0, K * sizeof(int));
    for (int i = 0; i <= N; ++i) {
        dp[i][0] = 0;
    }
    
    for (int n = 1; n <= N; ++n) {
        volume = volume_cost_table[n].first;
        cost = volume_cost_table[n].second;
        
        for (int v = 1; v <= K; ++v) {
            if (volume <= v) {
                dp[n][v] = max(dp[n - 1][v - volume] + cost, dp[n - 1][v]);
            } else { // volume > v
                dp[n][v] = dp[n - 1][v];
            }
        }
    }
    
    return dp[N][K];
}