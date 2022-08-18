#include<iostream>

using namespace std;

constexpr int CHANGE_CNT = 8;
int change[CHANGE_CNT] = {50000, 10000, 5000, 1000, 500, 100, 50, 10};

int main(int argc, char** argv)
{
	int test_case;
	int T, N;
	
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

    freopen("input.txt", "r", stdin);
	cin >> T;
	
	for(test_case = 1; test_case <= T; ++test_case) {
        cin >> N;
        int cnt[CHANGE_CNT] = {0, };
        
        for (size_t i = 0; i < CHANGE_CNT;) {
            if ((N / change[i]) > 0) {
                N -= change[i];
                ++cnt[i];
            } else {
                ++i;
            }
        }

        cout << '#' << test_case << endl;
        for (size_t i = 0; i < CHANGE_CNT; i++) {
            cout << cnt[i] << " ";
        }
        cout << endl;        
	}
	return 0;
}