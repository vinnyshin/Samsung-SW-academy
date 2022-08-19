#include <iostream>
#include <string>
using namespace std;

constexpr int MAX_DIGIT = 6;
constexpr int MAX_NUMBER_OF_EXCHANGE = 10;

string N, max_number;
int total_exchange_cnt;
bool global_has_same = false;

void dfs(int curr, int exchange_cnt);

int main(int argc, char** argv)
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

	int test_case, T;

    freopen("input.txt", "r", stdin);
	cin >> T;
	
	for(test_case = 1; test_case <= T; ++test_case) {
        cin >> N >> total_exchange_cnt;
        max_number = N; // deep copy
        global_has_same = false;
        dfs(0, 0);
        cout << '#' << test_case << ' ' << max_number << endl;
	}
	return 0;
}

void dfs(int curr, int exchange_cnt) {
    max_number = N > max_number ? N : max_number;

    if (total_exchange_cnt - exchange_cnt == 0) return;

    if (curr == N.size() - 1) {
        if (!global_has_same) { // 같은것끼리 바꾸면 max 유지 가능
            if ((total_exchange_cnt - exchange_cnt) % 2 != 0) { // odd number
                swap(N[curr], N[curr - 1]);
                max_number = N;
            }
        }
        return;
    }

    int max_idx = curr;
    int digit[10] = {0, };
    bool has_same = false;

    for (int i = curr + 1; i < N.size(); ++i) {
        if (++digit[N[i] - '0'] > 1) {
            global_has_same = true;
            has_same = true;
        }    
        if (N[max_idx] < N[i]) max_idx = i;
    }

    if (max_idx != curr) {
        if (has_same) {
            if (digit[N[max_idx] - '0'] > 1) {
                for (int i = curr + 1; i < N.size(); ++i) {
                    if (N[i] == N[max_idx]) {
                        swap(N[curr], N[i]);
                        dfs(curr + 1, exchange_cnt + 1);
                        swap(N[curr], N[i]);
                    }
                }
                return;
            } 
        }
        swap(N[curr], N[max_idx]);
        dfs(curr + 1, exchange_cnt + 1);
        swap(N[curr], N[max_idx]);
    } else {
        dfs(curr + 1, exchange_cnt);
    }
}
