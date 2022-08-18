#include<iostream>

using namespace std;

constexpr int CORRIDOR_LEN = 200;

int main(int argc, char** argv)
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);

	int test_case;
	int T, N;

    freopen("sample_input.txt", "r", stdin);
	cin >> T;
	
	for(test_case = 1; test_case <= T; ++test_case) {
        cin >> N;
        int corridor[CORRIDOR_LEN + 1] = {0, };
        int max = 0;

        for (size_t i = 0; i < N; ++i) {
            int from, to;
            cin >> from >> to;
            
            if (from > to) {
                swap(from, to);
            }

            from = from % 2 == 1 ? (from + 1) / 2 : from / 2;
            to = to % 2 == 1 ? (to + 1) / 2 : to / 2;
            
            for (int f = from; f <= to; ++f) {
                ++corridor[f];
                max = corridor[f] > max ? corridor[f] : max;
            }
        }

        cout << '#' << test_case << ' ' << max << endl;
	}
	return 0;
}